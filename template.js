module.exports = {
    getCamelCase: function(name) {
      return name[0].toUpperCase() + name.substring(1)
    },
    point: function(func, prop) {
        return func+'.'+prop
    },
    genControllerTemplate: function(name) {
        var self = this;
        var template =
            "module.exports = {\n"+
            "   list"+self.getCamelCase(name)+"s: function(req, res) {\n" +
            "   },\n"+
            "   get"+self.getCamelCase(name)+"ById: function(req, res) {\n" +
            "   },\n"+
            "   create"+self.getCamelCase(name)+": function(req, res) {\n" +
            "   },\n"+
            "   update"+self.getCamelCase(name)+"ById: function(req, res) {\n" +
            "   },\n"+
            "   delete"+self.getCamelCase(name)+"ById: function(req, res) {\n" +
            "   }\n"+
            "};\n"
            ;
        return template;
    },
    concat: function(arr) {
        var str = '';
        for(var i in arr) {
            str+=arr[i];
        }
        str+='\n'
        return str;
    },
    genValidatorTemplate: function(name) {
        var template =
                "module.exports = {\n"+
                "   getValidator: function(req, type) {\n" +
                "       var input = {\n" +
                "           // sample: {\n" +
                "           //     sample_column: ['notEmpty', req.t(SAMPLE_COLUMN_REQUIRE')]\n"+
                "           // }\n"+
                "       };\n"+
                "       return input[type];\n"+
                "   }\n"+
                "};\n"
            ;
        return template;
    },
    genMiddlewareTemplate: function(name) {
        var template =
            "var validator = require('./"+name+"Validator.js"+"');\n" +
            "\n"+
            "module.exports = {\n" +
            "   validateInput: function (type, validateType) {\n" +
            "       return function (req, res, next) {\n" +
            "           var validators = validator.getValidator(req, type);\n" +
            "           var error = _v.validate(req.body, validators);\n" +
            "           if (!utils.empty(error)) {\n" +
            "               return errorUtil.validationError(res, error);\n" +
            "           }\n" +
            "           next();\n" +
            "     };\n"+
            "   }\n"+
            "}\n";
        return template;
    },
    genRouteTemplate: function(name) {
        var self = this;
        var ctrl = name+'Ctrl';
        var ctrlPath = './'+name+'Controller.js';
        var middleware = name+'Middleware';
        var middlewarePath = './'+name+'Middleware.js';
        var router = name+"Router";
        var listMiddleware = 'list'+self.getCamelCase(name)+'s'+'Middleware';
        var list = 'list'+self.getCamelCase(name)+'s';
        var getById = 'get'+self.getCamelCase(name) + 'ById';
        var getByIdMiddleware = getById+'Middleware';
        var create = 'create'+self.getCamelCase(name);
        var createMiddleware = create+'Middleware';
        var update = 'update'+self.getCamelCase(name)+'ById';
        var updateMiddleware = update+'Middleware';
        var Delete = 'delete'+self.getCamelCase(name)+'ById';
        var DeleteMiddleware = Delete+'Middleware';

        var template =
            "var express = require('express');\n" +
            // "var auth = require(basePath + 'helper/auth');\n" +
            "var "+ctrl+" = require('"+ctrlPath+"');\n" +
            "var "+middleware+" = require('"+middlewarePath+"');\n" +
            "var "+router+" = express.Router();\n\n\n" +
            "var "+listMiddleware+" = ["+self.point(ctrl, list)+"];\n" +
            router+".get('/', "+listMiddleware+");\n" +
            "\n"+
            "var "+getByIdMiddleware+" = ["+self.point(ctrl, getById)+"];\n" +
            router+".get('/:id', "+getByIdMiddleware+");\n" +
            "\n"+
            "var "+createMiddleware+" = ["+self.point(ctrl, create)+"];\n" +
            router+".post('/', "+createMiddleware+");\n\n" +
            "var "+updateMiddleware+" = ["+self.point(ctrl, update)+"];\n" +
            router+".post('/:id', "+updateMiddleware+");\n\n" +
            "var "+DeleteMiddleware+" = ["+self.point(ctrl, Delete)+"];\n" +
            router+".delete('/:id', "+DeleteMiddleware+");\n\n" +
            "module.exports = "+router+";"
        return template;
    },
    genModelTemplate: function(name) {
        var self = this;
        var template =
                "module.exports = {\n"+
                "   list"+self.getCamelCase(name)+"s: function(callback) {\n" +
                "   },\n"+
                "   get"+self.getCamelCase(name)+"ById: function(id, callback) {\n" +
                "   }\n"+
                "};\n"
            ;
        return template;
    }
}
