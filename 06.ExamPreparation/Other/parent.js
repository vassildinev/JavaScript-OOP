var vehicle = (function () {
    'use strict';
    var _wheels,
        vehicle = {
            init: function (wheels) {
                this.wheels = wheels;
                return this;
            },

            get wheels() {
                return _wheels;
            },

            set wheels(value) {
                _wheels = value;
            }
        };

    return vehicle;
}());

module.exports = vehicle;