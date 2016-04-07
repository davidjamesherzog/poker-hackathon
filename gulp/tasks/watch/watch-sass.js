'use strict';

module.exports = function (gulp, config, plugins) {
    /**
     * Watch sass files and recompile
     */
    return function () {
        gulp.watch([config.sass], ['build:styles']);
    };
};
