var vehicle = require("./parent");

var car = (function (parent) {
    var car = Object.create(parent);
    Object.defineProperties(car, {
        init: {
            value: function (wheels, doors) {
                parent.init.call(this, wheels);
                this.doors = doors;
                return this;
            }
        }
    });

    return car;
}(vehicle));

var myCar = Object.create(car).init(4, 5);

console.log(vehicle.isPrototypeOf(myCar));