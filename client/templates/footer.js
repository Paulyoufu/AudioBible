Session.setDefault('isPlaying', false);   //当前是否正在播放

Template.footer.helpers({
	isPlaying: function () {
		return Session.get('isPlaying');
	}
});

Template.footer.events({
	'click button[data-skipbackward]': function () {

		abcGlobal.media.clearTimeOut();
       // BibleScrollTop();
		lastChapter();
		if(Session.get('isPlaying')){
			//播放
			abcGlobal.media.clearTimeOut();
			abcGlobal.media.initAudio();
			abcGlobal.media.playAudio();
			abcGlobal.media.timedCount();
		}
	},'click button[data-play]': function () {
		Session.set('isPlaying', ! Session.get('isPlaying'));
		if(Session.get('isPlaying')){
			abcGlobal.media.playAudio();
			abcGlobal.media.timedCount();
		}else{
			abcGlobal.media.pauseAudio();
			abcGlobal.media.clearTimeOut();
            $("#divBible span").removeClass("blue");
		}
	},'click button[data-skipforward]': function () {

		abcGlobal.media.clearTimeOut();
        BibleScrollTop();
		nextChapter();
		if(Session.get('isPlaying')){
			//播放
			abcGlobal.media.clearTimeOut();
			abcGlobal.media.initAudio();
			abcGlobal.media.playAudio();
			abcGlobal.media.timedCount();
		}
	}
	// ,'click button[data-kj]': function () {
	// 	abcGlobal.media.fastDorward();
	// }
	
});

