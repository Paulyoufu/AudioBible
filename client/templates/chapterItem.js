Template.chapterItem.events({
	'click': function () {
		Session.set('currentChapter', this.chapterSN);
		abcGlobal.media.initAudio();
		if(Session.get('isPlaying')){
			//播放
			abcGlobal.media.playAudio();
		}
	}
});