Template.chaptersMenu.helpers({
	chapters: function () {
		var currentChapterCount = Session.get('currentChapterCount');
		var chapters = [];

		for (var i = 0; i < currentChapterCount; i++) {
			var chapterItem = {};
			chapterItem.chapterSN = i + 1;
			chapters.push(chapterItem);
		};

		return chapters;
	}
});