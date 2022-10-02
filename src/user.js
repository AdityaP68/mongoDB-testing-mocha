const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post')
//a user has many posts

const UserSchema = new Schema({
    name: {
        type: String,
        //method to check if the value provided for the field has more than 2 characters
        validate:{
            validator: name=>name.length>2,
            message: 'Name must be longer than 2'
        },
        required: [true, 'Name is required.'],
    },
    posts: [PostSchema]
});

//virtual property of the user model
// arrow function cant be used as it doesnt has this binding
//getter property defined - ES6
UserSchema.virtual('postCount').get(function(){
    return this.posts.length
})

const User = mongoose.model('user', UserSchema);

module.exports = User;