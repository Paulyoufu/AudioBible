Posts = new Mongo.Collection('posts');

Posts.attachSchema(new SimpleSchema({
  bookSN: {
    type: Number
  },
  chapterSN: {
    type: Number
  },
  createTime: {
    type: String
  }
}));

SendMsg = function (bookSN, chapterSN) {
    var myDate = new Date();
    Posts.insert({
      bookSN: bookSN,
      chapterSN: chapterSN,
      createTime: 'myDate.toLocaleTimeString()'
    });
}
