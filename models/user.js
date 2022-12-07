const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname: { type: String, required: true, maxLength: 32, minLength:2},
    username: { type: String, required: true, maxLength: 16, minLength:2},
    password: { type: String, required: true, minLength:8},
    member: { type: Boolean, default: false},
    admin: { type: Boolean, default: false},  
});

UserSchema.virtual('url').get( function() {
    return `/users/${this._id}`;
})

module.exports = mongoose.model('User', UserSchema);