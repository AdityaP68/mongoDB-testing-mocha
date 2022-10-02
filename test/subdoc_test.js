const assert = require("assert");
const User = require("../src/user");

describe("Subdocuments", () => {
  it("can create a subdocument", (done) => {
    const joe = new User({
      name: "joe",
      posts: [{ title: "PostTitle" }],
    });

    joe.save().then(() => {
      User.findOne({ name: "joe" }).then((res) => {
        // console.log( res.posts)
        assert(res.posts[0].title === "PostTitle");
        done();
      });
    });
  });

  it("adding subdocs in existing records", (done) => {
    const joe = new User({
      name: "Joe",
      posts: [],
    });
    //promise doesnt get retrun if u add {} in the arrow fn hence the undefined value
    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        user.posts.push({ title: "New Post" });
        //need to save entire record as changes have just locally be done
        return user.save();
      })
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user.posts[0].title === "New Post");
        done();
      });
  });

  it("can remove existing sub document", (done) => {
    const joe = new User({
      name: "joe",
      posts: [{ title: "New Title" }],
    });

    joe
      .save()
      .then(() => User.findOne({ name: "joe" }))
      .then((user) => {
        const post = user.posts[0];
        post.remove(); //.remove() provided by mongoose as it runs for posts array
        return user.save();
      })
      .then(() => User.findOne({ name: "joe" }))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
