Template.booksMenu.rendered = function () {
	//将整本书卷名从数据库查询到，并赋给Session:booksList
	getBooksList(2);
};

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