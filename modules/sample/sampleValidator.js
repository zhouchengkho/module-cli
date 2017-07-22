module.exports = {
   getValidator: function(req, type) {
       var input = {
           // sample: {
           //     sample_column: ['notEmpty', req.t(SAMPLE_COLUMN_REQUIRE')]
           // }
       };
       return input[type];
   }
};
