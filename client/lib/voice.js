abcGlobal = {};//全局
abcGlobal.Media = {};//语音功能

Session.setDefault('timeValue', "time");
//media对象实例
var _myMedia;

Meteor.startup(function () {
    //允许后台播放
    cordova.plugins.backgroundMode.enable();
});

renderedAudio = function(){
  //不加这段播放不了
   var url = "application/voice/创世记第1章.mp3";
   _myMedia = new Media(url, successCallback, errorCallback, statusCallback);
}

//初始化
abcGlobal.Media.init_audio = function(){
  renderedAudio();
   //这句释放资源一定要加，若没有这句会使APP卡住
   _myMedia.release();

   //模拟播放下一首
   url = "application/voice/"+Session.get('currentBookName')+"第"+Session.get('currentChapter')+"章.mp3";
   _myMedia = new Media(url, successCallback, errorCallback, statusCallback);
}

//上一章
abcGlobal.Media.on_audio = function(){
  //这句释放资源一定要加，若没有这句会使APP卡住
   _myMedia.release();
   var url = "application/voice/" + Session.get('currentBookName') + "第" + Session.get('currentChapter') + "章.mp3";
   _myMedia = new Media(url, successCallback, errorCallback, statusCallback);
   _myMedia.play();
   Session.set('isPlaying', true);
}

//下一章
abcGlobal.Media.Under_audio = function(){
  //这句释放资源一定要加，若没有这句会使APP卡住
    _myMedia.release();
    var url = "application/voice/" + Session.get('currentBookName') + "第" + Session.get('currentChapter') + "章.mp3";
    _myMedia = new Media(url, successCallback, errorCallback, statusCallback);
    _myMedia.play();
    Session.set('isPlaying', true);
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
  _myMedia.seekTo(330000);
}

//每0.5秒 返回当前播放进度 
abcGlobal.Media.get_position = function(){
   //获取播放时间
   timedCount();
}

var t;
function timedCount()
{
    var dur = _myMedia.getDuration();

   _myMedia.getCurrentPosition(

     // success callback
     function (position) {
        if(position != Session.get('timeValue')){
          Session.set('timeValue', position);
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
      console.log("Audio Status: " + status);//状态
  }