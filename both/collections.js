Posts = new Mongo.Collection('posts');
IP = new Mongo.Collection('ip');

// Posts.attachSchema(new SimpleSchema({
//   bookSN: {
//     type: Number
//   },
//   chapterSN: {
//     type: Number
//   },
//   createTime: {
//     type: String
//   }
// }));

SendMsg = function (bookSN, chapterSN) {
    var myDate = new Date();
    Posts.insert({
      bookSN: bookSN,
      chapterSN: chapterSN,
      createTime: myDate.toLocaleString()
    });
}

SendIP = function (ip) {
    var myDate = new Date();
    IP.insert({
        ip: ip,
        createTime: myDate.toLocaleString()
    });
}