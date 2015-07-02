/* Task Description */
/* 
* Create a module for a Telerik Academy course
  * The course has a title and presentations
    * Each presentation also has a title
    * There is a homework for each presentation
  * There is a set of students listed for the course
    * Each student has firstname, lastname and an ID
      * IDs must be unique integer numbers which are at least 1
  * Each student can submit a homework for each presentation in the course
  * Create method init
    * Accepts a string - course title
    * Accepts an array of strings - presentation titles
    * Throws if there is an invalid title
      * Titles do not start or end with spaces
      * Titles do not have consecutive spaces
      * Titles have at least one character
    * Throws if there are no presentations
  * Create method addStudent which lists a student for the course
    * Accepts a string in the format 'Firstname Lastname'
    * Throws if any of the names are not valid
      * Names start with an upper case letter
      * All other symbols in the name (if any) are lowercase letters
    * Generates a unique student ID and returns it
  * Create method getAllStudents that returns an array of students in the format:
    * {firstname: 'string', lastname: 'string', id: StudentID}
  * Create method submitHomework
    * Accepts studentID and homeworkID
      * homeworkID 1 is for the first presentation
      * homeworkID 2 is for the second one
      * ...
    * Throws if any of the IDs are invalid
  * Create method pushExamResults
    * Accepts an array of items in the format {StudentID: ..., Score: ...}
      * StudentIDs which are not listed get 0 points
    * Throw if there is an invalid StudentID
    * Throw if same StudentID is given more than once ( he tried to cheat (: )
    * Throw if Score is not a number
  * Create method getTopStudents which returns an array of the top 10 performing students
    * Array must be sorted from best to worst
    * If there are less than 10, return them all
    * The final score that is used to calculate the top performing students is done as follows:
      * 75% of the exam result
      * 25% the submitted homework (count of submitted homeworks / count of all homeworks) for the course
*/

function solve() {
    'use strict';
    var Course = (function () {
        function validateTitle(title) {
            if (title[0] === ' ' || title[title.length - 1] === ' ' || title === '' ||
                    title.length < 2 || title === undefined || title === null || title.indexOf('  ') > 0 ||
                    typeof title !== 'string') {
                throw new Error('Course title must be a non-empty string, at leats 2 characters in length, ' +
                    'not beginning or ending with whitespace, or containing multiple whitespace characters');
            }
        }

        function validatePresentations(presentations) {
            var i, len;

            if (presentations === undefined || presentations === null || presentations.length === 0) {
                throw new Error('Course must have presentations');
            }

            for (i = 0, len = presentations.length; i < len; i += 1) {
                validateTitle(presentations[i]);
            }
        }

        function validateName(name) {
            var i, len;

            if (name === undefined || name === '' || name === null || typeof name !== 'string') {
                throw new Error('A student must have both first name and last name');
            }

            if (name[0].toUpperCase() !== name[0]) {
                throw new Error('Student name must start with a capital letter');
            }

            for (i = 1, len = name.length; i < len; i += 1) {
                if (name[i].toLowerCase() !== name[i]) {
                    throw new Error('Student name must not have any capital letters except the first one');
                }
            }
        }

        function validateStudent(fullname) {
            var names = fullname.split(' '),
                fname = names[0],
                lname = names[1];

            if (names.length > 2) {
                throw new Error('Student must have exactly two names');
            }

            validateName(fname);
            validateName(lname);
        }

        var nextStudentID = 1,
            _title,
            _presentations,
            _students,
            Course = {};

        Object.defineProperties(Course, {
            'title': {
                enumerable: true,
                get: function () {
                    return _title;
                },
                set: function (value) {
                    validateTitle(value);
                    _title = value;
                    return Course;
                }
            },

            'presentations': {
                enumerable: true,
                get: function () {
                    return _presentations;
                },
                set: function (value) {
                    validatePresentations(value);
                    _presentations = value;
                    return Course;
                }
            },

            init: {
                enumerable: true,
                value: function (title, presentations) {
                    this.title = title;
                    this.presentations = presentations;
                    _students = [];

                    return this;
                }
            },

            addStudent: {
                enumerable: true,
                value: function (name) {
                    var currentStudentID = nextStudentID;

                    validateStudent(name);

                    _students[currentStudentID] = {
                        firstname: name.split(' ')[0],
                        lastname: name.split(' ')[1],
                        id: currentStudentID,
                        score: 0
                    };

                    nextStudentID += 1;

                    return currentStudentID;
                }
            },

            getAllStudents: {
                enumerable: true,
                value: function () {
                    return _students.slice().filter(function (item) {
                        return item !== undefined;
                    });
                }
            },

            submitHomework: {
                enumerable: true,
                value: function (studentID, homeworkID) {
                    if (_presentations[homeworkID - 1] === undefined || homeworkID < 1) {
                        throw new Error('Invalid homework ID');
                    }

                    if (_students[studentID] === undefined || studentID < 1) {
                        throw new Error('Invalid student ID');
                    }
                }
            },

            pushExamResults: {
                enumerable: true,
                value: function (results) {
                    var i, len,
                        currentStudent,
                        currentStudentID,
                        currentStudentScore;
                        
                    if(results === undefined || !Array.isArray(results)) {
                        throw new Error('Invalid results to push');
                    }
                    for (i = 0, len = results.length; i < len; i += 1) {
                        currentStudent = results[i];
                        currentStudentID = currentStudent.StudentID;
                        currentStudentScore = currentStudent.Score;

                        if (_students[currentStudentID] === undefined || currentStudentID < 1) {
                            throw new Error('Invalid student ID');
                        }

                        if (isNaN(currentStudentScore) || currentStudentScore === undefined) {
                            throw new Error('Invalid student score');
                        }

                        if (_students[currentStudentID].score !== 0) {
                            throw new Error('Student with ID = ' + currentStudentID + ' tried to cheat!');
                        }

                        _students[currentStudentID].score = currentStudentScore;
                    }
                }
            },

            getTopStudents: {
                enumerable: true,
                value: function () {
                    var topStudents = (_students.slice()).sort(function (x, y) {
                        return x.score < y.score;
                    });

                    return topStudents;
                }
            }
        });

        return Course;
    }());

    return Course;
}

module.exports = solve;
