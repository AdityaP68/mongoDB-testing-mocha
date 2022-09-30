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
  mongoose.connection.collections.users.drop(() => {
    //Ready to run the next test
    done();
  });
});
