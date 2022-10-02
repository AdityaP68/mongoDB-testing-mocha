const assert = require("assert");
const User = require("../src/user");

//Set and save not working, instance update method not working
//chaining or nesting find and update promise not working

describe("Updating a user in the db", () => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name: "joe" });
    joe.save().then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === "alex");
        done();
      });
  }

  //   it("instance type using set n save", (done) => {
  //     console.log(joe);
  //     // joe.set("name", "alex");
  //     // joe
  //     //   .save()
  //     //   .then(() => {
  //     //     User.find({});
  //     //   })
  //     //   .then((users) => {
  //     //     assert(users.length === 1);
  //     //     assert(users[0].name === "alex");
  //     //     done();
  //     //   });
  //   });
  function assertCheck(op, done) {
    User.find({}).then((users) => {
      console.log("test", users);
      assert(users.length === 1);
      assert(users[0].name === "joe");
      done();
    });
  }

  it("model instance can update", (done) => {
    User.find({}).then((users) => {
      // console.log("before", users);
    });
    User.updateMany({ name: "joe" }, { name: "alex" }).then((res) => {
      // console.log(res);
    });
    User.find({}).then((users) => {
      // console.log("after", users);
      assert(users.length === 1);
      assert(users[0].name === "alex");
      done();
    });
  });
  it("Update user by id", (done) => {
    //returns the user object in the promise
    User.findByIdAndUpdate(joe._id, { name: "alex" }).then((res) =>
      console.log("lol", res)
    );
    //------undefined returned-------
    // .then(() => {
    //   User.find({});
    // })
    // .then((result) => {
    //   console.log(result);
    //   done();
    // });
    User.find({}).then((users) => {
      assert(users.length === 1);
      
      done();
    });
    //when calling the fn it is reset
    // assertCheck( done)
  });

  // it("async version of update by id", async (done) => {
  //     await User.findByIdAndUpdate(joe._id, { name: 'sam' }); //working
  //     const users = await User.find({}); //working
  //     // assert(users.length === 1)
  //     // assert(users[0].name === 'sam')
  //     console.log(users)
  //     // here specifing a callback as well as returning/ resolving a promise as async and await is used which isnt valid
  //     done()
  // });

  it("Updating using the update operator", (done) => {
    User.updateMany(
      { name: "joe" },
      
    ).then(() => {
      done();
    });
    // .then(
    //   async(user) => {
    //     const test = await User.find({})
    //     console.log(test)
    //     return test
    //   }
    // ).then(res =>{
    //   console.log(res)
    //   assert(res.length === 1)

    //   done()
    // })
  });
});
