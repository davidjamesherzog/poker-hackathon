module.exports = function () {

    var gulp = require('gulp'),
        del = require('del'),
        path = require('path'),
        args = require('yargs').argv,
        config = require('../gulp.config')(),
        plato = require('plato'),
        glob = require('glob'),
        browserSync = require('browser-sync'),
        _ = require('lodash'),
        $ = require('gulp-load-plugins')({lazy: true});

    var port = process.env.PORT || config.defaultPort;

    /**
     * This is meant as a general utility helper.  This should really be stripped out and created
     * as a stand alone module that can be imported into all projects for reuseability
     */

    var utils = {
        clean: clean,
        log: log,
        notify: notify,
        errorLogger: errorLogger,
        inject: inject,
        changeEvent: changeEvent,
        bytediffFormatter: bytediffFormatter,
        formatPercent: formatPercent,
        getHeader: getHeader,
        startTests: startTests,
        serve: serve,
        startPlatoVisualizer: startPlatoVisualizer
    };

    return utils;

    /**
     * Delete all files in a given path
     * @param  {Array}   path - array of paths to delete
     * @param  {Function} done - callback when complete
     */
    function clean(path, done) {
        log('Cleaning: ' + $.util.colors.blue(path));
        del(path, done);
    }

    /**
     * Log a message or series of messages using chalk's blue color.
     * Can pass in a string, object or array.
     */
    function log(msg) {
        if (typeof(msg) === 'object') {
            for (var item in msg) {
                if (msg.hasOwnProperty(item)) {
                    $.util.log($.util.colors.blue(msg[item]));
                }
            }
        } else {
            $.util.log($.util.colors.blue(msg));
        }
    }

    /**
     * Show OS level notification using node-notifier
     */
    function notify(options) {
        var notifier = require('node-notifier');
        var notifyOptions = {
            sound: 'Bottle',
            contentImage: path.join(__dirname, 'gulp.png'),
            icon: path.join(__dirname, 'gulp.png')
        };
        _.assign(notifyOptions, options);
        notifier.notify(notifyOptions);
    }

    /**
     * Log an error message and emit the end of a task
     */
    function errorLogger(error) {
        utils.log('*** Start of Error ***');
        utils.log(error);
        utils.log('*** End of Error ***');
        this.emit('end');
    }

    /**
     * Inject files in a sorted sequence at a specified inject label
     * @param   {Array} src   glob pattern for source files
     * @param   {String} label   The label name
     * @param   {Array} order   glob pattern for sort order of the files
     * @returns {Stream}   The stream
     */
    function inject(src, label, order) {
        var options = {read: false};
        if (label) {
            options.name = 'inject:' + label;
        }

        return $.inject(orderSrc(src, order), options);
    }

    /**
     * Order a stream
     * @param   {Stream} src   The gulp.src stream
     * @param   {Array} order Glob array pattern
     * @returns {Stream} The ordered stream
     */
    function orderSrc(src, order) {
        //order = order || ['**/*'];
        return gulp
            .src(src)
            .pipe($.if(order, $.order(order)));
    }

    /**
     * When files change, log it
     * @param  {Object} event - event that fired
     */
    function changeEvent(event) {
        var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
        log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
    }

    /**
     * Formatter for bytediff to display the size changes after processing
     * @param  {Object} data - byte data
     * @return {String}      Difference in bytes, formatted
     */
    function bytediffFormatter(data) {
        var difference = (data.savings > 0) ? ' smaller.' : ' larger.';
        return data.fileName + ' went from ' +
            (data.startSize / 1000).toFixed(2) + ' kB to ' +
            (data.endSize / 1000).toFixed(2) + ' kB and is ' +
            formatPercent(1 - data.percent, 2) + '%' + difference;
    }

    /**
     * Format a number as a percentage
     * @param  {Number} num       Number to format as a percent
     * @param  {Number} precision Precision of the decimal
     * @return {String}           Formatted perentage
     */
    function formatPercent(num, precision) {
        return (num * 100).toFixed(precision);
    }

    /**
     * Format and return the header for files
     * @return {String}           Formatted file header
     */
    function getHeader() {
        var pkg = require('../package.json');
        var template = ['/**',
            ' * <%= pkg.name %> - <%= pkg.description %>',
            ' * @authors <%= pkg.authors %>',
            ' * @version v<%= pkg.version %>',
            ' * @link <%= pkg.homepage %>',
            ' * @license <%= pkg.license %>',
            ' */',
            ''
        ].join('\n');
        return $.header(template, {
            pkg: pkg
        });
    }

    /**
     * Start the tests using karma.
     * @param  {boolean} singleRun - True means run once and end (CI), or keep running (dev)
     * @param  {Function} done - Callback to fire when karma is done
     * @return {undefined}
     */
    function startTests(singleRun, done) {
        var child;
        var excludeFiles = [];
        var fork = require('child_process').fork;
        var karma = require('karma').server;
        var args = require('yargs').argv;
        var serverSpecs = config.serverIntegrationSpecs;

        if (args.startServers) {
            log('Starting servers');
            var savedEnv = process.env;
            savedEnv.NODE_ENV = 'dev';
            savedEnv.PORT = 8888;
            child = fork(config.nodeServer);
        } else {
            if (serverSpecs && serverSpecs.length) {
                excludeFiles = serverSpecs;
            }
        }

        karma.start({
            configFile: __dirname + '/../karma.conf.js',
            exclude: excludeFiles,
            singleRun: !!singleRun
        }, karmaCompleted);

        ////////////////

        function karmaCompleted(karmaResult) {
            log('Karma completed');
            if (child) {
                log('shutting down the child process');
                child.kill();
            }
            if (karmaResult === 1) {
                done('karma: tests failed with code ' + karmaResult);
            } else {
                done();
            }
        }
    }

    /**
     * serve the code
     * --debug-brk or --debug
     * --nosync
     * @param  {Boolean} isDev - dev or build mode
     * @param  {Boolean} specRunner - server spec runner html
     */
    function serve(isDev, specRunner) {
        var debugMode = '--debug';
        var nodeOptions = getNodeOptions(isDev);

        nodeOptions.nodeArgs = [debugMode + '=5858'];

        if (args.verbose) {
            console.log(nodeOptions);
        }

        return $.nodemon(nodeOptions)
            .on('restart', ['build:vet'], function(ev) {
                log('*** nodemon restarted');
                log('files changed:\n' + ev);
                setTimeout(function() {
                    browserSync.notify('reloading now ...');
                    browserSync.reload({stream: false});
                }, config.browserReloadDelay);
            })
            .on('start', function () {
                log('*** nodemon started');
                startBrowserSync(isDev, specRunner);
            })
            .on('crash', function () {
                log('*** nodemon crashed: script crashed for some reason');
            })
            .on('exit', function () {
                log('*** nodemon exited cleanly');
            });
    }

    function getNodeOptions(isDev) {
        return {
            script: config.nodeServer,
            delayTime: 1,
            env: {
                'PORT': port,
                'NODE_ENV': isDev ? 'dev' : 'build'
            },
            watch: [config.server]
        };
    }

    /**
     * Start BrowserSync
     * --nosync will avoid browserSync
     */
    function startBrowserSync(isDev, specRunner) {
        if (args.nosync || browserSync.active) {
            return;
        }

        log('Starting BrowserSync on port ' + port);

        // If build: watches the files, builds, and restarts browser-sync.
        // If dev: watches less, compiles it to css, browser-sync handles reload
        if (isDev) {
            gulp.watch([config.less], ['build:styles'])
                .on('change', changeEvent);
        } else {
            gulp.watch([config.less, config.js, config.html], ['build:optimize', browserSync.reload])
                .on('change', changeEvent);
        }

        var options = {
            proxy: 'localhost:' + port,
            port: 3000,
            files: isDev ? [
                config.client + '**/*.*',
                '!' + config.less,
                config.temp + '**/*.css'
            ] : [],
            ghostMode: { // these are the defaults t,f,t,t
                clicks: true,
                location: false,
                forms: true,
                scroll: true
            },
            injectChanges: true,
            logFileChanges: true,
            logLevel: 'debug',
            logPrefix: 'gulp-patterns',
            notify: true,
            reloadDelay: 0 //1000
        } ;
        if (specRunner) {
            options.startPath = config.specRunnerFile;
        }

        browserSync(options);
    }

    /**
     * Start Plato inspector and visualizer
     */
    function startPlatoVisualizer(done) {
        log('Running Plato');

        var files = glob.sync(config.plato.js);
        var excludeFiles = /.*\.spec\.js/;
        var plato = require('plato');

        var options = {
            title: 'Plato Inspections Report',
            exclude: excludeFiles
        };
        var outputDir = config.report + '/plato';

        plato.inspect(files, outputDir, options, platoCompleted);

        function platoCompleted(report) {
            var overview = plato.getOverviewReport(report);
            if (args.verbose) {
                log(overview.summary);
            }
            if (done) { done(); }
        }
    }
};