var square = require('./square'),
    point = require('./point');
var mySquare = Object.create(square).init(Object(point).init(1, 5), 5);

mySquare.side = 25;

mySquare.perimeter = 2;

console.log(mySquare.perimeter);