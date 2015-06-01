/**
 * Created by paul on 15/5/27.
 */
Session.setDefault('sectionIndex', 0);        //当前播放的section索引

BibleScroll=function(sectionIndex){

	if(sectionIndex == Session.get('sectionIndex')){
		return;
	}
	Session.set('sectionIndex', sectionIndex);
    console.log(sectionIndex+".....................111111111111");
   // var contentHeight=window.screen.height/2;
   // var centreBible=$("#divBible p:eq("+sectionIndex+")").position().top-contentHeight;
   // $("#divBible").scrollTop(centreBible+150);
   // $("#divBible p").removeClass("green");
   // $("#divBible p:eq("+sectionIndex+")").addClass("green");
    var contentHeight=window.screen.height/2;
    var centreBible=$("#divBible span:eq("+sectionIndex+")").offset().top-contentHeight;
    console.log(centreBible+"........1..................");
    $("#divBible").scrollTop(centreBible);
    $("#divBible span").removeClass("green");
    $("#divBible span:eq("+sectionIndex+")").addClass("green");
    if(contentHeight>0)
    {centreBible=$("#divBible span:eq("+sectionIndex+")").offset().top;
        $("#divBible").scrollTop(centreBible+$("#divBible span:eq("+sectionIndex+")").height()-330);
    }
    console.log(centreBible+$("#divBible span:eq("+sectionIndex+")").height()-360+".....................position");

}