Template.footer.events({
	// //初始化音频
	// 'click .init_audio':function(){
	// 	abcGlobal.Media.init_audio();
	// },
	//播放
	'click .ion-ios-skipbackward':function(){//上一章
		abcGlobal.Media.on_audio();
	},
	'click .ion-ios-play':function(){
		abcGlobal.Media.play_audio();
	},
	'click .ion-ios-skipforward':function(){//下一章
		abcGlobal.Media.Under_audio();
	}
	

	// //暂停
	// 'click .pause_audio':function(){
	// 	abcGlobal.Media.pause_audio();
	// },
   
	// //停止
	// //注意，这里没有使用stop()是为了和播放完成后自动停止的事件相区分
	// 'click .stop_audio':function(){
	// 	abcGlobal.Media.stop_audio();
	// },

	// //获得播放进度和总时长
	// 'click .get_position':function(){
	// 	abcGlobal.Media.get_position();
	// },

	// //快进按钮
	// //此处是为了测试播放结束后连续播放下一首
	// 'click .fast_dorward':function(){
	// 	abcGlobal.Media.fast_dorward();
	// }
});