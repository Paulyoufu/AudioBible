Template.bookItem.events({
	'click': function () {
		Session.set('currentBook', this.bookSN);
		Session.set('currentChapter', 1);
		Session.set('currentChapterCount', this.chapterCount);
		Session.set('currentBookName', this.fullName);
		Session.set('isPlaying',true);
	}
});