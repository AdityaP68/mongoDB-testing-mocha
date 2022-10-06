const mongoose = require("mongoose");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");
const Comment = require("../src/comment");
const assert = require("assert");

before("Associations", () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe = new User({ name: "joe" });
    blogPost = new BlogPost({ title: "JS", content: "Yep its good" });
    comment = new Comment({ content: "Congrats" });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    //has one relationship
    comment.user = joe; //setter

    Promise.all(joe.save(), blogPost.save(), comment.save())
      .then((val) => {
        console.log(val);
        done();
      })
      .catch((e) => console.log(e));
  });

  it.only("save a relation between a user and a blogpost", () => {
    console.log("done");
    // User.findOne({ name: "joe" }).then((user) => {
    //   console.log(user);
    //   done();
    // });
  });
});
//   beforeEach((done) => {
//     joe = new User({ name: "Joe" });
//     blogPost = new BlogPost({
//       title: "JS is great",
//       content: "Yep it is really good",
//     });
//     comment = new Comment({ content: "Congrats" });

//     //even though we push the entire model mongoose will set the type prop to the model instance pushed on its own
//     joe.blogPosts.push(blogPost);
//     blogPost.comments.push(comment);
//     comment.user = joe; //no idea

//     // joe.save()
//     // blogPost.save()
//     // comment.save()

//     Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() =>
//       done()
//     );
//   });

//   it.only("saves a relation b/w a user and a blogpost", (done) => {
//     User.find().then((user) => {
//       console.log(user);
//       done();
//     });
//   });

// });
