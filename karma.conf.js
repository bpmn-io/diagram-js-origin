module.exports = function(karma) {
  karma.set({

    frameworks: [ 'browserify', 'mocha', 'chai' ],

    files: [
      'test/*.spec.js'
    ],

    preprocessors: {
      'test/*.spec.js': [ 'browserify' ]
    },

    reporters: [ 'progress' ],

    browsers: [ 'PhantomJS' ],

    singleRun: true,
    autoWatch: false,

    // browserify configuration
    browserify: {
      transform: [
        [ 'babelify', { global: true } ],
        [ 'brfs', { global: true } ]
      ],
      debug: true
    }
  });
};
