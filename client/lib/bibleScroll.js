/**
 * Created by paul on 15/5/27.
 */
Session.setDefault('sectionIndex', null);        //当前播放的section索引
Session.setDefault("sumSection",0);
var scrollPosition=0;

BibleScroll=function(sectionIndex){
	if(sectionIndex == Session.get('sectionIndex')){//scrollPosition=0;
		return;
	}
	Session.set('sectionIndex', sectionIndex);
        if(Session.get("sumSection") < window.screen.height/2)
        {  //  console.log(window.screen.height/2+"===========ttttthellotttllllllllmmmmmmm==========");
            Session.set("sumSection",Session.get("sumSection") + $("#divBible span:eq(" + sectionIndex + ")").outerHeight(true));
           // console.log(Session.get("sumSection")+"++++sum++++");
            $("#divBible span").removeClass("blue");
            $("#divBible span:eq(" + sectionIndex + ")").addClass("blue");
        }
        else{
            //if(sectionIndex>15){scrollPosition=0;
              //  console.log(scrollPosition+"          *********"+Session.get("sumSection")+"ok");}
           scrollPosition +=$("#divBible span:eq(" + sectionIndex + ")").outerHeight();
           // console.log($("#divBible span:eq(" + sectionIndex + ")").outerHeight()+"    hhhhhhhhhhhhhhhhhhhh");
            $("#divBible").scrollTop(scrollPosition) ;
            $("div span").removeClass("blue");
            $("#divBible span:eq(" + sectionIndex + ")").addClass("blue");
           // console.log($("#divBible span:eq(" + sectionIndex + ")").position().top);

        }


}