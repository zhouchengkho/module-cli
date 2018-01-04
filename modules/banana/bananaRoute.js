var express = require('express');
var bananaCtrl = require('./bananaController.js');
var bananaMiddleware = require('./bananaMiddleware.js');
var bananaRouter = express.Router();


var listBananasMiddleware = [bananaCtrl.listBananas];
bananaRouter.get('/', listBananasMiddleware);

var getBananaByIdMiddleware = [bananaCtrl.getBananaById];
bananaRouter.get('/:id', getBananaByIdMiddleware);

var createBananaMiddleware = [bananaCtrl.createBanana];
bananaRouter.post('/', createBananaMiddleware);

var updateBananaByIdMiddleware = [bananaCtrl.updateBananaById];
bananaRouter.post('/:id', updateBananaByIdMiddleware);

var deleteBananaByIdMiddleware = [bananaCtrl.deleteBananaById];
bananaRouter.delete('/:id', deleteBananaByIdMiddleware);

module.exports = bananaRouter;