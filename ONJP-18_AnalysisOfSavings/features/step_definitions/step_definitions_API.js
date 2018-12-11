process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
var api;
var authlogin;
var tokenapi;
var response;
var token;
var supertest=require('supertest');
var assert=require("assert");
var fs=require("fs");
var environment=require('../support/env.js');
var rawdata_diff=require('../support/aliceresponse_diff.json');
var rawdata_same=require('../support/bobresponse_same.json');
require('dotenv').config();
var rv=environment.executionEnv(api);

module.exports = function() {
    this.Given("bob makes a request", {timeout: 10 * 60000}, function (done) {
        tokenapi=supertest(rv.tokenapi);
        authlogin='/authService/login';
        var tokenpayload={  
            "username": process.env.username1,
            "password": process.env.password1
        };
        tokenapi.post(authlogin)
            .set('Content-Type', 'application/json')    
            .send(tokenpayload)
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
        tokenapi=supertest(rv.tokenapi);
        authlogin='/authService/login';
        var tokenpayload={  
            "username": process.env.username2,
            "password": process.env.password2
        };
        tokenapi.post(authlogin)
            .set('Content-Type', 'application/json')    
            .send(tokenpayload)
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

    this.When("valid request is logged in to get the optimized savings details", {timeout: 10 * 60000}, function (done) {
        var basePath="/payOutPlanService/calculateBestMatch";
        console.log("Performing GET operation at this basePath: " + basePath);
        console.log("token is", token);
        api=supertest(rv.api);
        api.get(basePath)
            .set('x-access-token', token)    
            .send()
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log('Exception was thrown during GET operation');
                    throw err;
                }
                response = JSON.stringify(res.body);
                console.log("actual response: ",response);
                done();
            })
    })

    this.When("request is logged in to get the optimized savings details", {timeout: 10 * 60000}, function (done) {
        var basePath="/payOutPlanService/calculateBestMatch";
        console.log("Performing GET operation at this basePath: " + basePath);
        token="NNNNbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJvYiIsImlhdCI6MTU0MzM4NTIzOSwiZXhwIjoxNTQzNDcxNjM5fQ.wt6RTAwrLv-tEhyKEw1o02ZT3W1mZv4ZmZXvs6qBedg";
        console.log("token is", token);
        api=supertest(rv.api);
        api.get(basePath)
            .set('x-access-token', token)    
            .send()
            .expect(500)
            .end(function (err, res) {
                if (err) {
                    console.log('Exception was thrown during GET operation');
                    throw err;
                }
                response = JSON.stringify(res.body);
                console.log("actual response: ",response);
                done();
            })
    })

    this.Then("asked details are retrieved with zero optimizeSaving", {timeout: 10 * 60000}, function (done) {
        var stringdata=JSON.stringify(rawdata_same);
        console.log("expected response: ",stringdata);
        assert.equal(response, stringdata, console.log("OK"));
        //response.body.should.be.empty();
        console.log("successful");
        done();
    })

    this.Then("asked details are retrieved with some optimizeSaving", {timeout: 10 * 60000}, function (done) {
        var stringdata=JSON.stringify(rawdata_diff);
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