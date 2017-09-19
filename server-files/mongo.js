/*Initiates a User schema and exports it 
*/

var mongoose = require('mongoose');
//var GeoJson = require('mongoose-geojson-schema');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  firstName: String,
  lastName: String,
  password: String,
  token: String,
  friends_viewable: [String],
  friends_list: [String],
  friends_request: [String],
  friends_notifications: [String],
  friends_pending: [String],
  location_requests: [String],
  locations_pending: [String],
  longitude:{ 
      type: Number,
      default: 0
  },
  latitude: {
      type: Number,
      default: 0
  },
  broadcast: {
    type: Boolean,
    default: true
  }
});

var User = mongoose.model('User', userSchema);

module.exports = {
  User: User
}
