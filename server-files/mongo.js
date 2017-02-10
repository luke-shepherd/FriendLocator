/*Initiates a User schema and exports it 
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  password: String,
  friends_list: [String],
  friends_request: [String],
  location: {
     type: String,
     coordinates:{longitude: Number, latitude: Number}
  }
});

var User = mongoose.model('User', userSchema);

module.exports = {
  User: User
}
