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
  * method removeAttribute(attribute)
    * throw Error if attribute does not exist in the domElement
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
	function validateType(type) {
		if(typeof type !== 'string') {
			throw new Error('Type must be a valid string');
		}

		if(type === '') {
			throw new Error('Type must be a valid non-empty string');
		}

		for(var i = 0, len = type.length; i < len; i += 1) {
			var code = type.charCodeAt(i);

			if(!(((code >= 65) && (code <= 90)) || ((code >= 97) && (code <= 122)) || ((code >= 48) && (code <= 57)))) {
				throw new Error('Type must contain only Latin letters and digits')
			}
		}
	}

    function validateAttributeName(attributeName) {
        if(typeof attributeName !== 'string') {
            throw new Error('Attribute name must be a valid string');
        }

        if(attributeName === '') {
            throw new Error('Attribute name must be a valid non-empty string');
        }

        for(var i = 0, len = attributeName.length; i < len; i += 1) {
            var code = attributeName.charCodeAt(i);

            if(!(((code >= 65) && (code <= 90)) || ((code >= 97) && (code <= 122)) || ((code <= 48) && (code >= 57)) || attributeName[i] === '-')) {
                throw new Error('Attribute name must contain only Latin letters and digits')
            }
        }
    }

	var domElement = (function () {
		var domElement = {
			init: function(type) {
				this.type = type;
				this.children = [];
                this.content = '';
				this.attributes = [];
                this.parent = {};

				return this;
			},

			appendChild: function(child) {
                this.children.push(child);
                child.parent = this;

                return this;
			},

			addAttribute: function(name, value) {
                validateAttributeName(name);

                var exists = false,
                    index = -1,
                    currentAttribute = {};

                for(var i = 0, len = this.attributes.length; i < len; i += 1) {
                    currentAttribute = this.attributes[i];

                    if(currentAttribute.name === name) {
                        index = i;
                        exists = true;
                    }
                }

                if(exists) {
                    this.attributes[index].value = value;
                } else {
                    this.attributes.push({
                        name: name,
                        value: value
                    });
                }

                return this;
			},

            removeAttribute: function(attributeName) {
                var found = false;

                for(var i = 0, len = this.attributes.length; i < len; i += 1) {
                    if(this.attributes[i].name === attributeName) {
                        found = true;
                        this.attributes[i] = undefined;
                    }
                }

                if(!found) {
                    throw new Error('Non-existing attribute to remove');
                }

                this.attributes = this.attributes.filter(function (item) {
                    return item !== undefined;
                });

                return this;
            },

			get innerHTML(){
                this.attributes = this.attributes.sort(function (x, y) {
                    return x.name > y.name;
                });

                var openTag = '<' + this.type,
                    closeTag = '</' + this.type + '>',
                    content = '',
                    currentAttribute = {},
                    currentChild = {},
                    i, len;

                for(i = 0, len = this.attributes.length; i < len; i += 1) {
                    currentAttribute = this.attributes[i];
                    openTag += ' ' + currentAttribute.name + '="' + currentAttribute.value + '"';
                }

                openTag += '>';

                for(i = 0, len = this.children.length; i < len; i += 1) {
                    currentChild = this.children[i];

                    if(typeof currentChild === 'string') {
                        content += currentChild;
                    } else {
                        content += currentChild.innerHTML;
                    }
                }

                return openTag + content + this.content + closeTag;
			},

			get type() {
				return this._type;
			},

			set type(value) {
				validateType(value);
				this._type = value;
				return this;
			},

			get content() {
				return this._content;
			},

			set content(value) {
				if((this.children).length === 0) {
					this._content = value;
				}

				return this;
			}
		};

		return domElement;
	} ());

	return domElement;
}

module.exports = solve;
