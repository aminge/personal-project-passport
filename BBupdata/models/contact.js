var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var ReminderSchema = require('./reminders').schema;

var ContactSchema =
  new Schema({
    "_id": Schema.Types.ObjectId,
    "dateadded": Date,
    "name": String,
    "standout": Boolean,
    "convoinit": Boolean,
    "invite": Boolean,
    "challenger": Boolean,
    "nevercontact": Boolean,
    "occupation": String,
    "family": String,
    "goals": String,
    "struggles": String,
    "notes": String
    // reminders: [ReminderSchema]
  },
  {
    collection: 'contacts'
  }
);


module.exports = mongoose.model('Contact', ContactSchema);
