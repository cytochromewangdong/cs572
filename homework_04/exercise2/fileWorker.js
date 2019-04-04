const fs = require("fs");
process.on("message",e=>{
    const handler = {
        start(data) {
            try{
                const d = fs.readFileSync(data);
                process.send({data:d.toString()});
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