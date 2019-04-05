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
            const allInOneHandler = {
                error(){
                    reqres.res.writeHead(500, {"Content-Type":"text/plain"});
                    reqres.res.end("internal error!"+e.error);
                    worker.send({action:'end'});
                },
                data(){
                    console.log("data coming...")
                    const buff = new Buffer(e.data, 'base64');  
                    reqres.res.write(buff);
                },
                end(){
                    console.log("end...")
                    worker.send({action:'end'});
                    reqres.res.end();
                }
            }
            if(e.action in allInOneHandler){
                allInOneHandler[e.action]();
            } else {
                console.log(`Strange data: ${e}`);
            }

        });
        worker.send({action:'start',data:reqURLObject.query["url"]});
    }
});
const server = http.createServer((req,res)=>{
    handler.next({"req":req, "res":res});
});
server.listen(4000, ()=>console.log("server started and listening on port 4000!"));

