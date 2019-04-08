const createError = require('http-errors');
const express = require('express');
const simpleEncryptor = require('simple-encryptor');

const {MongoClient} = require("mongodb");
var app = express();
let client;
app.get('/secret/',(req,res,next)=>{
    // _id:false should be pass to avoid the _id field.
    client.db("homework01").collection("data").findOne({},
      {projection:{key:true,message:true, _id:false}},(err,document)=>{
        console.log(document);
        const encryptor = simpleEncryptor(document.key);
        const result = encryptor.encrypt(document.message);
        res.send(result);
      });

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500).send(err.message);
});

async function startAppWithMongo(){
    client = await MongoClient.connect("mongodb://homework01:homework01@ds233806.mlab.com:33806/homework01");
    app.listen(3000, ()=>{console.log("app starting on port 3000")});
}
startAppWithMongo();