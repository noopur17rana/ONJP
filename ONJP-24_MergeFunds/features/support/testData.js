require('dotenv').config();
module.exports.tokenpayload1={  
    "username": process.env.username3,
    "password": process.env.password3
};
module.exports.tokenpayload2={  
    "username": process.env.username4,
    "password": process.env.password4
};
module.exports.tokenpayload3={  
    "username": process.env.username1,
    "password": process.env.password1
};
module.exports.tokenpayload4={  
    "username": process.env.username2,
    "password": process.env.password2
};
module.exports.tokenpayload5={  
    "username": process.env.username5,
    "password": process.env.password5
};
module.exports.onetoonepayload={
    "senders":[  
       {  
          "senderBank":"HSBC",
          "senderAccountNumber":"XXXXXX XXXX6123",
          "senderAer":0.1,
          "amount":1000
       }
    ],
    "receiver":{  
       "receiverBank":"Barclays",
       "receiverAccountNumber":"XXXXXX XXXX3222",
       "receiverAer":0.25
    }
 };
 module.exports.manytoonepayload={  
    "senders":[  
       {  
          "senderBank":"HSBC",
          "senderAccountNumber":"XXXXXX XXXX6123",
          "senderAer":0.1,
          "amount":1000
       },
     {  
          "senderBank":"Halifax",
          "senderAccountNumber":"XXXXXX XXXX6789",
          "senderAer":0.2,
          "amount":4000
       }
    ],
    "receiver":{  
       "receiverBank":"Natwest",
       "receiverAccountNumber":"XXXXXX XXXX6183",
       "receiverAer":0.15
    }
 };
 module.exports.negbalpayload={  
    "senders":[  
       {  
          "senderBank":"HSBC",
          "senderAccountNumber":"XXXXXX XXXX6123",
          "senderAer":0.1,
          "amount":2600
       },
     {  
          "senderBank":"Halifax",
          "senderAccountNumber":"XXXXXX XXXX6789",
          "senderAer":0.2,
          "amount":-500
       }
    ],
    "receiver":{  
       "receiverBank":"Barclays",
       "receiverAccountNumber":"XXXXXX XXXX3222",
       "receiverAer":0.25
    }
 };