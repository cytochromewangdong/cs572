const fs = require("fs");
process.on("message",e=>{
    const handler = {
        start(data) {
            const fstream  = fs.createReadStream(data);
            fstream.on('data',(d)=>{
                process.send({action:'data', data: d.toString("base64")});
            }).on('end', ()=>{
                process.send({action:'end'});
            }).on('error',(err)=>{
                // Finally, I found the exception is handled by the event.
                process.send({action:'error',error:JSON.stringify(err)}); 
            });
        },
        end(data){
            process.exit(0);
        }
    }
    if(handler[e.action])
    {
        handler[e.action](e.data);
    }
});

process.on('uncaughtException', function (err) {
    process.send({action:'error',error:JSON.stringify(err)}); 
  });