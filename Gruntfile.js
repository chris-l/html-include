module.exports = function(grunt) {

  grunt.initConfig({
    'jslint'  : {
      all     : {
        src : [ 'src/*.js' ],
        directives : {
          indent : 2
        }
      }
    },
    'uglify'  : {
        target : {
          files : { 'dist/html-include.min.js' : 'src/html-include.js' }
      }
    },
    'connect': {
      demo: {
        options: {
          open: true,
          keepalive: true
        }
      }
    },
    'gh-pages': {
      options: {
        clone: 'bower_components/html-include'
      },
      src: [
        'bower_components/**/*',
        '!bower_components/html-include/**/*',
        'demo/*', 'src/*', 'index.html', 'header.html', 'footer.html'
      ]
    },
    vulcanize: {
      default: {
        options: {
          inline: true,
          'strip-excludes' : false,
          excludes: {
            imports: [ "polymer.html" ]
          }
        },
        files: {
          'dist/html-include.html' : 'dist/html-include.html'
        }
      }
    },
    clean : [ 'dist/html-include.js' ],
    'replace': {
      example: {
        src: ['src/*'],
        dest: 'dist/',
        replacements: [
          {
            from: 'bower_components',
            to: '..'
          },
          {
            from: 'html-include.js',
            to: 'html-include.min.js'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-vulcanize');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('lint',  ['jslint']);
  grunt.registerTask('default',  ['jslint', 'replace', 'uglify', 'clean', 'vulcanize']);
  grunt.registerTask('deploy', ['gh-pages']);
  grunt.registerTask('server', ['connect']);

};
