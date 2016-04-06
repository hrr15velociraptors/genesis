module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      client: {
        src: [],

        dest: "client/dist/client.js"
      },
      lib: {
        src: [],

        dest: "client/dist/lib.js"
      },
      css: {
        src: [],
        dest: "client/dist/main.css"
      }
    },

    copy: {
      build: {
        cwd: 'client',
        src: [ '**' ],
        dest: 'client/dist',
        expand: true
      },
    },


    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    },

    uglify: {
      my_target: {
        files: {
          "client/dist/main.min.js": ['client/dist/client.js'],
          "client/dist/lib.min.js": ['client/dist/lib.js']
        }
      }
    },

    jshint: {
      files: [
        'client/scripts/**/*.js',
        'server/*.js'
      ],
      options: {
        force: false,
        jshintrc: '.jshintrc',
        ignores: [
          'client/lib/**/*.js',
          'client/dist/**/*.js'
        ]
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'client/dist',
          src: ['*.css', '!*.min.css'],
          dest: 'client/dist',
          ext: '.min.css'
        }]
      }
    },

    shell: {
      bower: {
        command: 'bower install'
      },
      prodServer: {
        command: 'node server/server.js'
      }
    },

    watch: {
      all: {
        files: [

        ],
        tasks: [
          'concat',
          'uglify',
          'cssmin'
        ]
      }
    },

    clean: {
      build: [],
      deploy: []
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');


  grunt.registerTask('build', [
    'clean:build', 'copy', 'concat', 'uglify', 'cssmin', 'jshint'
  ]);

  grunt.registerTask('deploy', function(n) {
    grunt.task.run([ 'shell:bower', 'build', 'clean:deploy']);
  });



};
