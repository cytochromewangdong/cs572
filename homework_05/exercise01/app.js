const express = require("express");
const axios = require('axios');
const querystring = require('querystring');
const app = express();
app.set("strict routing",true);
app.enable('case sensitive routing');
app.enable('etag');
app.set('etag', 'weak');
app.get("/users",(req,res)=>{
    res.set({
        'Cache-Controle':'private, max-age=86400'
    });
    const fullUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;
    const proxyQuery  = JSON.parse(JSON.stringify(req.query));
    const RESULTS_KEY = "results";
    console.log(proxyQuery);
    if(!(RESULTS_KEY in proxyQuery)){
        proxyQuery[RESULTS_KEY] = 10;
    }
    const result = proxyQuery[RESULTS_KEY];
    const proxyQueryStr = querystring.stringify(proxyQuery);
    //https://randomuser.me/api/?page=3&results=10&seed=abc
    const proxyUrlStr  = `https://randomuser.me/api/?${proxyQueryStr}`
    console.log(proxyUrlStr);
    axios.get(proxyUrlStr)
        .then(function (response) {
            function makeLinke(p, name){
                const baseObject = {[RESULTS_KEY]:result,
                     seed:response.data.info.seed,
                     page: p};
                const qStr = querystring.stringify(baseObject);
                return `<${fullUrl}?${qStr}>; rel="${name}"`;
            }
            const linkArr = [];
            const currentPage = response.data.info.page;
            if(currentPage>1)
            {
                linkArr.push(makeLinke(1,"first"));
                linkArr.push(makeLinke(currentPage - 1,"prev"));
            }
            linkArr.push(makeLinke(currentPage + 1,"next"));
            res.set({
                'Link':linkArr.join(", ")
             });
            res.send(response.data);
        }).catch((e)=>{
            console.error(e);
            res.sendStatus(500);
        });
});
app.listen(8899)