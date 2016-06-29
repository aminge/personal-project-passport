var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReminderSchema =
  new Schema({
    // "_id": Schema.Types.ObjectId,
    "contactId": String,
    "name": String,
    "date": Date,
    "subject": String,
    "status": Boolean
  },
  {
    collection: 'reminders'
  }
);


module.exports = mongoose.model('Reminder', ReminderSchema);
