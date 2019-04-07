const createError = require('http-errors');
const jsonChecker = function( req, res, next ) {
  let data = '';
  req.on('data', (chunk)=>{
      data  += chunk;
  })
  req.on('end', function() {
      req.rawBody = data;
      if(data)
      {
        // console.log( 'on end: ', data )
        if(data.indexOf('{') >=0){
            try{
                req.body = JSON.parse(data);
            } catch(e)
            {
                return next(createError(400));
            }
        } else {
            return next(createError(400));
        }
      } 
      next();
  });
}
module.exports = jsonChecker;