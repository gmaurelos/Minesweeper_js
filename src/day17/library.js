/********************************	Build a Library		*************************************
 * Congratulations, you've passed the grueling rigmarole of librarian school and have become 
 * head librarian at your local Books-'N-Stuff.
 *
 * Just as you sit down, eager to utilize all those skills you learned in "Lib 203 - Shushing: 
 * How to Maintain Order While Spitting", you realize you're still using 
 * index cards to handle everything.
 *
 * But no matter, you know some JavaScript, so let's get to work modernizing your new digs.
 *
 * Books-'N-Stuff carries three different types of media: books, CDs, and movies. In this 
 * project you will create a parent class named Media with three subclasses: Book, Movie, 
 * and CD. These three subclasses have the following properties and methods:
 *
 * Book
 * Properties: author (string), title (string), pages (number), isCheckedOut (boolean, initially false),
 * and ratings (array, initially empty).
 * Getters: all properties have a getter
 * Methods: .getAverageRating(), .toggleCheckOutStatus(), and .addRating()
 * Movie
 * Properties: director (string), title (string), runTime (number), isCheckedOut (boolean, 
 * initially false), and ratings (array, initially empty)
 * Getters: all properties have a getter
 * Methods: .getAverageRating(), .toggleCheckOutStatus(), and .addRating()
 * CD
 * Properties: artist (string), title (string), isCheckedOut (boolean, initially false),
 * and ratings (array, initially empty), songs (array of strings)
 * Getters: all properties have a getter
 * Methods: .getAverageRating(), .toggleCheckOutStatus(), and .addRating()
 * If you're looking for a challenge, try to create the four classes without using the steps below.*/


class Media {
	constructor (title){
		this._title = title;
		this._isCheckedOut = false;
		this._ratings = [];
	}

	get title(){
		return this._title;
	}
	get isCheckedOut(){
		return this._isCheckedOut;
	}
	get ratings(){
		return this._ratings;
	}
	set isCheckedOut(bl) {
		this._isCheckedOut = bl;
	}
	toggleCheckOutStatus() {
		this._isCheckedOut = !this._isCheckedOut;
	}

	reducer(acc,curr) {
		return acc+curr;
	}
	getAverageRating(){
		const sum = this._ratings.reduce(this.reducer)
		return sum/ this._ratings.length;
	}
	addRating (rat) {
		this._ratings.push(rat);
	}
}

class Book extends Media {
	constructor (title,author,pages){
		super(title);
		this._author = author;
		this._pages = pages;
	}

	get author() {
		return this._author;
	}
	get pages() {
		return this._pages;
	}
}

// * Properties: director (string), title (string), runTime (number), isCheckedOut (boolean, 
// * initially false), and ratings (array, initially empty)

class Movie extends Media {
	constructor (title,director,runTime){
		super(title);
		this._director = director;
		this._runTime = runTime;
	}

	get director() {
		return this._director;
	}
	get runTime() {
		return this._runTime;
	}
}

// * CD
// * Properties: artist (string), title (string), isCheckedOut (boolean, initially false),
// * and ratings (array, initially empty), songs (array of strings)

class CD extends Media {
	constructor (title,artist,songs){
		super(title);
		this._songs = songs;
		this._artist = artist;
	}

	get songs() {
		return this._songs;
	}
	get artist() {
		return this.artist;
	}
}

const historyOfEverything = new Book('A Short History of Nearly Everything','Bill Bryson',544);
historyOfEverything.toggleCheckOutStatus();

console.log('Book '+historyOfEverything.title+' has _isCheckedOut = '+ historyOfEverything.isCheckedOut );
historyOfEverything.addRating(4);
historyOfEverything.addRating(5);
historyOfEverything.addRating(5);
console.log('Book '+historyOfEverything.title+' has avg rating = '+ historyOfEverything.getAverageRating());
