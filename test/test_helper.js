const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect("mongodb://localhost/user_test");
  mongoose.connection
    .once("open", () => {
      done();
    })
    .on("error", (error) => {
      console.warn("Warning", error);
    });
});
// console.log(mongoose.connection.collections)
//hook -> executes before running each test
beforeEach((done) => {
  const { users, comments, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    //Ready to run the next test
    //cant drop multiple collection at the same time this we drop sequentially
    if (comments) {
      comments.drop(() => {
        if (blogposts) {
          blogposts.drop(() => {
            console.log('detected')
            done();
          });
        }
      });
    } else {
      done();
    }
  });
});
