const http = require("http");
const fs = require("fs");
const path = require("path");
const args = process.argv.slice(2);
console.log(args);
const fileName = args.length?args[0]:__filename;

const server = http.createServer((req,res)=>{
    res.writeHead(200,{"Content-Type":"application/octet-stream",
    "Content-Disposition": "attachment; filename=\""+path.basename(fileName)+ "\""});
    const data = fs.readFileSync(fileName);
    res.end(data);
});
server.listen(8000,()=>{console.log("Server is on")});