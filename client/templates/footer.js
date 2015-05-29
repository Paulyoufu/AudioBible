Session.setDefault('isPlaying', false);   //当前是否正在播放

Template.footer.helpers({
	isPlaying: function () {
		return Session.get('isPlaying');
	}
});

Template.footer.events({
	'click button[data-skipbackward]': function () {
		lastChapter();
		abcGlobal.Media.on_audio();
	},'click button[data-play]': function () {
		Session.set('isPlaying', ! Session.get('isPlaying'));
		if(Session.get('isPlaying')){
			abcGlobal.Media.play_audio();
		}else{
			abcGlobal.Media.pause_audio();
		}
	},'click button[data-skipforward]': function () {
		nextChapter();
		abcGlobal.Media.Under_audio();
	}
	
});