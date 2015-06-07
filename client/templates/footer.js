Session.setDefault('isPlaying', false);   //当前是否正在播放

Template.footer.helpers({
	isPlaying: function () {
		return Session.get('isPlaying');
	}
});

Template.footer.events({
	'click button[data-skipbackward]': function () {
        BibleScrollTop();
		lastChapter();

		//播放
		abcGlobal.media.initAudio();
		if(Session.get('isPlaying')){
			abcGlobal.media.playAudio();
		}

        // 记录本次读经位置
		setSetting(Session.get('currentBook'), Session.get('currentChapter'));
	},'click button[data-play]': function () {

		Session.set('isPlaying', ! Session.get('isPlaying'));

		if(Session.get('isPlaying')){
			abcGlobal.media.playAudio();
			Session.set('lrcStyle',true);
		}else{
			abcGlobal.media.pauseAudio();
			Session.set('lrcStyle',false);
            $("#divBible span").removeClass("blue");
		}
		  
	},'click button[data-skipforward]': function () {

        BibleScrollTop();
		nextChapter();

		//播放
		abcGlobal.media.initAudio();
		if(Session.get('isPlaying')){
			abcGlobal.media.playAudio();
		}

        // 记录本次读经位置
		setSetting(Session.get('currentBook'), Session.get('currentChapter'));
	}
	
});

