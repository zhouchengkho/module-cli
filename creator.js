var fs = require('fs');
var config = require('./config');
var async = require('async');
var template = require('./template');
module.exports = {
    getDirPath: function(name) {
      return config.modulePath+name;
    },
    createModule: function(name) {
        var self = this;
        var dirPath = self.getDirPath(name);
        if(fs.existsSync(dirPath)) {
            console.log(dirPath+' already exists')
        } else {
            fs.mkdirSync(dirPath)
            console.log(dirPath+ ' directory created')
            async.parallel([
                // controller
                function(cb) {
                    self.genController(name, function(err, result) {
                        cb(err, result)
                    })
                },
                // validator
                function(cb) {
                    self.genValidator(name, function(err, result) {
                        cb(err, result)
                    })
                },
                // middleware
                function(cb) {
                    self.genMiddleware(name, function(err, result) {
                        cb(err, result)
                    })
                },
                // route
                function(cb) {
                    self.genRoute(name, function(err, result) {
                        cb(err, result)
                    })
                },
                // model
                function(cb) {
                    self.genModel(name, function(err, result) {
                        cb(err, result)
                    })
                }
            ], function(err, result) {
                console.log('create ok')
            })

        }
    },
    genController: function(name, callback) {
        var fileName = this.getDirPath(name) + '/'+name+'Controller.js';
        var templateContent = template.genControllerTemplate(name);
        fs.writeFile(fileName, templateContent, function(err, result) {
            callback(err, result)
        })
    },
    genValidator: function(name, callback) {
        var fileName = this.getDirPath(name) + '/'+name+'Validator.js';
        var templateContent = template.genValidatorTemplate(name);
        fs.writeFile(fileName, templateContent, function(err, result) {
            callback(err, result)
        })
    },
    genMiddleware: function(name, callback) {
        var fileName = this.getDirPath(name) + '/'+name+'Middleware.js';
        var templateContent = template.genMiddlewareTemplate(name);
        fs.writeFile(fileName, templateContent, function(err, result) {
            callback(err, result)
        })
    },
    genRoute: function(name, callback) {
        var fileName = this.getDirPath(name) + '/'+name+'Route.js';
        var templateContent = template.genRouteTemplate(name);
        fs.writeFile(fileName, templateContent, function(err, result) {
            callback(err, result)
        })
    },
    genModel: function(name, callback) {
        var fileName = this.getDirPath(name) + '/'+name+'Model.js';
        var templateContent = template.genModelTemplate(name);
        fs.writeFile(fileName, templateContent, function(err, result) {
            callback(err, result)
        })
    }
}
