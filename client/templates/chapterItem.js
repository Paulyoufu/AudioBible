Template.chapterItem.events({
	'click': function () {
		
		Session.set('currentBook', Session.get('selectedBook'));
		Session.set('currentChapter', this.chapterSN);

		abcGlobal.media.initAudio();
		Session.set('currentChapterCount', Session.get('selectedChapterCount'));
		Session.set('currentBookName', Session.get('selectedBookName'));
		SendMsg(Session.get('currentBook'), Session.get('currentChapter'));
		// 记录本次读经位置
		setSetting(Session.get('currentBook'), this.chapterSN);
		
		if(Session.get('isPlaying')){
			//播放
			abcGlobal.media.playAudio();
		}
        CharpterScrollTop();
        BibleScrollTop();
	}
});