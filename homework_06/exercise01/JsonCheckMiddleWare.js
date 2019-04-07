const createError = require('http-errors');
const zlib = require('zlib')
const contentType = require('content-type')
const jsonChecker = function( req, res, next ) {
  var length = req.headers['content-length'];
  var encoding = (req.headers['content-encoding']||'plain').toLowerCase()
  switch (encoding) {
    case 'deflate':
      stream = zlib.createInflate()
      req.pipe(stream)
      break
    case 'gzip':
      stream = zlib.createGunzip()
      req.pipe(stream)
      break
    case 'plain':
      stream = req
      stream.length = length
      break
    default:
        next(createError(415, `unsupported content encoding ${encoding}`));
  }
  let charset = 'utf8';
  try{
    charset = contentType.parse(req).parameters.charset.toLowerCase();
  } catch(e)
  {
    
  }
 
  let buffer = [];
  stream.on('data', (chunk)=>{
    buffer.push(chunk);
  })
  stream.on('end', function() {
      var data  = Buffer.concat(buffer).toString("utf8");
      req.rawBody = data;
      if(data)
      {
        if(data.indexOf('{') >=0){
            try{
                req.body = JSON.parse(data);
            } catch(e)
            {
                return next(createError(400), "invalid json format!");
            }
        } else {
            return next(createError(400), "invalid json format!");
        }
      } 
      next();
  });
}
module.exports = jsonChecker;