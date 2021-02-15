const EventEmitter = require('events');

const myEmitter = new EventEmitter();

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