const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {ObjectID, MongoClient} = require("mongodb");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const OK_RESULT= {result:"OK"}
function clone(obj)
{
	return JSON.parse(JSON.stringify(obj));
}
function wrapResult(obj){
	return {result: obj};
}

function precheckId(req, res, next){
	const id = req.params.id;
  try{
    req.lectureId = new ObjectID(req.params.id);
  }catch(e)
  {
    return next(createError(400));
  }
	next();	
	
}
var lecturesRouter = express.Router();
let client;
lecturesRouter.get('/', function(req, res, next) {
  client.db("homework07").collection("lectures").find().toArray((err,data)=>{
    if (err) 
    {
      return next(err)
    }
    res.status(data.length==0?204:200).send(wrapResult(data));      
  });
});
lecturesRouter.get('/:id', precheckId, function(req, res, next) {
  console.log(req.params.id);
  client.db("homework07").collection("lectures").findOne({
    "_id":req.lectureId
  },{}, (err,data)=>{
    if (err) 
    {
      return next(err)
    }
    if(!data) {
      return next(createError(404));
    }
    res.status(200).send(wrapResult(data));      
  });
});
lecturesRouter.post('/', function(req, res, next) {
  const lecture = clone(req.body);
  client.db("homework07").collection("lectures").insertOne(lecture, (err,result)=>{
    if (err) 
    {
      return next(err)
    }
    res.status(201).send(wrapResult(lecture));      
  });
});

lecturesRouter.put('/:id',precheckId, function(req, res, next) {
  const newLecture = clone(req.body);

  client.db("homework07").collection("lectures").updateOne({
    _id:req.lectureId
  }, {$set: newLecture}, (err,result)=>{
    if (err) 
    {
      return next(err)
    }
    // ID does not exist
    if(result.result.n===0){
      return next(createError(404));
    }
    res.status(202).send(OK_RESULT);      
  });
});

lecturesRouter.delete('/:id',precheckId, function(req, res, next) {
  client.db("homework07").collection("lectures").deleteOne({
    _id:req.lectureId
  }, (err,result)=>{
    if (err) 
    {
      return next(err)
    }
    if(result.result.n===0){
      return next(createError(404));
    }
    res.status(200).send(OK_RESULT);      
  });
});
const searchRouter = express.Router();
searchRouter.post("/:q",function(req, res, next){
  client.db("homework07").collection("lectures").find({
    lecture:{$regex:req.params.q}
  }).toArray((err,data)=>{
    if (err) 
    {
      return next(err)
    }
    res.status(data.length==0?204:200).send(wrapResult(data));      
  });
});

app.use('/lectures', lecturesRouter);

app.use('/search', searchRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.error(err.message);
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.send(err.message);
}); 
async function startAppWithMongo(){
  client = await MongoClient.connect("mongodb://127.0.0.1:27017");
  app.listen(3000, ()=>{console.log("app starting on port 3000")});
}
startAppWithMongo();
