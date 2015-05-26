Session.setDefault('booksList', []);            //圣经书卷list
Session.setDefault('lectionList', []);          //经文list
Session.setDefault('currentBook', 1);           //当前书卷SN
Session.setDefault('currentBookName', '创世记'); //当前书卷名字
Session.setDefault('currentChapter', 1);        //当前章SN
Session.setDefault('currentChapterCount', 0);   //当前书卷章数

// volumeSN 书卷号 chapterSN 章号
getLection = function (volumeSN, chapterSN) {
  // 打开数据库
  var db = window.sqlitePlugin.openDatabase({name: "bible.db", createFromLocation: 1});

  db.transaction(function(tx) {
    //单次查询Bible表
    var strSQL = "select ID as id,  Lection as lection  from Bible  where  VolumeSN=" + volumeSN + " and ChapterSN=" + chapterSN + " order by ID;";

    tx.executeSql(strSQL, [], 
      function(tx, res) {

        var lectionList =[];

        for(var i=0;i<res.rows.length;i++)
        {
          var lectionItem = {};
          lectionItem.chapterSN = i + 1;
          lectionItem.lection = res.rows.item(i).lection;
          lectionList.push(lectionItem);
          //console.log(res.rows.item(i).lection);
        }
        //将查询结果存入Session
        Session.set('lectionList', lectionList);

      }, function(e) {
        console.log("ERROR: " + e.message);
      });
  });
}

// 获取书卷目录 sn 章数 书名
// newOrOld 0 旧约 1 新约 2全部
getBooksList = function (newOrOld) {
  // 打开数据库
  var db = window.sqlitePlugin.openDatabase({name: "bible.db", createFromLocation: 1});

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

        //循环显示结果
        for(var i=0;i<res.rows.length;i++)
        {
          var bookItem = {};
          bookItem.bookSN = res.rows.item(i).sn;
          bookItem.chapterCount = res.rows.item(i).chapternumber;
          bookItem.fullName = res.rows.item(i).fullname;
          booksList.push(bookItem);
          // console.log(res.rows.item(i).fullname);
        }
        //将查询结果存入Session
        Session.set('booksList', booksList);

      }, function(e) {
        console.log("ERROR: " + e.message);
      });
  });
}
