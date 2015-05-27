Template.chapterItem.events({
	'click': function () {
		Session.set('currentChapter', this.chapterSN);
		abcGlobal.Media.init_audio();//初始化音频
	}
});