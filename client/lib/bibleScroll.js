/**
 * Created by paul on 15/5/27.
 */
Session.setDefault('sectionIndex', null);        //当前播放的section索引

BibleScroll=function(sectionIndex){


	if(sectionIndex == Session.get('sectionIndex')){
		return;
	}
	Session.set('sectionIndex', sectionIndex);

    console.log(sectionIndex+"----------------- sectionIndex____________________ ");
    if(sectionIndex > $('#divBible').children('span').length - 2)
    {
       $("#divBible span").removeClass("green");
        $("#divBible span").last().addClass("green");
    }
    else {
        $("#divBible span").removeClass("green");
        $("#divBible span:eq(" + sectionIndex + ")").addClass("green");
        var contentHeight = window.screen.height / 2;
        var centreBible = $("#divBible span:eq(" + sectionIndex + ")").offset().top - contentHeight;
        $("#divBible").scrollTop(centreBible);
        if (contentHeight > 0) {
            centreBible = $("#divBible span:eq(" + sectionIndex + ")").offset().top;
            $("#divBible").scrollTop(centreBible - 360);
            console.log(centreBible -  360+"----------------centre1111111----------------");
        }
        console.log(centreBible -  360+"----------------centre2222222222----------------");
    }
}