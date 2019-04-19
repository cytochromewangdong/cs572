var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const bcrypt = require('bcrypt');

var apiRouter = express.Router();
const jwt  = require('jsonwebtoken');
const PUBLIC_KEY=`
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAIl14k0UTEOcQkKcfhCKDSsLIV3fDViJ
UiebX5l4EOQxWNEbdIWzoQUshKcAXP/SET1MqLruPKA8BWcBVWR9eKsCAwEAAQ==
`;
const PRIVATE_KEY=`
MIIBOwIBAAJBAIl14k0UTEOcQkKcfhCKDSsLIV3fDViJUiebX5l4EOQxWNEbdIWz
oQUshKcAXP/SET1MqLruPKA8BWcBVWR9eKsCAwEAAQJAQmczEf8rNEII9Dq632yB
Hfj7fmhg/xMfH8j77pxEtKaxm9U/LeOtin5TPRgE1etnJtPXFUSQ+H7pW1tMR44e
kQIhAPggzfxVzRtxVPR5VmQfR9vAMFaAmf3IvM1MF7VI9TqjAiEAjdJIKCIIqovM
Iatek8rb4wIH+BMEWBgpuaz74w3a8lkCIQDRMS8ZH+mFyn3ag3X/gZPexGC8fT3X
BeePmiie0XzWywIgOQ7UJwliUTNDYnxu5aklBFTp3d3QzpySFPjKspP9dakCIQDm
XX9j/1CPBWx1zCJEJiEnif3y8wgG0RlzauXHJBin/w==111
`
var app = express();

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use("/api/protected", function(req, res, next) {
  let token = req.headers['authorization'];
  console.log(token);
  if(!token)
  {
    return  next(createError(401, "Please pass in token"));
  }
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
      if (err) {
        next(createError(401, "Token is invalid"));
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    next(createError(401, "Please pass in token"));
  }

  // var token = jwt.sign(payload, privateKEY, signOptions);
});

let users=[{email:"d@d.com"}];
/* GET users listing. */
apiRouter.get('/checkDuplicate/:email', function(req, res, next) {
//   res.send('respond with a resource');
    let found = users.filter(user=>user.email===req.params.email);
    if(found.length>0){
        res.json({result:false});
    } else {
        res.json({result:true});
    }
});
apiRouter.get("/protected", (req, res, next)=>{
  res.json({secret:"Nothing is secret!"});
});
apiRouter.post('/login',function(req, res, next) {

  bcrypt.hash(req.body.password, 2, function(err, hash) {
    console.log("encrypted password:" + hash);
  });

  
  let token = jwt.sign({username: "wangdong"},
    PRIVATE_KEY,
    { expiresIn: '12h' 
    }
  );
  res.json({
    result: true,
    message: 'Authentication successful!',
    openId: token
  });
});

app.use('/api', apiRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500).send(err.message);
});

app.listen(3000,()=>console.log("Server is listening on the port!"));
