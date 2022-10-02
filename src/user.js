const mongoose = require('mongoose');
const Schema = mongoose.Schema;
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
    postCount: Number
});

const User = mongoose.model('user', UserSchema);

module.exports = User;