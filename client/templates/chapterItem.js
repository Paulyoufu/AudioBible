Template.chapterItem.events({
	'click': function () {
		Session.set('currentChapter', this.chapterSN);
		abcGlobal.media.playAudio();
		Session.set('isPlaying',true);
	}
});