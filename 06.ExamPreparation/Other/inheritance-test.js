var module = (function () {
    var person = (function () {
        var person = {};
        Object.defineProperties(person, {
            init: {
                value: function (name, age) {
                    this.name = name;
                    this.age = age;
                    return this;
                }
            },

            introduce: {
                value: function () {
                    return 'Hi, I\'m ' + this.name + ' and I am ' + this.age + ' years old.';
                }
            }
        });

        return person;
    }());

    var student = (function (parent) {
        var student = Object.create(parent);
        Object.defineProperties(student, {
            init: {
                value: function (name, age, facultyNumber) {
                    parent.init.call(this, name, age);
                    this.facultyNumber = facultyNumber;
                    return this;
                }
            },

            introduce: {
                value: function () {
                    return parent.introduce.call(this) + ' Faculty No: ' + this.facultyNumber;
                }
            }
        });

        return student;
    }(person));

    var lecturer = (function (parent) {
        var lecturer = Object.create(person);
        Object.defineProperties(lecturer, {
            init: {
                value: function (name, age, numberOfDegrees) {
                    parent.init.call(this, name, age);
                    this.numberOfDegrees = numberOfDegrees;
                    return this;
                }
            },

            introduce: {
                value: function () {
                    return 'Beware, mere mortals, I, ' + this.name + ', have ' + this.numberOfDegrees + ' scientific degrees!';
                }
            }
        });

        return lecturer;
    }(person));

    return {
        getStudent: function (name, age, facultyNumber) {
            return Object.create(student).init(name, age, facultyNumber);
        },

        getLecturer: function (name, age, numberOfDegrees) {
            return Object.create(lecturer).init(name, age, numberOfDegrees);
        }
    }
}());

var pesho = module.getStudent('Pesho', 22, 354);
var gosho = module.getLecturer('Gosho', 86, 10);

console.log(pesho);

console.log(pesho.introduce());
console.log(gosho.introduce());
