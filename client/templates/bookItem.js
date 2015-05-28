Template.bookItem.events({
	'click': function () {
		Session.set('currentBook', this.bookSN);
		Session.set('currentChapter', 1);
		Session.set('currentChapterCount', this.chapterCount);
		Session.set('currentBookName', this.fullName);
		abcGlobal.Media.init_audio();//初始化该卷书第一章
		abcGlobal.Media.play_audio();//播放
		Session.set('isPlaying',true);
	}
});