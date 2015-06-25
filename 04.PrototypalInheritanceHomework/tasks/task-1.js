/* Task Description */
/*
* Create an object domElement, that has the following properties and methods:
  * use prototypal inheritance, without function constructors
  * method init() that gets the domElement type
    * i.e. `Object.create(domElement).init('div')`
  * property type that is the type of the domElement
    * a valid type is any non-empty string that contains only Latin letters and digits
  * property innerHTML of type string
    * gets the domElement, parsed as valid HTML
	  * <type attr1="value1" attr2="value2" ...> .. content / children's.innerHTML .. </type>
  * property content of type string
    * sets the content of the element
    * works only if there are no children
  * property attributes
    * each attribute has name and value
    * a valid attribute has a non-empty string for a name that contains only Latin letters and digits or dashes (-)
  * property children
    * each child is a domElement or a string
  * property parent
    * parent is a domElement
  * method appendChild(domElement / string)
    * appends to the end of children list
  * method addAttribute(name, value)
    * throw Error if type is not valid
  * // method removeAttribute(attribute)
*/


/* Example

var meta = Object.create(domElement)
	.init('meta')
	.addAttribute('charset', 'utf-8');

var head = Object.create(domElement)
	.init('head')
	.appendChild(meta)

var div = Object.create(domElement)
	.init('div')
	.addAttribute('style', 'font-size: 42px');

div.content = 'Hello, world!';

var body = Object.create(domElement)
	.init('body')
	.appendChild(div)
	.addAttribute('id', 'cuki')
	.addAttribute('bgcolor', '#012345');

var root = Object.create(domElement)
	.init('html')
	.appendChild(head)
	.appendChild(body);

console.log(root.innerHTML);
Outputs:
<html><head><meta charset="utf-8"></meta></head><body bgcolor="#012345" id="cuki"><div style="font-size: 42px">Hello, world!</div></body></html>
*/


function solve() {
	var domElement = (function () {

        var self = this;

		function validCharacters(value) {
			for(var i = 0, len = value.length; i < len; i += 1) {
				var code = value.charCodeAt(i);

				if(!(((code >= 65) && (code <= 90)) || ((code >= 97) && (code <= 122)) || ((code >= 48) && (code <= 57)))) {
					return false;
				}
			}

			return true;
		}

		function validNameCharacters(value) {
			for(var i = 0, len = value.length; i < len; i += 1) {
				var code = value.charCodeAt(i);

				if(!(((code >= 65) && (code <= 90)) || ((code >= 97) && (code <= 122)) || value[i] === '-')) {
					return false;
				}
			}

			return true;
		}

		var domElement = {
			init: function(type) {
				if(type === '' || !validCharacters(type) || !isNaN(type)) {
					throw new Error('Type must be a valid non-empty string')
				}

                this.type = type;
                this.attributes = [];
                this.children = [];
                this.parent = {};
                this.content = '';

				return this;
			},
			appendChild: function(child) {
                this.children.push(child);

                child.parent = this;

				return this;
			},
			addAttribute: function(name, value) {
                var isRepeating = false,
                    indexOfRepeatingAttribute = -1;

				if(name === '' || !validNameCharacters(name)) {
					throw new Error('Invalid name of attribute')
				}

                for(var i = 0, len = this.attributes.length; i < len; i += 1) {
                    if(this.attributes[i].name === name) {
                        isRepeating = true;
                        indexOfRepeatingAttribute = i;
                    }
                }

                if(!isRepeating){
                    this.attributes.push({name: name, value: value});
                } else {
                    this.attributes[indexOfRepeatingAttribute].value = value;
                }

                this.attributes = this.attributes.sort(function(x, y) {
                    return x.name > y.name;
                });

				return this;
			},
            get innerHTML() {
                var openTag = '<' + this.type,
                    closeTag = '</' + this.type + '>',
                    attrLen = this.attributes.length,
                    childLen = this.children.length,
                    content = '';

                if (attrLen !== 0) {
                  for (var i = 0; i < attrLen; i += 1) {
                      openTag += ' ' + this.attributes[i].name + '="' + this.attributes[i].value + '"';
                  }
                }

                openTag += '>';

                var child;
                for( i = 0; i < childLen; i += 1){
                    child = this.children[i];

                    if(typeof child === 'string') {
                        content += child;
                    } else {
                        content += child.innerHTML;
                    }
                }

                return openTag + content + this.content + closeTag;
            },

            get content() {
                return this._content;
            },

            set content(value) {
                if(this.children.length === 0) {
                    this._content = value;
                } else {
                    //this._content = this._content;
                }

                return this;
            }
        };

		return domElement;
	} ());

	return domElement;
}

module.exports = solve;
