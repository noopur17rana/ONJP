process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
var api;
var authlogin;
var tokenapi;
var tokenapi_emma;
var tokenapi_alice;
var response;
var token;
var supertest=require('supertest');
var assert=require("assert");
var fs=require("fs");
var environment=require('../support/env.js');
var rawdata_manytoone=require('../support/emmaresponse.json');
var rawdata_onetoone=require('../support/bobresponse.json');
var rawdata_negbal=require('../support/aliceresponse.json');
var testData=require('../support/testData');
require('dotenv').config();
var rv=environment.executionEnv(api);

module.exports = function() {
    this.Given("bob makes a request", {timeout: 10 * 60000}, function (done) {
        tokenapi=supertest(rv.tokenapi);
        authlogin='/authService/login';
        tokenapi.post(authlogin)
            .set('Content-Type', 'application/json')    
            .send(JSON.stringify(testData.tokenpayload1))
            .expect(200)
            .end(function (err, res) {
            if (err) {
                console.log('Exception was thrown during POST operation');
                throw err;
            }
            token = res.body.token;
            done();
        })
    })

    this.Given("alice makes a request", {timeout: 10 * 60000}, function (done) {
        tokenapi_alice=supertest(rv.tokenapi);
        authlogin='/authService/login';
        tokenapi_alice.post(authlogin)
            .set('Content-Type', 'application/json')    
            .send(JSON.stringify(testData.tokenpayload3))
            .expect(200)
            .end(function (err, res) {
            if (err) {
                console.log('Exception was thrown during POST operation');
                throw err;
            }
            token_alice = res.body.token;
            done();
        })
    })

    this.Given("emma makes a request", {timeout: 10 * 60000}, function (done) {
        tokenapi_emma=supertest(rv.tokenapi);
        authlogin='/authService/login';
        tokenapi_emma.post(authlogin)
            .set('Content-Type', 'application/json')    
            .send(JSON.stringify(testData.tokenpayload2))
            .expect(200)
            .end(function (err, res) {
            if (err) {
                console.log('Exception was thrown during POST operation');
                throw err;
            }
            token_emma = res.body.token;
            done();
        })
    })

    this.When("valid request is logged in to get merge funds transfer details for emma", {timeout: 10 * 60000}, function (done) {
        var basePath="/optimizeFundsService/mergeFunds";
        console.log("Performing POST operation at this basePath: " + basePath);
        console.log("token is", token);
        api=supertest(rv.api);
        api.post(basePath)
            .set('x-access-token', token_emma)    
            .send(testData.manytoonepayload)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log('Exception was thrown during POST operation');
                    throw err;
                }
                response = JSON.stringify(res.body);
                console.log("actual response: ",response);
                done();
            })
    })

    this.When("valid request is logged in to get the merge funds transfer details for bob", {timeout: 10 * 60000}, function (done) {
        var basePath="/optimizeFundsService/mergeFunds";
        console.log("Performing POST operation at this basePath: " + basePath);
        console.log("token is", token);
        api=supertest(rv.api);
        api.post(basePath)
            .set('x-access-token', token)    
            .send(testData.onetoonepayload)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log('Exception was thrown during POST operation');
                    throw err;
                }
                response = JSON.stringify(res.body);
                console.log("actual response: ",response);
                done();
            })
    })

    this.When("valid request is logged in to get total merge funds transfer details for alice", {timeout: 10 * 60000}, function (done) {
        var basePath="/optimizeFundsService/mergeFunds";
        console.log("Performing POST operation at this basePath: " + basePath);
        console.log("token is", token);
        api=supertest(rv.api);
        api.post(basePath)
            .set('x-access-token', token_alice)    
            .send(testData.negbalpayload)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log('Exception was thrown during POST operation');
                    throw err;
                }
                response = JSON.stringify(res.body);
                console.log("actual response: ",response);
                done();
            })
    })

    this.When("request is logged in to get the merge funds transfer details", {timeout: 10 * 60000}, function (done) {
        var basePath="/optimizeFundsService/mergeFunds";
        console.log("Performing POST operation at this basePath: " + basePath);
        token="NNNNbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJvYiIsImlhdCI6MTU0MzM4NTIzOSwiZXhwIjoxNTQzNDcxNjM5fQ.wt6RTAwrLv-tEhyKEw1o02ZT3W1mZv4ZmZXvs6qBedg";
        console.log("token is", token);
        api=supertest(rv.api);
        api.post(basePath)
            .set('x-access-token', token)    
            .send(testData.onetoonepayload)
            .expect(500)
            .end(function (err, res) {
                if (err) {
                    console.log('Exception was thrown during POST operation');
                    throw err;
                }
                response = JSON.stringify(res.body);
                console.log("actual response: ",response);
                done();
            })
    })

    this.Then("asked details are retrieved for alice", {timeout: 10 * 60000}, function (done) {
        var stringdata=JSON.stringify(rawdata_negbal);
        console.log("expected response: ",stringdata);
        assert.equal(response, stringdata, console.log("OK"));
        //response.body.should.be.empty();
        console.log("successful");
        done();
    })

    this.Then("asked details are retrieved for bob", {timeout: 10 * 60000}, function (done) {
        var stringdata=JSON.stringify(rawdata_onetoone);
        console.log("expected response: ",stringdata);
        assert.equal(response, stringdata, console.log("OK"));
        //response.body.should.be.empty();
        console.log("successful");
        done();
    })

    this.Then("asked details are retrieved for emma", {timeout: 10 * 60000}, function (done) {
        var stringdata=JSON.stringify(rawdata_manytoone);
        console.log("expected response: ",stringdata);
        assert.equal(response, stringdata, console.log("OK"));
        //response.body.should.be.empty();
        console.log("successful");
        done();
    })

    this.Then("asked details are not retrieved throwing proper error message", {timeout: 10 * 60000}, function (done) {
        var msg=JSON.parse(response).message;
        assert.equal(msg, "Failed to authenticate token.", console.log("Correct Message thrown"));
        done();
    })
}