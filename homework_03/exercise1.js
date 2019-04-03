const dns = require("dns");
const {promisify} = require("util");
const resolve4Promise = promisify(dns.resolve4);
const dnsName = "www.mum.edu";
// Promise invoking
resolve4Promise(dnsName).then(console.log).catch(console.err);

//async awati
async function resolveAsync(dnsName){
    try{
        const ipAddress = await resolve4Promise(dnsName);
        console.log(ipAddress);
    } catch(e)
    {
        console.err(e);
    }

}
resolveAsync(dnsName);