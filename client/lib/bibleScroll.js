/**
 * Created by paul on 15/5/27.
 */
Session.setDefault('sectionIndex', 0);        //当前播放的section索引

BibleScroll=function(sectionIndex){

	if(sectionIndex == Session.get('sectionIndex')){
		return;
	}
	Session.set('sectionIndex', sectionIndex);

    var contentHeight=window.screen.height/2;
    var centreBible=$("#divBible span:eq("+sectionIndex+")").position().top-contentHeight;
    $("#divBible").scrollTop(centreBible+150);
    $("#divBible span").removeClass("green");
    $("#divBible span:eq("+sectionIndex+")").addClass("green");
}