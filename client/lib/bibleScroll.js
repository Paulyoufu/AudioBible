/**
 * Created by paul on 15/5/27.
 */
Session.setDefault('sectionIndex', null);        //当前播放的section索引
Session.setDefault("sumSectionHeight",0);
Session.setDefault("scrollPosition",0);

BibleScroll=function(sectionIndex){

	if(sectionIndex == Session.get('sectionIndex')){//scrollPosition=0;
		return;
	}
    console.log(sectionIndex+"____________ index_________")
	Session.set('sectionIndex', sectionIndex);
        if(Session.get("sumSectionHeight") < window.screen.height/2-50)
        {   console.log(window.screen.height/2+"===========8881115667777777788888888888=========");
            Session.set("sumSectionHeight",Session.get("sumSectionHeight") + $("#divBible span:eq(" + sectionIndex + ")").outerHeight(true));
           console.log(Session.get("sumSectionHeight")+"++++sum++++");
            $("#divBible span").removeClass("blue");
            $("#divBible span:eq(" + sectionIndex + ")").addClass("blue");
        }
        else{
           Session.set("scrollPosition", Session.get("scrollPosition")+$("#divBible span:eq(" + sectionIndex + ")").outerHeight());console.log($("#divBible span:eq(" + sectionIndex + ")").outerHeight()+"    hhhhhhhhhhhhhhhhhhhh");
            $("#divBible").scrollTop(Session.get("scrollPosition")) ;
            $("div span").removeClass("blue");
            $("#divBible span:eq(" + sectionIndex + ")").addClass("blue");
            console.log($("#divBible span:eq(" + sectionIndex + ")").position().top);

        }
}
BibleScrollTop=function(){
    $("#divBible").scrollTop($("div span:eq(0)").position().top);
    Session.set("sumSectionHeight",0);
    Session.set("scrollPosition",0);
}
CharpterScrollTop=function(){
    $("#charpterList").scrollTop($("div div:eq(0)").position().top);
}