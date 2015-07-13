/*jslint nomen: true */
var point = (function () {
    'use strict';
    var point = {};
    Object.defineProperties(point, {
        _x: {
            get: function () {
                return this.x;
            },

            set: function (value) {
                if (!this.x) {
                    this.x = value;
                }
            }
        },

        _y: {
            get: function () {
                return this.y;
            },

            set: function (value) {
                if (!this.y) {
                    this.y = value;
                }
            }
        },

        init: {
            value: function (x, y) {
                this._x = x;
                this._y = y;
                return this;
            }
        }
    });

    return point;
}());

module.exports = point;