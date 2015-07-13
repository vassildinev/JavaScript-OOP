/*jslint nomen: true*/
var animal = require('./animal'),
    dog = (function (parent) {
        'use strict';
        var dog = Object.create(parent);
        Object.defineProperties(dog, {
            init: {
                value: function (name, age, isSleeping) {
                    parent.init.call(this, name, age);
                    this.isSleeping = isSleeping;
                    return this;
                }
            },

            toString: {
                value: function () {
                    return this.isSleeping ? 'Zzz... (sleeping)' : 'Djaf! I want to play, human!';
                }
            }
        });

        return dog;
    }(animal));

module.exports = dog;