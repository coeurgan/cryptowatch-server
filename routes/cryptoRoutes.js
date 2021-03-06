'use strict';
module.exports = function(app) {
  var controller = require('../controllers/cryptoController');

  // todoList Routes
  app.route('/cryptos')
    .get(controller.list)
    .post(controller.create)
    .options(controller.optionResponse);


  app.route('/cryptos/:cryptoId')
    .options(controller.optionResponse)
    .get(controller.read)
    .put(controller.update)
    .delete(controller.delete);
};