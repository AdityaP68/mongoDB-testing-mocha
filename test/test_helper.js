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

//hook -> executes before running each test
beforeEach((done) => {
  const {users, comments, blogPosts} = mongoose.connection.collections
  users.drop(() => {
    //Ready to run the next test
    //cant drop multiple collection at the same time this we drop sequentially
    comments.drop(()=>{
      blogPosts.drop(()=>{
        done();
      })
    })
  });
});
