Session.setDefault('booksList', []);            //圣经书卷list
Session.setDefault('lectionList', []);          //经文list
Session.setDefault('currentBook', 1);           //当前书卷SN
Session.setDefault('currentBookName', '创世记'); //当前书卷名字
Session.setDefault('currentChapter', 1);        //当前章SN
Session.setDefault('currentChapterCount', 50);  //当前书卷章数
Session.setDefault('chapterCountIndex', null);  //每卷书章数索引
Session.setDefault('bookNameIndex', null);      //每卷书名字索引
Session.setDefault('selectedBook', null);             //padding的书卷SN
Session.setDefault('selectedChapterCount', null);     //padding的书卷章数
Session.setDefault('selectedBookName', null);         //padding的书卷名字


// 获取指定书卷、章的经文列表
// volumeSN 书卷号 chapterSN 章号
getLection = function (volumeSN, chapterSN) {
  // 打开数据库
  // var db = window.sqlitePlugin.openDatabase({name: "bible.db", createFromLocation: 1});

  db.transaction(function(tx) {
    //单次查询Bible表
    var strSQL = "select ID as id,  Lection as lection, SoundEnd as soundend  from Bible  where  VolumeSN=" + volumeSN + " and ChapterSN=" + chapterSN + " order by ID;";

    tx.executeSql(strSQL, [], 
      function(tx, res) {

        var lectionList =[];

        for(var i=0;i<res.rows.length;i++)
        {
          var lectionItem = {};
          lectionItem.sectionSN = i + 1;
          lectionItem.lection = res.rows.item(i).lection;
          lectionItem.soundEnd = res.rows.item(i).soundend;
          lectionList.push(lectionItem);
          //console.log(res.rows.item(i).lection);
        }
        //将查询结果存入Session
        Session.set('lectionList', lectionList);

      }, function(e) {
        console.log("ERROR: getLection " + e.message);
      });
  });
}

// 获取书卷目录 sn 章数 书名
// newOrOld 0 旧约 1 新约 2全部
getBooksList = function (newOrOld) {

  if (Session.get('booksList') != [] && Session.get('bookNameIndex') != null && Session.get('chapterCountIndex') != null){
    return;
  }
  // 打开数据库
  // var db = window.sqlitePlugin.openDatabase({name: "bible.db", createFromLocation: 1});

  db.transaction(function(tx) {

    var strWhere = " where NewOrOld=" + newOrOld + ";";
    if (newOrOld === 2) {
        strWhere = "";
    }

    //单次查询BibleID表
    var strSQL = "select SN as sn,  ChapterNumber as chapternumber, FullName as fullname from BibleID" + strWhere;

    tx.executeSql(strSQL, [], 
      function(tx, res) {

        var booksList = [];
        var bookNameIndex = {};
        var chapterCountIndex = {};

        //循环显示结果
        for(var i=0;i<res.rows.length;i++)
        {
          var bookItem = {};
          bookItem.bookSN = res.rows.item(i).sn;
          bookItem.chapterCount = res.rows.item(i).chapternumber;
          bookItem.fullName = res.rows.item(i).fullname;
          booksList.push(bookItem);
          // console.log(res.rows.item(i).fullname);

          //初始化书名索引、章数索引
          bookNameIndex['bookSN' + res.rows.item(i).sn.toString()] = res.rows.item(i).fullname;
          chapterCountIndex['bookSN' + res.rows.item(i).sn.toString()] = res.rows.item(i).chapternumber;
        }
        //将查询结果存入Session
        Session.set('booksList', booksList);
        Session.set('bookNameIndex', bookNameIndex);
        Session.set('chapterCountIndex', chapterCountIndex);

      }, function(e) {
        console.log("ERROR: getBooksList " + e.message);
      });
  });
}

//下一章
nextChapter = function () {
    var currentBook = Session.get('currentBook');
    var currentChapter = Session.get('currentChapter');
    var currentChapterCount = Session.get('currentChapterCount');

    //判断本卷书是否完成
    if (currentChapter < currentChapterCount){
      //未完成，切换下一章
      currentChapter += 1;
      Session.set('currentChapter', currentChapter);
    }
    else{
      //完成，切换下一卷书
      if (currentBook === 66){
        currentBook = 1;
      }
      else{
        currentBook += 1;
      }
      currentChapter = 1;

      Session.set('currentBook', currentBook);
      Session.set('currentChapter', currentChapter);
      Session.set('currentBookName', Session.get('bookNameIndex')['bookSN'+currentBook]);
      Session.set('currentChapterCount', Session.get('chapterCountIndex')['bookSN'+currentBook]);
    }
}

//上一章
lastChapter = function () {
    var currentBook = Session.get('currentBook');
    var currentChapter = Session.get('currentChapter');
    var currentChapterCount = Session.get('currentChapterCount');

    //判断是否是本卷书第一章
    if (currentChapter === 1){
      //是第一章，切换上一卷书
      if (currentBook === 1){
        currentBook = 66;
      }
      else{
        currentBook -= 1;
      }
      currentChapter = Session.get('chapterCountIndex')['bookSN'+currentBook];

      Session.set('currentBook', currentBook);
      Session.set('currentChapter', currentChapter);
      Session.set('currentBookName', Session.get('bookNameIndex')['bookSN'+currentBook]);
      Session.set('currentChapterCount', Session.get('chapterCountIndex')['bookSN'+currentBook]);
    }
    else{
      //不是第一章，切换上一章
      currentChapter -= 1;
      Session.set('currentChapter', currentChapter);
    }
}

//获取当前播放的节
getCurrSection = function (position) {
    var currentLection = Session.get('lectionList');
    var sectionSN = 0;

    for (var i = 0; i < currentLection.length; i++) {

        if (position < currentLection[i].soundEnd || currentLection[i].soundEnd === 0){
            break;
        }
        sectionSN++;
    };

    return sectionSN;
}

// 获取设置项
getSetting = function () {
    // 打开数据库
  // var db = window.sqlitePlugin.openDatabase({name: "bible.db", createFromLocation: 1});

  db.transaction(function(tx) {
    //单次查询Bible表
    var strSQL = "select ID as id, lastBook as lastbook, lastChapter as lastchapter from Setting where ID='1';";

    tx.executeSql(strSQL, [], 
      function(tx, res) {
        var setting = {};
        for(var i=0;i<res.rows.length;i++)
        {
          setting.lastbook = res.rows.item(i).lastbook;
          setting.lastchapter = res.rows.item(i).lastchapter;
          //console.log("读取到了：" + res.rows.item(i).lastbook.toString() + "-" + res.rows.item(i).lastchapter.toString());
        }

        Session.set('currentBook', setting.lastbook);
        Session.set('currentChapter', setting.lastchapter);
        Session.set('currentBookName', Session.get('bookNameIndex')['bookSN'+setting.lastbook]);
        Session.set('currentChapterCount', Session.get('chapterCountIndex')['bookSN'+setting.lastbook]);

        //初始化audio
        abcGlobal.media.initAudio();

      }, function(e) {
        console.log("ERROR: getSetting " + e.message);
      });
  });
}

// 设置设置项
setSetting = function (lastBook, lastChapter) {

    // 打开数据库
    // var db = window.sqlitePlugin.openDatabase({name: "bible.db", createFromLocation: 1});
    // var db = Session.get('db');

    db.transaction(function(tx) {
      //更新Setting表
      var strSQL = "update Setting set lastBook='" + lastBook + "', lastChapter='" + lastChapter + "' where ID='1';";

      tx.executeSql(strSQL, [], 
        function(tx, res) {
             //console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
        }, function(e) {
          console.log("ERROR: setSetting " + e.message);
        });
    });
}

Meteor.startup(function () {

    db = window.sqlitePlugin.openDatabase({name: "bible.db", createFromLocation: 1});

    //将整本书卷名从数据库查询到，存到Session:booksList
    getBooksList(2);

    //获取设置项，更新Session
    getSetting();
    //console.log('afterGetSetting:' + Session.get('currentBook') + '-' + Session.get('currentChapter'));

});