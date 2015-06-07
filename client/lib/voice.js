/* 音频操作类 */

abcGlobal = {};//总结点
abcGlobal.media = {};//媒体节点
Session.setDefault('lrcStyle', false);//是否调用LRC字幕,true直播滚动LRC，FALSE不支持
Session.setDefault('timeValue', 0);//播放进度
var myMedia = null;//媒体实例
var url = null;//播放地址
var t;//timeOut对象
var dur;//章节时间


Meteor.startup(function () {
    //允许后台播放
    cordova.plugins.backgroundMode.enable();
  });

//设置url
abcGlobal.media.initAudio = function(){
    url = "application/voice/" + Session.get('currentBook') + "-" + Session.get('currentChapter') + ".mp3";
}

//播放
abcGlobal.media.playAudio = function(){

  //这句释放资源一定要加，若没有这句会使APP卡住
  if (myMedia != null){
      myMedia.release(); 
  }
  myMedia = new Media(url, successCallback, errorCallback, statusCallback);
  myMedia.play();
  // Session.set('isPlaying', true);
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
  myMedia.seekTo(280000);
}

//返回播放进度
// abcGlobal.media.timedCount = function()
// {
//   if(Session.get('lrcStyle')){
//     dur = myMedia.getDuration();
//     myMedia.getCurrentPosition(
//       // success callback
//       function (position) {
//         if(dur!=-1&& position != 0){
//         	if(position >= dur){
//             clearTimeout(t);
//             //基本上不会出现
//           }else{
//             Session.set('dur', dur);
//             Session.set('timeValue', position);
//             Session.set("sumSection",0);
//             Session.set("scrollPosition",0);
//             var sectionSN = getCurrSection(position);
//             BibleScroll(sectionSN);
//           }
//         }
//       }, 
//       function (e) {
//         clearTimeout(t);
//         // console.log("Error Getting Position=" + e);
//       }
//     );
//   }
//   t = setTimeout(abcGlobal.media.timedCount,500);//每 0.5秒调用一次
  
// }

//停止
// abcGlobal.media.clearTimeOut = function(){
//   clearTimeout(t);
// }

//回调的子函数
var successCallback = function()
{
  // 记录本次播放书、章
  SendMsg(Session.get('currentBook'), Session.get('currentChapter'));

  BibleScrollTop();
  nextChapter();
  abcGlobal.media.initAudio();
  abcGlobal.media.playAudio();

  // 记录本次读经位置
  setSetting(Session.get('currentBook'), Session.get('currentChapter'));

}

//回调的子函数
var errorCallback = function(error)
{
  // console.log("Audio Error: " + err);
}

 //回调的子函数
var statusCallback = function(status)
{
  // console.log("Audio Status: " + status);//状态
}