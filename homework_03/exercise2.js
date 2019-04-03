const EventEmitter = require("events");
const EVENT_NAME = "boom";
class Gym extends EventEmitter{
    constructor(){
        super();
        setInterval(()=>{
            this.emit(EVENT_NAME)
        }, 1000)
    }
}
const gym = new Gym();
gym.on(EVENT_NAME, ()=>{
    console.log("Athlete is working out")
})