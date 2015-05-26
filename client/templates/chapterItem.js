Template.chapterItem.events({
	'click': function () {
		Session.set('currentChapter', this.chapterSN);

	}
});