Template.chapterItem.events({
	'click': function () {
		Session.set('currentChapter', this.chapterSN);
		abcGlobal.Media.init_audio();//初始化音频
		abcGlobal.Media.play_audio();
		Session.set('isPlaying',true);
	}
});