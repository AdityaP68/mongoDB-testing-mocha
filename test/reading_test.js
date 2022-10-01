const assert = require("assert");
const User = require("../src/user");

describe("Reading users out of the database", () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: "joe" });
    joe.save().then(() => {
      done();
    });
  });

  it('find all the users with name joe', (done)=>{
    User.find({name: 'joe'}).then((users)=>{
        //cant compare as its ObjectId(_id) not raw string
        assert(users[0]._id.toString() === joe._id.toString())
        done();
    })
  })
it('find a particular user with given id', ()=>{
  User.findOne({_id: joe.id})
  .then((user)=>{
    assert(user.name === 'joe')
    done()
  })
})

})
