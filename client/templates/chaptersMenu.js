Template.chaptersMenu.helpers({
	chapters: function () {
		var currentChapterCount = Session.get('currentChapterCount');
		var chapters = [];

		for (var i = 0; i < currentChapterCount; i++) {
			var chapterItem = {};
			chapterItem.chapterSN = i + 1;
			chapters.push(chapterItem);
		};

		return chapters;
	},
	bookName: function () {
		return Session.get('currentBookName'); 
	},
	chapterSN: function () {
		return Session.get('currentChapter');
	}
});

Template.chaptersMenu.events({
	'click button': function () {
		Router.go('booksMenu');
	}
});