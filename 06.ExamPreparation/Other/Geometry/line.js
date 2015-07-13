/*jslint nomen: true */
var point = require("./point"),
    line = (function () {
        'use strict';
        var line = {};
        Object.defineProperties(line, {
            _start: {
                get: function () {
                    return this.start;
                },

                set: function (value) {
                    if (!this.start) {
                        this.start = value;
                    }
                }
            },

            _end: {
                get: function () {
                    return this.end;
                },

                set: function (value) {
                    if (!this.end) {
                        this.end = value;
                    }
                }
            },

            _length: {
                get: function () {
                    return this.length;
                },

                set: function (value) {
                    if (!this.length) {
                        this.length = value;
                    }
                }
            },

            init: {
                value: function (start, end) {
                    this._start = start;
                    this._end = end;

                    var dx = Math.abs(start.x - end.x),
                        dy = Math.abs(start.y - end.y);
                    this._length = Math.sqrt(dx * dx + dy * dy);

                    return this;
                }
            }
        });

        return line;
    }());