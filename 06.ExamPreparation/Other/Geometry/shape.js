/*jslint nomen: true */
var point = require('./point'),
    shape = (function () {
        'use strict';
        var shape = {};
        Object.defineProperties(shape, {
            _center: {
                get: function () {
                    return this.center;
                },

                set: function (value) {
                    if (!this.center) {
                        this.center = value;
                    }
                }
            },

            init: {
                enumerable: true,
                value: function (geometricCenter) {
                    this._center = geometricCenter;
                    return this;
                }
            }
        });

        return shape;
    }());

module.exports = shape;