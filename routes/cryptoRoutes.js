'use strict';
module.exports = function(app) {
  var controller = require('../controllers/cryptoController');

  // todoList Routes
  app.route('/cryptos')
    .get(controller.list)
    .post(controller.create);


  app.route('/cryptos/:cryptoId')
    .get(controller.read)
    .put(controller.update)
    .delete(controller.delete);
};