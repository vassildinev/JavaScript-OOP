/*jslint nomen: true*/
var animal = (function () {
    'use strict';
    var animal = {
        init: function (name, age) {
            this.name = name;
            this._age = age;
            this.toys = [];
            return this;
        },

        addToy: function (toy) {
            this.toys.push(toy);
        },

        listToys: function () {
            return this.toys.slice();
        }
    };

    Object.defineProperties(animal, {
        _age: {
            get: function () {
                return this.age;
            },

            set: function (value) {
                if (!this.age) {
                    this.age = value;
                }
            }
        }
    });

    return animal;
}());

module.exports = animal;