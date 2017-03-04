/*Initiates a User schema and exports it 
*/

var mongoose = require('mongoose');
//var GeoJson = require('mongoose-geojson-schema');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  password: String,
  token: String,
  friends_list: [String],
  friends_request: [String],
  friends_notifications: [String],
  friends_pending: [String],
  location: {
   type: {
     type: String,
     default: 'Point'
   },
   coordinates: [Number]
  }
});

var User = mongoose.model('User', userSchema);

module.exports = {
  User: User
}
