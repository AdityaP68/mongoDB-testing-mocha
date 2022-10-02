const { doesNotMatch } = require("assert");
const assert = require("assert");
const User = require("../src/user");

describe("Mongoose field validation test", () => {
  it("requires a username", () => {
    const user = new User({ name: undefined });
    //validate() requires a callback to return value as its asynchronous 
    //validateSync() is synchronous process and returns value
    const validationResult = user.validateSync();
    // console.log(validationResult.errors.name.message); --> still works
    const {message} = validationResult.errors.name
    assert(message === 'Name is required.')
    
  });

  it('username longer than 2 characters', ()=>{
    const user = new User({name: 'Al'})
    const res = user.validateSync()
    const {message} = res.errors.name
    assert(message === 'Name must be longer than 2')
  })

  it('disallows invalid records to be saved', (done)=>{
    const user = new User({name: 'Al'})
    user.save().catch((err)=>{
        const { message} = err.errors.name
        assert(message === 'Name must be longer than 2')
        done()
    })
  })
});
