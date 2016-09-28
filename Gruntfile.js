module.exports = function(grunt) {

  //all settings are here
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      concat: {
          jsFiles: {
            src: [
              'js/angular.min.js',
              'js/angular-route.min.js',
              'js/angular-sanitize.min.js',
              'js/bootstrap.min.js',
              'js/app.js',
              'js/controllers.js'
            ],
            dest: 'build/script.min.js',
          },
          cssFiles: {
            src: [
              'css/bootstrap.css',
              'css/font-awesome.css',
              'css/style.css'
            ],
            dest: 'build/style.css',
          }
      },
      uglify: {
        angularUglify: {
          src: 'js/angular.js',
          dest: 'js/angular.min.js'
        },
        angularRouteUglify: {
          src: 'js/angular-route.js',
          dest: 'js/angular-route.min.js'
        },
        angularsanitizeUglify: {
          src: 'js/angular-sanitize.js',
          dest: 'js/angular-sanitize.min.js'
        },
        bootstrapUglify: {
          src: 'js/bootstrap.js',
          dest: 'js/bootstrap.min.js'
        }
      },
      cssmin: {
        cssUglify: {
          src: 'build/style.css',
          dest: 'build/style.min.css'
        }
      },
      watch: {
        scripts: {
          files: ['js/*.js'],
          tasks: ['uglify' , 'concat'],
          options: {
              spawn: false,
          }
        },
        styles: {
          files: ['css/*.css'],
          tasks: ['concat', 'cssmin'],
          options: {
              spawn: false,
          }
        }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');//use concat plugin
  grunt.loadNpmTasks('grunt-contrib-uglify');//use uglify plugin
  grunt.loadNpmTasks('grunt-contrib-cssmin');//use uglify plugin
  grunt.loadNpmTasks('grunt-contrib-watch');//use uglify watch

  grunt.registerTask('default', ['uglify', 'concat', 'cssmin']);//what to do   

};