/**
 * Created by paul on 15/5/27.
 */
BibleScroll=function(SectionIndex){
    var contentHeight=window.screen.height/2;
    var centreBible=$("#divBible span:eq("+SectionIndex+")").position().top-contentHeight;
    $("#divBible").scrollTop(centreBible+150);
    $("#divBible span").removeClass("green");
    $("#divBible span:eq("+SectionIndex+")").addClass("green");
}