/*jslint nomen: true*/
var dog = require('./dog'),
    kimi = Object.create(dog).init('Kimi', 0.25, true);

console.log(kimi.toString());

kimi.isSleeping = false;
console.log(kimi.toString());

console.log(kimi);

kimi.addToy({name: 'ball', type: 'soft'});
console.log(kimi);