const assert = require('assert');
const User = require('../src/user');

describe('Creating records', ()=>{
    it('saves a user', (done)=>{
        //insertion
        const joe = new User({name: 'Joe'}); //instance
        joe.save()
            .then(()=>{
                //Has joe been saved sucessfully
                assert(!joe.isNew);
                done();
            });
        
    });
});