'use strict';

module.exports = function (gulp, config, plugins) {
    /**
     * Compile sass to css
     * @return {Stream}
     */
    return {
        deps: ['clean:styles'],
        fn: function () {
            plugins.utils.log('Compiling Sass --> CSS');

            return gulp
                .src(config.sass)
                .pipe(plugins.plumber()) // exit gracefully if something fails after this
                .pipe(plugins.sass())
//        .on('error', errorLogger) // more verbose and dupe output. requires emit.
                .pipe(plugins.autoprefixer({browsers: ['last 2 version', '> 5%']}))
                .pipe(gulp.dest(config.temp));
        }
    };
};
