abcGlobal = {};//全局
abcGlobal.Media = {};//语音功能

Session.setDefault('timeValue', "time");
//media对象实例
var _myMedia;

Meteor.startup(function () {
    //允许后台播放
    cordova.plugins.backgroundMode.enable();
});

abcGlobal.Media.init_audio = function(){
  //不加这段播放不了
   var url = "application/voice/创世记第1章.mp3";
   _myMedia = new Media(url, successCallback, errorCallback, statusCallback);

   //这句释放资源一定要加，若没有这句会使APP卡住
   _myMedia.release();

   //模拟播放下一首
   var url = "application/voice/"+Session.get('currentBookName')+"第"+Session.get('currentChapter')+"章.mp3";
   alert(url);
   _myMedia = new Media(url, successCallback, errorCallback, statusCallback);
}

//上一章
abcGlobal.Media.on_audio = function(){
  //这句释放资源一定要加，若没有这句会使APP卡住
   _myMedia.release();
   var chapterNo = Session.get('currentChapter') - 1;
   //判断是否已经是第一章
   if(chapterNo > 0){
      var url = "application/voice/" + Session.get('currentBookName') + "第" + chapterNo + "章.mp3";
      _myMedia = new Media(url, successCallback, errorCallback, statusCallback);
      _myMedia.play();
      Session.set('currentChapter', chapterNo);
   }else{
      //跳转到上一卷书
      alert("功能暂未实现！");
   }
}

//下一章
abcGlobal.Media.Under_audio = function(){
  //这句释放资源一定要加，若没有这句会使APP卡住
  _myMedia.release();
  var chapterNo = Session.get('currentChapter') + 1;
  var varChapterCount = Session.get('currentChapterCount');//当前书卷总章节数
  //判断本卷书共有多少章，如果还有剩余章节，章节数＋1
  if(chapterNo <= varChapterCount){
    var url = "application/voice/" + Session.get('currentBookName') + "第" + chapterNo + "章.mp3";
    _myMedia = new Media(url, successCallback, errorCallback, statusCallback);
    _myMedia.play();
    Session.set('currentChapter', chapterNo);
  }else{
    //跳转到下一卷书
    alert("功能暂为实现！");
  }
}

//播放
abcGlobal.Media.play_audio = function(){
  
  _myMedia.play();
}

//暂停
abcGlobal.Media.pause_audio = function(){
   _myMedia.pause();
}

//停止播放
abcGlobal.Media.stop_audio = function(){
   _myMedia.seekTo(0);
   _myMedia.pause();
}

//快进
abcGlobal.Media.fast_dorward = function(){
  //快进到330秒处
  // 获取当前进度 ＋ 20 秒
  _myMedia.seekTo(330000);
}

//每0.5秒 返回当前播放进度 
abcGlobal.Media.get_position = function(){
   //获取播放时间
   timedCount();
   // a();
 }
 function a(){
    alert("hahahaha");
    setTimeout(a, 1000);
 }

var t;
function timedCount()
{
    var dur = _myMedia.getDuration();

   _myMedia.getCurrentPosition(

     // success callback
     function (position) {
        var value = position + " / " + dur;//当前进度／总进度
        if(value != Session.get('timeValue')){
          Session.set('timeValue', value);
        }else{
          clearTimeout(t);
        }
     }
   );

   t = setTimeout(timedCount,500);//每 0.5秒调用一次
}



//回调的子函数
  var successCallback = function()
  {
      abcGlobal.Media.Under_audio();//下一章
  }

  //回调的子函数
  var errorCallback = function(error)
  {
      console.log("Audio Error: " + err);
  }

  //回调的子函数
  var statusCallback = function(status)
  {
      // Media.MEDIA_NONE = 0;
      // Media.MEDIA_STARTING = 1;
      // Media.MEDIA_RUNNING = 2;
      // Media.MEDIA_PAUSED = 3;
      // Media.MEDIA_STOPPED = 4;

      console.log("Audio Status: " + status);
  }