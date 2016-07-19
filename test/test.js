var supertest = require("supertest");
var should = require("should");
var assert = require("assert");

// This uses the config file to set the PORT where program is runninng.
var config = require('../config.js');
var server = supertest.agent(config.url + config.port);

//console.log = function(){};
// UNIT test begin

describe("Fibonacci API Test",function(){

    it("should return series for 5",function(done){

      server
        .get("/fib/5")
        .expect("Content-type",/json/)
        .expect(200) // THis is HTTP response
        .end(function(err,res){
            // HTTP status should be 200
            var arr = {"fib": [ 0,1,1,2,3,5]};
            console.log("content of array");
            res.status.should.equal(200);
            console.log("N = 5 ");
            console.log(res.body);
            res.body.should.be.json;
            res.body.should.eql(arr);
            done();
        });
});


    it("should return series for 8",function(done){
      server
        .get("/fib/8")
        .expect("Content-type",/json/)
        .expect(200) // THis is HTTP response
        .end(function(err,res){
            // HTTP status should be 200
            var arr = {"fib" : [ 0,1,1,2,3,5,8,13,21]};
            console.log("N = 8 ");
            console.log("content of array");
            console.log(res.body);
            res.status.should.equal(200);
            res.body.should.be.json;
            res.body.should.eql(arr);
            done();
        });
});
    it(" negative number should return status code 400",function(done){
      server
        .get("/fib/-1")
        .expect("Content-type",/json/)
        .expect(200) // THis is HTTP response
        .end(function(err,res){
            // HTTP status should be 400
            var arr = {"error":false,"message":"The number cannot be negative"};
            console.log("N = -1 ");
            console.log("content of array");
            console.log(res.body);
            res.status.should.equal(400);
            res.body.should.eql(arr);
            done();
        });
    });

});
