Template.chapterItem.events({
	'click': function () {
		Session.set('currentChapter', this.chapterSN);
		if(Session.get('isPlaying')){
			//播放
			abcGlobal.media.clearTimeOut();
			abcGlobal.media.initAudio();
			abcGlobal.media.playAudio();
			abcGlobal.media.timedCount();
		}
	}
});