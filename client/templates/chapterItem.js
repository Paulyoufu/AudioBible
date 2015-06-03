Template.chapterItem.events({
	'click': function () {
		Session.set('currentChapter', this.chapterSN);
		abcGlobal.media.clearTimeOut();
		abcGlobal.media.initAudio();
		abcGlobal.media.playAudio();
		abcGlobal.media.timedCount();
	}
});