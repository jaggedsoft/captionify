module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			options: {
				globals: {
					'require': true,
					'document': true,
					'window': true
				}
			},
			all: ['Gruntfile.js', 'captionify.js']
		},

		uglify: {
			minify: {
				options: {
					preserveComments: 'some'
				},
				files: {
					'captionify.min.js': ['captionify.js']
				}
			}
		},

		cssmin: {
			minify: {
				options: {
					keepSpecialComments: 1
				},
				files: {
					'captionify.min.css': ['captionify.css']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// Default task
	grunt.registerTask('default', ['jshint', 'uglify', 'cssmin']);

};
