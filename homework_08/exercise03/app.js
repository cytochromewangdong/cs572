const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {ObjectID, MongoClient} = require("mongodb");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
let db;
app.use("/poi/",(req,res,next)=>{
  if(!db){
    MongoClient.connect("mongodb://127.0.0.1:27017", (err,client)=>{
      if(err){
        return next(err);
      } else{
        db = client.db("homework08");
        req.db = db;
        next();
      }
    });
  } else {
    req.db = db;
    next();
  }
});

const OK_RESULT= {result:"OK"}
function clone(obj)
{
	return JSON.parse(JSON.stringify(obj));
}
function wrapResult(obj){
	return {result: obj};
}

var poiRouter = express.Router();
poiRouter.post('/', function(req, res, next) {
    const poi = clone(req.body);
    if(!poi.name){
      return next(createError(400,"name is required!"));
    }
    if(!poi.category){
      return next(createError(400,"category is required!"));
  }
  if(!("longitude" in  poi)){
      return next(createError(400,"longitude is required!"));
  } else {
    if(isNaN(poi.longitude))
    {
        return next(createError(400,"longitude is not a number!"));
    }
  }
  if(!("latitude" in  poi)){
    return next(createError(400,"latitude is required!"));
  } else {
    if(isNaN(poi.latitude))
    {
        return next(createError(400,"latitude is not a number!"));
    }
  }
  const newPoi ={
    name:poi.name,
    category:poi.category,
    location:[poi.longitude, poi.latitude]
  }
    db.collection("pois").insertOne(newPoi, (err,result)=>{
      if (err) 
      {
        return next(err)
      }
      res.status(201).send(wrapResult(newPoi));      
    });
});

poiRouter.get('/', function(req, res, next) {
  const category = req.query.category;
  if(!category)
  {
    return next(createError(404));
  }
  const name = req.query.name;
  const poiCond = {location:{$near:[-91.9665342,41.017654]}, category:category}
  const nameCond = name?{name:{$regex:`\\b${name}\\b`, $options:'-i'}}:{};
  //const nameCond = name?{$text:{$search:name}}:{};
  console.log(nameCond)
  Object.assign(poiCond, nameCond);
  db.collection("pois").find(poiCond).limit(3).toArray((err,result)=>{
    if(err){
      return next(createError(err));
    }
    res.send(wrapResult(result));
  });

});


app.use('/poi/', poiRouter);

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
app.listen(3000, ()=>{console.log("app starting on port 3000")});
