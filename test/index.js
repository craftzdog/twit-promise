var Twit = require('../index.js');
var nock = require('nock');
var should = require('should');

// setup mock http requests
var twitterPOST = nock('https://api.twitter.com')
  .post('/1.1/statuses/update.json?status=hello%20world%21')
  .times(2)
  .reply(200, {
    test: 'foo'
  });

var twitterGET = nock('https://api.twitter.com')
  .get('/1.1/statuses/user_timeline.json?status=hello%20world%21')
  .times(2)
  .reply(200, {
    test: 'bar'
  });

describe('Twit', function(){
  var t;

  beforeEach(function() {

    t = new Twit({
      consumer_key: '01234',
      consumer_secret: '01234',
      access_token: '01234',
      access_token_secret: '01234'
    });

  });

  describe('.post()', function(){

    it('should return promise', function() {
      return t.post('statuses/update', { status: 'hello world!' })
      .then( function(res) {
        res.should.have.property('response');
        res.should.have.property('data');
        res.response.should.have.property('statusCode', 200);
        res.data.should.be.eql({ 'test': 'foo' });
      });
    });

    it('should return a promise that works with spread', function() {
      return t.post('statuses/update', { status: 'hello world!' })
      .then( function(res) {
        res.should.have.property('response');
        res.should.have.property('data');
        res.response.should.have.property('statusCode', 200);
        res.data.should.be.eql({ 'test': 'foo' });
      });
    });

  });

  describe('.get()', function(){

    it('should return promise', function() {
      return t.get('statuses/user_timeline', { status: 'hello world!' })
      .then( function(res) {
        should(res).be.ok();
        res.should.have.property('response');
        res.should.have.property('data');
        res.response.should.have.property('statusCode', 200);
        res.data.should.be.eql({ 'test': 'bar' });
      });
    });

    it('should return promise that works with spread', function() {
      return t.get('statuses/user_timeline', { status: 'hello world!' })
      .then( function(res) {
        res.should.have.property('response');
        res.should.have.property('data');
        res.response.should.have.property('statusCode', 200);
        res.data.should.be.eql({ 'test': 'bar'});
      });
    });
  });

});
