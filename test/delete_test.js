const assert = require("assert");
const User = require("../src/user");

describe("Deleting a user from the database", () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: "joe" });
    joe.save().then(() => done());
  });

  it("model instance remove", (done) => {
    joe
      .remove()
      .then(() => User.findOne({ name: "joe" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it("class method remove", (done) => {
    //remove a bunch of records with a given criteria
    User.deleteMany({ name: "joe" })
      .then(() => User.findOne({ name: "joe" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it("class method findAndRemove", (done) => {
    User.findOneAndRemove({ name: "joe" })
      .then(() => User.findOne({ name: "joe" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it("class method findByIdAndRemove", (done) => {
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({ name: "joe" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
});
