const fs = require("fs");
process.on("message",e=>{
    const handler = {
        start(data) {
            try{
                const fstream  = fs.createReadStream(data);
                fstream.on('data',(d)=>{
                    process.send({action:'data', data: d.toString("base64")});
                }).on('end', ()=>{
                    process.send({action:'end'});
                });
            } catch(e)
            {
                process.send({action:'error',error:JSON.stringify(e)}); 
            }
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