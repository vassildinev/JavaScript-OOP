/* Task Description */
/* 
	Create a function constructor for Person. Each Person must have:
	*	properties `firstname`, `lastname` and `age`
		*	firstname and lastname must always be strings between 3 and 20 characters, containing only Latin letters
		*	age must always be a number in the range 0 150
			*	the setter of age can receive a convertible-to-number value
		*	if any of the above is not met, throw Error 		
	*	property `fullname`
		*	the getter returns a string in the format 'FIRST_NAME LAST_NAME'
		*	the setter receives a string is the format 'FIRST_NAME LAST_NAME'
			*	it must parse it and set `firstname` and `lastname`
	*	method `introduce()` that returns a string in the format 'Hello! My name is FULL_NAME and I am AGE-years-old'
	*	all methods and properties must be attached to the prototype of the Person
	*	all methods and property setters must return this, if they are not supposed to return other value
		*	enables method-chaining
*/
function solve() {
	var Person = (function () {
        function validateName(name) {
            if(typeof name !== 'string') {
                throw new Error('Name must be a valid string');
            }

            if(name.length < 3 || name.length > 20) {
                throw new Error('Invalid name length');
            }

            for(var i = 0, len = name.length; i < len; i += 1) {
                var code = name.charCodeAt(i);

                if(!(((code >= 65) && (code <= 90)) || ((code >= 97) && (code <= 122)))) {
                    throw new Error('Name must contain only Latin letters')
                }
            }
        }

        function validateAge(age) {
            function isNumber(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            }

            if(typeof age !== 'Number' && !isNumber(age)) {
                throw new Error('Age must be a number');
            }

            if(age < 0 || age > 150) {
                throw new Error('Age must be a valid number between 0 and 150');
            }
        }

		function Person(firstname, lastname, age) {
            this.firstname = firstname;
            this.lastname = lastname;
            this.age = age;
		}

        Object.defineProperties(Person.prototype, {
            firstname: {
                get: function() {
                    return this._firstname;
                },

                set: function(value) {
                    validateName(value);
                    this._firstname = value;
                    return this;
                }
            },

            lastname: {
                get: function() {
                    return this._lastname;
                },

                set: function(value) {
                    validateName(value);
                    this._lastname = value;
                    return this;
                }
            },

            age: {
                get: function() {
                    return this._age;
                },

                set: function(value) {
                    validateAge(value);
                    this._age = value;
                    return this;
                }
            },

            fullname: {
                get: function() {
                    return this.firstname + ' ' + this.lastname;
                },

                set: function(value) {
                    var names = value.split(' '),
                        fname = names[0],
                        lname = names[1];

                    validateName(fname);
                    validateName(lname);

                    this.firstname = fname;
                    this.lastname = lname;

                    return this;
                }
            },

            introduce: {
                value: function() {
                    return 'Hello! My name is ' + this.fullname + ' and I am ' + this.age + '-years-old'
                }
            }
        });
		
		return Person;
	} ());

	return Person;
}

module.exports = solve;