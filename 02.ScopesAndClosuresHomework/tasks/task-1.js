/* Task Description */
/* 
	*	Create a module for working with books
		*	The module must provide the following functionalities:
			*	Add a new book to category
				*	Each book has unique title, author and ISBN
				*	It must return the newly created book with assigned ID
				*	If the category is missing, it must be automatically created
			*	List all books
				*	Books are sorted by ID
				*	This can be done by author, by category or all
			*	List all categories
				*	Categories are sorted by ID
		*	Each book/catagory has a unique identifier (ID) that is a number greater than or equal to 1
			*	When adding a book/category, the ID is generated automatically
		*	Add validation everywhere, where possible
			*	Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
			*	Author is any non-empty string
			*	Unique params are Book title and Book ISBN
			*	Book ISBN is an unique code that contains either 10 or 13 digits
			*	If something is not valid - throw Error
*/
function solve() {
	var library = (function () {
		var books = [];
		var categories = [];

		function listBooks(criteria) {
            var result = [];

            if(criteria === undefined) {
                return books;
            }

            if(criteria.category !== undefined && categories[criteria.category] === undefined) {

            } else {
                for(var i = 0, len = books.length; i < len; i += 1) {
                    if(books[i].category === criteria.category) {
                        result.push(books[i]);
                    }
                }
            }

            if(criteria.author !== undefined && categories[criteria.author] === undefined) {

            } else {
                for(var i = 0, len = books.length; i < len; i += 1) {
                    if(books[i].author === criteria.author) {
                        result.push(books[i]);
                    }
                }
            }

            return result;
		}

		function addBook(book) {
			book.ID = books.length + 1;

			var bookTitleLength = book.title.length,
                bookCategoryLength = book.category.length,
                bookISBNLength = book.isbn.length,
                bookAuthor = book.author;

            if(bookTitleLength < 2 || bookTitleLength > 100) {
                throw new Error("Invalid book title length");
            }

            if(bookCategoryLength < 2 || bookCategoryLength > 100) {
                throw new Error("Invalid book category length");
            }

            if(bookISBNLength != 10)
            {
                if(bookISBNLength != 13) {
                    throw new Error("Invalid book ISBN length");
                }
            }

            if(bookAuthor === '') {
                throw new Error("Author name is obligatory");
            }

            for(var i = 0, len = books.length; i < len; i += 1) {
                var currentBook = books[i];

                if(currentBook.isbn === book.isbn) {
                    throw new Error("Repeating ISBN");
                }

                if(currentBook.title === book.title) {
                    throw new Error("Repeating title");
                }
            }

			books.push(book);

            if(!Array.isArray(categories[book.category])) {
                categories[book.category] = [];
                categories[book.category].push(book);
            } else  {
                categories[book.category].push(book);
            }
			return book;
		}

		function listCategories() {
			var result = [];

            for(var item in categories) {
                if(categories.hasOwnProperty(item)) {
                    result.push(item);
                }
            }

            return result;
		}

		return {
			books: {
				list: listBooks,
				add: addBook
			},
			categories: {
				list: listCategories
			}
		};
	} ());
	return library;
}
module.exports = solve;
