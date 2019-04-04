const rxjs = require("rxjs");
const os = require("os");
const {Observable} = rxjs;
// const subject = new Subject();
// subject.subscribe((e)=>{
//     console.log(e);
// });
function checkSystem(){
    return Observable.create(obs=>{
		obs.next("Checking your system...")
	    if(os.cpus().length<2)
	    {
	        obs.error("Processor is not supported");
	    }
	    if(os.totalmem()<4*1024*1024*1024)
	    {
	        obs.error("This app needs at least 4GB of RAM");
	    }
	    obs.complete()
    })
	

}
checkSystem().subscribe(console.log, console.log, c=>console.log("System is checked successfully"));