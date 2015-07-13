/*jslint nomen: true */
var shape = require('./shape'),
    point = require('./point'),
    square = (function (parent) {
        'use strict';
        var square = Object.create(parent);
        Object.defineProperties(square, {
            perimeter: {
                enumerable: true,
                get: function () {
                    return 4 * this.side;
                }
            },

            area: {
                enumerable: true,
                get: function () {
                    return this.side * this.side;
                }
            },

            init: {
                enumerable: true,
                value: function (geometricCenter, side) {
                    parent.init.call(this, geometricCenter);
                    this.side = side;
                    return this;
                }
            }
        });

        return square;
    }(shape));

module.exports = square;