require('dotenv').config();
var api;
var tokenapi;
var executionEnvironment=process.env.NODE_ENV;
module.exports={
    executionEnv: function executionEnv(api){
if(executionEnvironment=='sqi')
{
    console.log("sqi environment is set");
    api='http://localhost:3002';
    tokenapi='http://localhost:3000';
    console.log("apiname is: ", api);
    console.log("tokenapiname is: ", tokenapi);
    return {api, tokenapi};
}
else if(executionEnvironment=='dev')
{
    console.log("dev environment is set");
    api='http://localhost:3002';
    tokenapi='http://localhost:3000';
    console.log("apiname is: ", api);
    console.log("tokenapiname is: ", tokenapi);
    return {api, tokenapi};
}
else if(executionEnvironment=='local')
{
    console.log("local environment is set");
    api='http://localhost:3002';
    tokenapi='http://localhost:3000';
    console.log("apiname is: ", api);
    console.log("tokenapiname is: ", tokenapi);
    return {api, tokenapi};
}
else if(executionEnvironment=='uat')
{
    console.log("uat environment is set");
    api='http://localhost:3002';
    tokenapi='http://localhost:3000';
    console.log("apiname is: ", api);
    console.log("tokenapiname is: ", tokenapi);
    return {api, tokenapi};
}
else if(executionEnvironment=='preprod')
{
    console.log("preprod environment is set");
    api='http://localhost:3002';
    tokenapi='http://localhost:3000';
    console.log("apiname is: ", api);
    console.log("tokenapiname is: ", tokenapi);
    return {api, tokenapi};
}
else if(executionEnvironment=='prod')
{
    console.log("prod environment is set");
    api='http://localhost:3002';
    tokenapi='http://localhost:3000';
    console.log("apiname is: ", api);
    console.log("tokenapiname is: ", tokenapi);
    return {api, tokenapi};
}
}
};