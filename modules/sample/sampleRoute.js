var express = require('express');
var auth = require(basePath + 'helper/auth');
var sampleCtrl = require('./sampleController.js');
var sampleMiddleware = require('./sampleMiddleware.js');
var sampleRouter = express.Router();


var listSamplesMiddleware = [sampleCtrl.listSamples];
sampleRouter.get('/', listSamplesMiddleware);

var getSampleByIdMiddleware = [sampleCtrl.getSampleById];
sampleRouter.get('/:id', getSampleByIdMiddleware);

var createSampleMiddleware = [sampleCtrl.createSample];
sampleRouter.post('/', createSampleMiddleware);

var updateSampleByIdMiddleware = [sampleCtrl.updateSampleById];
sampleRouter.post('/:id', updateSampleByIdMiddleware);

var deleteSampleByIdMiddleware = [sampleCtrl.deleteSampleById];
sampleRouter.delete('/:id', deleteSampleByIdMiddleware);

module.exports = articleRouter;