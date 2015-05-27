Session.setDefault('isPlaying', false);   //当前是否正在播放

Template.footer.helpers({
	isPlaying: function () {
		return Session.get('isPlaying');
	}
});

Template.footer.events({
	'click button[data-skipbackward]': function () {
		abcGlobal.Media.on_audio();
		lastChapter();
	},'click button[data-play]': function () {
		
		Session.set('isPlaying', ! Session.get('isPlaying'));
		if(Session.get('isPlaying')){
			abcGlobal.Media.pause_audio();
		}else{
			abcGlobal.Media.play_audio();
		}
	},'click button[data-skipforward]': function () {
		abcGlobal.Media.Under_audio();
		nextChapter();
	}
	
});