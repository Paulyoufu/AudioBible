Template.chapterItem.events({
	'click': function () {
		
		Session.set('currentBook', Session.get('selectedBook'));
		Session.set('currentChapter', this.chapterSN);
		Session.set('currentChapterCount', Session.get('selectedChapterCount'));
		Session.set('currentBookName', Session.get('selectedBookName'));

		abcGlobal.media.initAudio();
		if(Session.get('isPlaying')){
			//播放
			abcGlobal.media.playAudio();
		}

        CharpterScrollTop();
        BibleScrollTop();

        // 记录本次读经位置
		setSetting(Session.get('currentBook'), Session.get('currentChapter'));
	}
});