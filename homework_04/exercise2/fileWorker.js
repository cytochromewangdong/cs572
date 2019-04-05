const fs = require("fs");
process.on("message",e=>{
    const handler = {
        start(data) {
            try{
                const fstream  = fs.createReadStream(data);
                fstream.on('data',(d)=>{
                    process.send({data:d.toString()});
                }).on('end', ()=>{
                    process.send({action:'end'});
                });
            } catch(e)
            {
                process.send({err:JSON.stringify(e)}); 
            }
        },
        stop(data){
            process.exit(0);
        }
    }
    if(handler[e.action])
    {
        handler[e.action](e.data);
    }
});