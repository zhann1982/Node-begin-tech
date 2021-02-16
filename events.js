const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter {
    constructor(){
        super();
    }
}

const myEmitter = new Sales();

myEmitter.on("newSale", ()=>{
    console.log("There was a sale!");
});

myEmitter.on("newSale", ()=>{
    console.log("Customer name: Jonas.");
});

myEmitter.on("newSale", stock=>{
    console.log(`There are ${stock} items sold.`);
});

myEmitter.emit("newSale", 9);

//------------------------------------------


const server = http.createServer();

server.on('request', (req,res)=>{
    console.log('Request recieved!');
    res.end('Request recieved!');
});

server.on('request', (req,res)=>{
    console.log('Another Request recieved!');
    //res.end('Another Request recieved!');
});

server.on('close', ()=>{
    console.log('Server closed!');
});

server.listen(8000, '127.0.0.1', ()=>{
    console.log('Waiting for request... ');
});