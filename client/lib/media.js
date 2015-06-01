/* 音频操作类 */

abcGlobal = {};//总结点
abcGlobal.media = {};//媒体节点

Session.setDefault('timeValue', 0);//播放进度
var myMedia;//媒体实例
var url;//播放地址
var t;//timeOut对象


 //播放
 abcGlobal.media.playAudio = function(){
  if(myMedia === undefined){
   
  }else{
    //这句释放资源一定要加，若没有这句会使APP卡住
    myMedia.release();  
  }
  
    url = "application/voice/" + Session.get('currentBookName') + "第" + Session.get('currentChapter') + "章.mp3";
    myMedia = new Media(url, successCallback, errorCallback, statusCallback);
    myMedia.play();
   	timedCount();//每0.5秒返回播放进度
    Session.set('isPlaying', true);
}


 //暂停
 abcGlobal.media.pauseAudio = function(){
    myMedia.pause();
 }

 //停止播放
 abcGlobal.media.stopAudio = function(){
   myMedia.seekTo(0);
   myMedia.pause();
 }

 //快进
 abcGlobal.media.fastDorward = function(){
  //快进到330秒处
   myMedia.seekTo(330000);
 }

 //返回播放进度
 function timedCount()
 {
   var dur = myMedia.getDuration(); //获取总时间

   myMedia.getCurrentPosition(
     // success callback
     function (position) {
        if(position != dur){
          Session.set('timeValue', position);
          var sectionSN = getCurrSection(position);
          BibleScroll(sectionSN);
        }else{
          clearTimeout(t);//停止timeOut
        }
     }
   );
   t = setTimeout(timedCount,500);//每 0.5秒调用一次
 }

 //回调的子函数
  var successCallback = function()
  {
      nextChapter();
      abcGlobal.media.playAudio();//下一章
  }

  //回调的子函数
  var errorCallback = function(error)
  {
      console.log("Audio Error: " + err);
  }

  //回调的子函数
  var statusCallback = function(status)
  {
      console.log("Audio Status: " + status);//状态
  }