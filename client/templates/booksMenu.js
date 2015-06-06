Template.booksMenu.helpers({
	booksList: function () {
		return Session.get('booksList');
	},
	bookName: function () {
		return Session.get('currentBookName'); 
	},
	chapterSN: function () {
		return Session.get('currentChapter');
	}
});