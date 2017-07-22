var validator = require('./sampleValidator.js');

module.exports = {
   validateInput: function (type, validateType) {
       return function (req, res, next) {
           var validators = validator.getValidator(req, type);
           var error = _v.validate(req.body, validators);
           if (!utils.empty(error)) {
               return errorUtil.validationError(res, error);
           }
           next();
     };
   }
}
