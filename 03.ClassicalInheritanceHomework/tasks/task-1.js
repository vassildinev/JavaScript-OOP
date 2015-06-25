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
        function validCharacters(value) {
            for(var i = 0, len = value.length; i < len; i += 1) {
                var code = value.charCodeAt(i);

                if(!(((code >= 65) && (code <= 90)) || ((code >= 97) && (code <= 122)))) {
                    return false;
                }
            }

            return true;
        }

        function validateFirstName(value) {
            if((value.length < 3 || value.length > 20) || !validCharacters(value)) {
                throw new Error("Invalid first name length or characters");
            }
        }

        function validateLastName(value) {
            if((value.length < 3 || value.length > 20) || !validCharacters(value)) {
                throw new Error("Invalid last name length");
            }
        }

        function validateAge(value) {
            value |= 0;

            if(value < 0 || value > 150) {
                throw new Error("Invalid age");
            }
        }

		function Person(firstname, lastname, age) {
            this.firstname = firstname;
            this.lastname = lastname;
            this.age = age;
		}

        Object.defineProperty(Person.prototype, 'firstname' , {
            get:
                function () {
                    return this._firstname;
                },
            set: function (value) {
                validateFirstName(value);
                this._firstname = value;
                return this;
            }
        });

        Object.defineProperty(Person.prototype, 'lastname' , {
            get:
                function () {
                    return this._lastname;
                },
            set: function (value) {
                validateLastName(value);
                this._lastname = value;
                return this;
            }
        });

        Object.defineProperty(Person.prototype, 'age' , {
            get:
                function () {
                    return this._age;
                },
            set: function (value) {
                validateAge(value);
                this._age = value;
                return this;
            }
        });

        Object.defineProperty(Person.prototype, 'fullname' , {
            get:
                function () {
                    return this._firstname + ' ' + this._lastname;
                },
            set: function (value) {
                var fname = value.split(' ')[0],
                    lname = value.split(' ')[1];

                validateFirstName(fname);
                validateLastName(lname);

                this._firstname = fname;
                this._lastname = lname;

                return this;
            }
        });

        Person.prototype.introduce = function () {
            return 'Hello! My name is ' + this.fullname + ' and I am ' + this.age + '-years-old';
        };

		return Person;
	} ());

    return Person;
}

module.exports = solve;