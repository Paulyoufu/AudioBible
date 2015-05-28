Template.main.rendered = function()
{
	renderedAudio();
    // var centreBible=$("#divBible span:eq(19)").position();
    // $("#divBible").scrollTop(centreBible.top-window.screen.height/2+100);
    // $("#divBible span").removeClass("green");
    // $("#divBible span:eq(19)").addClass("green");
};

Template.main.helpers({
	lectionList: function () {
		var currentBook = Session.get('currentBook');
		var currentChapter = Session.get('currentChapter');
		getLection(currentBook, currentChapter);
		return Session.get('lectionList');
	},
	bookName: function () {
		return Session.get('currentBookName'); 
	},
	chapterSN: function () {
		return Session.get('currentChapter');
	},
	position: function(){
		return Session.get('timeValue');
	},
	section: function(){
		var position = Session.get('timeValue');
		var sectionSN = getCurrSection(position);
		// BibleScroll(sectionSN);
		return sectionSN;         
	}
});

