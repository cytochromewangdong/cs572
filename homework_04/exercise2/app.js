const http = require("http");
const rxjs = require("rxjs");
const url = require("url");
const {fork} = require("child_process");
const {Subject} = rxjs;
const handler  = new Subject();
handler.subscribe((reqres)=>{
    console.log(reqres.req.url);
    const reqURLObject = url.parse(reqres.req.url, true);
    if(reqURLObject.query && reqURLObject.query["url"])
    {
        const worker = fork("fileWorker.js");
        worker.on('message', e=>{
            if(!e.err)
            {
                reqres.res.end(e.data+"");
            }
            else {
                reqres.res.writeHead(500, {});
                reqres.res.end();
                console.log(e.err)
            }
            worker.send({action:'stop'});

        });
        worker.send({action:'start',data:reqURLObject.query["url"]});
    }
});
const server = http.createServer((req,res)=>{
    handler.next({"req":req, "res":res});
});
server.listen(4000, ()=>console.log("server started and listening on port 4000!"));

