'use strict';
/*
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/cryptowatch'); 
var model = require
var controller = require('../controllers/cryptoController');
*/
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let expect = chai.expect();
let should = chai.should();

chai.use(chaiHttp);

describe('Crypto controller module', () => {
    

    
    /*
  * Test the /GET route
  */
  describe('/GET cryptos', () => {
      it('it should GET all the cryptos', (done) => {
        chai.request(server)
            .get('/cryptos')
            .end((err, res) => {
                //expect(res.status).to.be(200);
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                
              done();
            });
      });
      
        it('it should GET BTC information', (done) => {
            chai.request(server)
                .get('/cryptos/BTC')
                .end((err, res) => {
                    //expect(res.status).to.be(200);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.code.should.be.eql('BTC');
                  done();
                });
          });
      
  });
})

