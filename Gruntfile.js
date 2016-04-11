module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      build: {
        cwd: 'client',
        src: ['**'],
        dest: 'client/dist',
        expand: true,
      },
    },

    clean: {
      build: ['client/dist/**'],
      deploy: [],
    },

    shell: {
      bower: {
        command: 'bower install',
      },
      prodServer: {
        command: 'node server/index.js',
      },
    },

    jscs: {
      src: './',
      options: {
        config: '.jscsrc',
        esnext: true, // If you use ES6 http://jscs.info/overview.html#esnext
        verbose: true, // If you need output with rule names http://jscs.info/overview.html#verbose
        fix: false, // Autofix code style violations when possible.
        requireCurlyBraces: ['if'],
      },
    },

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('build', [
    'clean:build', 'copy'//, 'concat', 'uglify', 'cssmin', <-- add those later
  ]);

  grunt.registerTask('deploy', function (n) {
    grunt.task.run(['shell:bower', 'build', 'clean:deploy']);
  });

};
