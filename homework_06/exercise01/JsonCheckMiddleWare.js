const jsonChecker = function( req, res, next ) {
  let data = '';
  req.on('data', (chunk)=>{
      data  += chunk;
  })
  req.on('end', ()=>{
      req.rawBody = data;
      if(data)
      {
        if(data.indexOf('{') >=0){
            try{
                req.body = JSON.parse(data);
            } catch(e)
            {
                next(e);
            }
        } else {
            next("Invalid json format!");
        }

      } 
      next();
  });
  req.on('end', function() {
    req.rawBody = data;
    console.log( 'on end: ', data )
    if (data && data.indexOf('{') > -1 ) {
      req.body = JSON.parse(data);
    }
    next();
  });
}
module.exports = jsonChecker;