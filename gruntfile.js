module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    ts: {
      dev: {
        src: ["public/themes/kahuna/assets/scripts/src/main.ts"],
        outDir: 'public/themes/kahuna/assets/scripts/build/',
        options: {
          target: 'es3',
          module: 'amd',
          sourceMap: false,
          declaration: false,
          removeComments: false,
          noImplicitAny: false
        },
        reference: 'reference.ts'
      },

      test: {
        src: ["public/themes/kahuna/assets/scripts/src/tests/**/*.ts"],
        outDir: 'public/themes/kahuna/assets/scripts/build/',
        options: {
          target: 'es3',
          module: 'amd',
          sourceMap: false,
          declaration: false,
          removeComments: false,
          noImplicitAny: false
        },
        reference: 'test-reference.ts'
      },

      prod: {
        src: ["public/themes/kahuna/assets/scripts/src/main.ts"],
        outDir: 'public/themes/kahuna/assets/scripts/build/',
        options: {
          target: 'es3',
          module: 'amd',
          sourceMap: false,
          declaration: false,
          removeComments: false,
          noImplicitAny: false,
          fast: 'never' // disable fast compile
        },
        reference: 'reference.ts'
      }
    },

    requirejs: {
      compile: {
        options: {
          'logLevel': 0,
          'findNestedDependencies': true,
          'baseUrl': 'public/themes/kahuna/assets/scripts/build',
          'name': 'main',
          'optimize': 'uglify2',
          'uglify2': {
            output: {
              beautify: false
            },
            compress: {
              sequences: true, // join consecutive statemets with the “comma operator”
              properties: true, // optimize property access: a["foo"] → a.foo
              dead_code: true, // discard unreachable code
              drop_debugger: true, // discard “debugger” statements
              unsafe: false, // some unsafe optimizations (see below)
              conditionals: true, // optimize if-s and conditional expressions
              comparisons: true, // optimize comparisons
              evaluate: true, // evaluate constant expressions
              booleans: true, // optimize boolean expressions
              loops: true, // optimize loops
              unused: true, // drop unused variables/functions
              hoist_funs: true, // hoist function declarations
              hoist_vars: true, // hoist variable declarations
              if_return: true, // optimize if-s followed by return/continue
              join_vars: true, // join var declarations
              cascade: true, // try to cascade `right` into `left` in sequences
              side_effects: true, // drop side-effect-free statements
              warnings: true, // warn about potentially dangerous optimizations/code
              global_defs: {} // global definitions
            },
            warnings: true,
            mangle: true
          },
          'out': 'public/themes/kahuna/assets/scripts/min/main.js'
        }
      }
    },

    tslint: {
      options: {
        configuration: {
          'rules': {
            'class-name': false, // disables strict PascalCase class names etc (disabled cause google.maps.d.ts was being a pain)
            'curly': true,
            'eofline': true,
            'forin': true,
            'indent': [true, 4],
            'label-position': true,
            'label-undefined': true,
            'max-line-length': [false, 140],
            'no-arg': true,
            'no-bitwise': true,
            'no-console': [true,
              'debug',
              'info',
              // 'time',
              // 'timeEnd',
              'trace'
            ],
            'no-construct': true,
            'no-debugger': true,
            'no-duplicate-key': true,
            'no-duplicate-variable': true,
            'no-empty': true,
            'no-eval': false,
            'use-strict': true, // dont think this actually works
            'no-string-literal': false, // lets us do window['whateva'] (since we cant do window.whateva)
            'no-trailing-whitespace': true,
            'no-unreachable': true,
            'one-line': [false //,
              // 'check-open-brace',
              // 'check-catch',
              // 'check-else'
              // 'check-whitespace'
            ],
            'quotemark': [true, 'single'],
            'radix': true,
            'semicolon': true,
            'triple-equals': [true, 'allow-null-check'],
            'variable-name': false,
            'whitespace': [false
              // 'check-branch',
              // 'check-decl',
              // 'check-operator',
              // 'check-separator',
              // 'check-type'
            ]
          }
        }
      },
      files: {
        src: ['public/themes/kahuna/assets/scripts/src/**/*.ts']
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        files: {
          'public/themes/kahuna/assets/scripts/min/plugins.js': ['public/themes/kahuna/assets/scripts/src/lib/jquery.js', 'public/themes/kahuna/assets/scripts/src/lib/async.js', 'public/themes/kahuna/assets/scripts/src/lib/hammer.min.js'],
          'public/themes/kahuna/assets/scripts/min/main.js': ['public/themes/kahuna/assets/scripts/banner.js', 'public/themes/kahuna/assets/scripts/min/main.js'],
          'public/themes/kahuna/assets/scripts/min/require.js': ['public/themes/kahuna/assets/scripts/src/lib/require.js']
        }
      },
    },

    compass: {
      dev: {
        options: {
          config: 'config.rb',
        }
      },
      build: {
        options: {
          config: 'config.rb',
        }
      },
      clean: {
        options: {
          clean: true
        }
      }
    },

    play: {
      dev: {
        file: 'sounds/compiled.wav'
      },
      build: {
        file: 'sounds/filesdone.mp3'
      }
    },

    imagemin: { // Task
      // static: {                          // Target
      //     options: {                       // Target options
      //         optimizationLevel: 3
      //         // use: [mozjpeg()]
      //     },
      //     files: {                         // Dictionary of files
      //         'dist/img.png': 'src/img.png', // 'destination': 'source'
      //         'dist/img.jpg': 'src/img.jpg',
      //         'dist/img.gif': 'src/img.gif'
      //     }
      // },
      dynamic: { // Another target
        files: [{
          expand: true, // Enable dynamic expansion
          cwd: 'public/themes/kahuna/assets/images/og-devices/', // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'], // Actual patterns to match
          dest: 'public/themes/kahuna/assets/images/devices/' // Destination path prefix
        }]
      }
    },

    clean: {
      deploy: {
        src: [
          "deploy/**/"
        ]
      }
    },

    copy: {
      deploy: {
        files: [{
          expand: true,
          dest: 'deploy/',
          cwd: 'public/themes/kahuna/',
          src: [
            'assets/scripts/min/*.js',
            'assets/styles/css/*.css',
            'assets/images/**/*.*',
            '**/*.php'
          ]
        }]
      }
    },

    compress: {
      main: {
        options: {
          archive: 'fi-src.zip'
        },
        files: [{
            expand: true,
            src: ['*'],
            dest: 'source/',
            filter: 'isFile'
          }, // includes files in path
          {
            expand: true,
            src: ['public/themes/kahuna/assets/**/*'],
            dest: 'source/'
          }, // includes files in path and its subdirs
          // {expand: true, cwd: 'path/', src: ['**'], dest: 'internal_folder3/'}, // makes all src relative to cwd
        ]
      }
    },

    watch: {
      php: {
        files: ['public/themes/kahuna/**/*.php', 'public/themes/kahuna/**/*.html', 'public/themes/kahuna/**/*.htm', 'public/themes/kahuna/**/*.jpg', 'public/themes/kahuna/**/*.png', 'public/themes/kahuna/**/*.gif'],
        tasks: [],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['public/themes/kahuna/assets/scripts/src/**/*.ts', '!public/themes/kahuna/assets/scripts/src/**/*.d.ts'],
        tasks: ['tslint', 'ts:dev', 'play:dev'],
        options: {
          livereload: true
        }
      },
      test: {
        files: ['public/themes/kahuna/assets/scripts/src/tests/**/*.ts', '!public/themes/kahuna/assets/scripts/src/**/*.d.ts'],
        tasks: ['tslint', 'ts:test', 'play:dev'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['public/themes/kahuna/assets/styles/sass/**/*.scss'],
        tasks: ['compass:dev'],
        options: {
          livereload: true
        }
      },
      cachebust: {
        files: ['public/themes/kahuna/assets/scripts/src/**/*.ts', 'public/themes/kahuna/assets/styles/sass/**/*.scss', '!public/themes/kahuna/assets/scripts/src/**/*.d.ts'],
        tasks: ['file-creator', 'play:dev']
      }
    },

    'file-creator': {
      cachebust: {
        'public/themes/kahuna/_cachebust.php': function(fs, fd, done) {
          fs.writeSync(fd, '<?php\n\n/* Generated by grunt ' + (new Date) + '*/\n\nreturn ' + (+new Date) + ';\n\n/* Bustin\' makes me feel good */');
          done();
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  // grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-file-creator');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-tslint');
  grunt.loadNpmTasks('grunt-play'); // cause why not

  grunt.registerTask('dev', ['tslint', 'ts:dev', 'ts:test', 'compass:dev', 'play:dev', 'watch']);
  grunt.registerTask('build', ['compass:clean', 'compass:build', 'tslint', 'ts:prod', 'requirejs:compile', 'concat', 'file-creator', 'clean', 'copy', 'play:build']);
  grunt.registerTask('build-js', ['tslint', 'ts:prod', 'requirejs:compile', 'concat', 'file-creator', 'play:build']);
  grunt.registerTask('build-css', ['compass:clean', 'compass:build', 'file-creator', 'play:build']);

  // no sounds
  grunt.registerTask('dev-nofun', ['tslint', 'ts:dev', 'ts:test', 'compass:dev', 'watch']);
  grunt.registerTask('build-nofun', ['compass:clean', 'compass:build', 'tslint', 'ts:prod', 'requirejs:compile', 'concat']);
  grunt.registerTask('build-js-nofun', ['tslint', 'ts:prod', 'requirejs:compile', 'concat']);
  grunt.registerTask('build-css-nofun', ['compass:clean', 'compass:build']);
};