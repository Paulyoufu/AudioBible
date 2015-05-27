Session.setDefault('isPlaying', false);   //当前是否正在播放

Template.footer.helpers({
	isPlaying: function () {
		return Session.get('isPlaying');
	}
});

Template.footer.events({
	'click button[data-skipbackward]': function () {
		lastChapter();
	},'click button[data-play]': function () {
		Session.set('isPlaying', ! Session.get('isPlaying'));
	},'click button[data-skipforward]': function () {
		nextChapter();
	}
});