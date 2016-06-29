// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');
var ContactSchema = require('./contact').schema;
// var ReminderSchema = require('./reminders').schema;

// define the schema for our user model
var userSchema = mongoose.Schema({
    google_id: String,
    token: String,
    email: String,
    name: String,
    contactInfo: [ContactSchema]
});

module.exports = mongoose.model('User', userSchema);
