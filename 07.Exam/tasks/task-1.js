function solve() {
    var _nextItemId = 1,
        _nextCatalogId = 1;

    function validateName(name) {
        if (typeof name !== 'string' || name.length < 2 || name.length > 40) {
            throw new Error('Invalid item name');
        }
    }

    function validateDescription(description) {
        if (typeof description !== 'string' || description === '') {
            throw new Error('Invalid item description');
        }
    }

    function validateIsbn(isbn) {
        if (typeof isbn !== 'string' || !(isbn.length === 10 || isbn.length === 13)) {
            throw new Error('Invalid book ISBN');
        }

        var doesNotContainOnlyDigits = false;

        for (var i = 0, len = isbn.length; i < len; i += 1) {
            var currentCharCode = isbn.charCodeAt(i);
            if (currentCharCode < 48 || currentCharCode > 57) {
                throw new Error('Invalid book ISBN')
            }
        }
    }

    function validateGenre(genre) {
        if (typeof genre !== 'string' || genre.length < 2 || genre.length > 20) {
            throw new Error('Invalid genre');
        }
    }

    function validateRating(rating) {
        if (typeof rating !== 'number' || rating < 1 || rating > 5) {
            throw  new Error('Invalid media rating');
        }
    }

    function validateDuration(duration) {
        if (typeof duration !== 'number' || duration <= 0) {
            throw new Error('Invalid media duration');
        }
    }

    function validateItem(itemToValidate) {
        if (!item.isPrototypeOf(itemToValidate)) {
            if (!(typeof item === 'object' && itemToValidate.hasOwnProperty('name') &&
                itemToValidate.hasOwnProperty('description'))) {
                throw new Error('Invalid item to add');
            }
        }
    }

    function validateBook(bookToValidate) {
        if (!item.isPrototypeOf(bookToValidate)) {
            if (!(typeof item === 'object' && bookToValidate.hasOwnProperty('name') &&
                bookToValidate.hasOwnProperty('description') &&
                bookToValidate.hasOwnProperty('id') &&
                bookToValidate.hasOwnProperty('isbn') &&
                bookToValidate.hasOwnProperty('genre'))) {
                throw new Error('Invalid book to add');
            }
        }
    }

    function validateMedia(mediaToValidate) {
        if (!item.isPrototypeOf(mediaToValidate)) {
            if (!(typeof item === 'object' && mediaToValidate.hasOwnProperty('name') &&
                mediaToValidate.hasOwnProperty('description') &&
                mediaToValidate.hasOwnProperty('duration') &&
                bookToValidate.hasOwnProperty('id') &&
                mediaToValidate.hasOwnProperty('rating'))) {
                throw new Error('Invalid book to add');
            }
        }
    }

    function validateIdToFind(id) {
        if (typeof id !== 'number') {
            throw new Error('Invalid ID to find');
        }
    }

    var item = (function () {
        var item = {};
        Object.defineProperties(item, {
            init: {
                value: function (name, description) {
                    this.id = _nextItemId;
                    _nextItemId += 1;
                    this.name = name;
                    this.description = description;
                    return this;
                }
            },

            name: {
                get: function () {
                    return this._name;
                },

                set: function (value) {
                    validateName(value);
                    this._name = value;
                }
            },

            description: {
                get: function () {
                    return this._description;
                },

                set: function (value) {
                    validateDescription(value);
                    this._description = value;
                }
            }
        });

        return item;
    }());

    var book = (function (parent) {
        var book = Object.create(parent);
        Object.defineProperties(book, {
            init: {
                value: function (name, isbn, genre, description) {
                    parent.init.call(this, name, description);
                    this.isbn = isbn;
                    this.genre = genre;
                    return this;
                }
            },

            isbn: {
                get: function () {
                    return this._isbn;
                },

                set: function (value) {
                    validateIsbn(value);
                    this._isbn = value;
                }
            },

            genre: {
                get: function () {
                    return this._genre;
                },

                set: function (value) {
                    validateGenre(value);
                    this._genre = value;
                }
            }
        });

        return book;
    }(item));

    var media = (function (parent) {
        var media = Object.create(parent);
        Object.defineProperties(media, {
            init: {
                value: function (name, rating, duration, description) {
                    parent.init.call(this, name, description);
                    this.rating = rating;
                    this.duration = duration;
                    return this;
                }
            },

            rating: {
                get: function () {
                    return this._rating;
                },

                set: function (value) {
                    validateRating(value);
                    this._rating = value;
                }
            },

            duration: {
                get: function () {
                    return this._duration;
                },

                set: function (value) {
                    validateDuration(value);
                    this._duration = value;
                }
            }
        });

        return media;
    }(item));

    var catalog = (function () {
        var catalog = {};
        Object.defineProperties(catalog, {
            init: {
                value: function (name) {
                    this.id = _nextCatalogId;
                    _nextCatalogId += 1;
                    this.name = name;
                    this.items = [];
                    return this;
                }
            },

            name: {
                get: function () {
                    return this._name;
                },

                set: function (value) {
                    validateName(value);
                    this._name = value;
                }
            },

            add: {
                value: function () {
                    var items = [].slice.call(arguments);
                    if (Array.isArray(items[0])) {
                        items = items[0];
                    }

                    if (items.length === 0) {
                        throw new Error('When adding items you must add at least 1 item or an array of at least 1 item');
                    }

                    for (var i = 0, len = items.length; i < len; i += 1) {
                        validateItem(items[i]);
                    }

                    for (i = 0, len = items.length; i < len; i += 1) {
                        this.items.push(items[i]);
                    }
                }
            },

            find: {
                value: function (options) {
                    var i, len, id, name, result = [];
                    if (typeof options === 'object') {
                        id = options.id;
                        name = options.name;

                        if (id === undefined && name === undefined) {
                            throw new Error('Invalid find options');
                        } else {
                            if (id === undefined) {
                                for (i = 0, len = this.items.length; i < len; i += 1) {
                                    if (this.items[i].name.toLowerCase() === name.toLowerCase()) {
                                        result.push(this.items[i]);
                                    }
                                }

                                return result;
                            } else {
                                validateIdToFind(id);
                                if (name === undefined) {
                                    for (i = 0, len = this.items.length; i < len; i += 1) {
                                        if (this.items[i].id === id) {
                                            result.push(this.items[i]);
                                        }
                                    }

                                    return result;
                                } else {
                                    for (i = 0, len = this.items.length; i < len; i += 1) {
                                        if (this.items[i].id === id && this.items[i].name.toLowerCase() === name.toLowerCase()) {
                                            result.push(this.items[i]);
                                        }
                                    }

                                    return result;
                                }
                            }
                        }
                    } else {
                        id = options;
                        validateIdToFind(id);
                        for (i = 0, len = this.items.length; i < len; i += 1) {
                            if (this.items[i].id === id) {
                                return this.items[i];
                            }
                        }

                        return null;
                    }
                }
            },

            search: {
                value: function (pattern) {
                    var result = [];
                    if (typeof pattern !== 'string' || pattern === '') {
                        throw new Error('Invalid search pattern');
                    }

                    for (var i = 0, len = this.items.length; i < len; i += 1) {
                        if (this.items[i].name.toLowerCase().indexOf(pattern.toLowerCase()) !== -1 ||
                            this.items[i].description.toLowerCase().indexOf(pattern.toLowerCase()) !== -1) {
                            result.push(this.items[i]);
                        }
                    }

                    return result;
                }
            }
        });

        return catalog;
    }());

    var bookCatalog = (function (parent) {
        var bookCatalog = Object.create(parent);
        Object.defineProperties(bookCatalog, {
            init: {
                value: function (name) {
                    parent.init.call(this, name);
                    return this;
                }
            },

            add: {
                value: function () {
                    var books = [].slice.call(arguments);
                    if (Array.isArray(books[0])) {
                        books = books[0];
                    }

                    if (books.length === 0) {
                        throw new Error('When adding items you must add at least 1 item or an array of at least 1 item');
                    }

                    for (var i = 0, len = books.length; i < len; i += 1) {
                        validateBook(books[i]);
                    }

                    for (i = 0, len = books.length; i < len; i += 1) {
                        this.items.push(books[i]);
                    }
                }
            },

            getGenres: {
                value: function () {
                    var result = '';
                    for (var i = 0, len = this.items.length; i < len; i += 1) {
                        var currentBookGenreAsLowerCase = this.items[i].genre.toLowerCase();
                        if (result.indexOf(currentBookGenreAsLowerCase) === -1) {
                            result += currentBookGenreAsLowerCase;
                            result += ',';
                        }
                    }

                    result = result.split(',').filter(function (item) {
                        return item !== '';
                    });

                    return result;
                }
            },

            find: {
                value: function (options) {
                    var i, len, id, name, genre, result = [];
                    if (typeof options === 'object') {
                        id = options.id;
                        name = options.name;
                        genre = options.genre;

                        if (id === undefined && name === undefined && genre === undefined) {
                            throw new Error('Invalid find options');
                        } else if (id !== undefined && name === undefined && genre === undefined) {
                            for (i = 0, len = this.items.length; i < len; i += 1) {
                                if (this.items[i].id === id) {
                                    result.push(this.items[i]);
                                }
                            }

                            return result === [] ? []: result;
                        } else if (id === undefined && name !== undefined && genre === undefined) {
                            for (i = 0, len = this.items.length; i < len; i += 1) {
                                if (this.items[i].name.toLowerCase() === name.toLowerCase()) {
                                    result.push(this.items[i]);
                                }
                            }

                            return result === [] ? []: result;
                        } else if (id === undefined && name === undefined && genre !== undefined) {
                            for (i = 0, len = this.items.length; i < len; i += 1) {
                                if (this.items[i].genre.toLowerCase() === genre.toLowerCase()) {
                                    result.push(this.items[i]);
                                }
                            }

                            return result === [] ? []: result;
                        } else if (id !== undefined && name !== undefined && genre === undefined) {
                            for (i = 0, len = this.items.length; i < len; i += 1) {
                                if (this.items[i].id === id && this.items[i].name.toLowerCase() === name.toLowerCase()) {
                                    result.push(this.items[i]);
                                }
                            }

                            return result === [] ? []: result;
                        } else if (id != undefined && name === undefined && genre !== undefined) {
                            for (i = 0, len = this.items.length; i < len; i += 1) {
                                if (this.items[i].id === id && this.items[i].genre.toLowerCase() === genre.toLowerCase()) {
                                    result.push(this.items[i]);
                                }
                            }

                            return result === [] ? []: result;
                        } else if (id === undefined && name !== undefined && genre !== undefined) {
                            for (i = 0, len = this.items.length; i < len; i += 1) {
                                if (this.items[i].name.toLowerCase() === name.toLowerCase() && this.items[i].genre.toLowerCase() === genre.toLowerCase()) {
                                    result.push(this.items[i]);
                                }
                            }

                            return result === [] ? []: result;
                        } else if (id !== undefined && name !== undefined && genre !== undefined) {
                            for (i = 0, len = this.items.length; i < len; i += 1) {
                                if (this.items[i].id === id && this.items[i].name.toLowerCase() === name.toLowerCase() && this.items[i].genre.toLowerCase() === genre.toLowerCase()) {
                                    result.push(this.items[i]);
                                }
                            }

                            return result === [] ? []: result;
                        }
                    } else {
                        id = options;
                        validateIdToFind(id);
                        for (i = 0, len = this.items.length; i < len; i += 1) {
                            if (this.items[i].id === id) {
                                return this.items[i];
                            }
                        }

                        return null;
                    }
                }
            }
        });

        return bookCatalog;
    }(catalog));

    var mediaCatalog = (function (parent) {
        var mediaCatalog = Object.create(parent);
        Object.defineProperties(mediaCatalog, {
            init: {
                value: function (name) {
                    parent.init.call(this, name);
                    return this;
                }
            },

            add: {
                value: function () {
                    var media = [].slice.call(arguments);
                    if (Array.isArray(media[0])) {
                        media = media[0];
                    }

                    if (media.length === 0) {
                        throw new Error('When adding items you must add at least 1 item or an array of at least 1 item');
                    }

                    for (var i = 0, len = media.length; i < len; i += 1) {
                        validateMedia(media[i]);
                    }

                    for (i = 0, len = media.length; i < len; i += 1) {
                        this.items.push(media[i]);
                    }
                }
            },

            getTop: {
                value: function (count) {
                    if (typeof count !== 'number' || count < 1) {
                        throw new Error('Invalid getTop count');
                    }

                    var sortedItemsByRating = this.items.sort(function (x, y) {
                        return x.rating < y.rating;
                    });

                    var result = sortedItemsByRating.splice(0, count)
                        .map(function (item) {
                            return {
                                id: item.id,
                                name: item.name
                            }
                        });

                    return result;
                }
            }
        });

        return mediaCatalog;
    }(catalog));

    return {
        getBook: function (name, isbn, genre, description) {
            return Object.create(book).init(name, isbn, genre, description);
        },
        getMedia: function (name, rating, duration, description) {
            return Object.create(media).init(name, rating, duration, description);
        },
        getBookCatalog: function (name) {
            return Object.create(bookCatalog).init(name);
        },
        getMediaCatalog: function (name) {
            return Object.create(mediaCatalog).init(name);
        }
    }
}

var module = solve();
var catalog = module.getBookCatalog('John\'s catalog');

var book1 = module.getBook('The secrets of the JavaScript Ninja', '1234567890', 'IT', 'A book about JavaScript');
var book2 = module.getBook('JavaScript: The Good Parts', '0123456789', 'IT', 'A good book about JS');
catalog.add(book1);
catalog.add(book2);

console.log(catalog.find(book1.id));
//returns book1

console.log(catalog.find({id: book2.id, genre: 'IT'}));
//returns book2

console.log(catalog.search('js'));
// returns book2

console.log(catalog.search('javascript'));
//returns book1 and book2

console.log(catalog.search('Te sa zeleni'))
//returns []
