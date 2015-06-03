Template.aboutUs.events({
  'click [data-action=share]': function (event, template) {
      // _self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
      // _blank: Opens in the InAppBrowser.
      // _system: 使用设备系统浏览器
      var ref = window.open('http://donate.elijah.cn/biblevoice/share.html', '_system', 'location=yes');
  },

  'click [data-action=donate]': function (event, template) {
	  // _self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
	  // _blank: Opens in the InAppBrowser.
	  // _system: 使用设备系统浏览器
	  var ref = window.open('http://donate.elijah.cn/biblevoice/biblevoice.html', '_system', 'location=yes');
  }

});