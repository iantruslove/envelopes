var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/envelopes');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var _ = require('underscore')._;

function uniqueFieldInsensitive ( modelName, field ){
	return function(val, cb){
		if( val && val.length ){ // if string not empty/null
			
			var query = mongoose.models[modelName]
				.where( field, new RegExp('^'+val+'$', 'i') ); // lookup the collection for somthing that looks like this field 
			
			if( !this.isNew ){ // if update, make sure we are not colliding with itself
				query = query.where('_id').ne(this._id);
			}
			
			query.count(function(err,n){
				// false when validation fails
				cb( n < 1 );
			});
		} else { // raise error of unique if empty // may be confusing, but is rightful
			cb( false );
		}
	};
}

var UserSchema = new Schema({
  fname: String,
  lname: String,
  email: String
});

UserSchema.path('email').validate( 
    uniqueFieldInsensitive('User', 'email' ), 'User email must be unique' );

var User = mongoose.model('User', UserSchema);

exports.index = function(req, res){
  User.find(function(err, docs) {
    var userIds = _.map(docs, function(user){ return user.id; });
    res.send(userIds);
  });
};

exports.create = function(req, res){
  var user = new User(),
      id = user._id;

  user.fname = req.body.fname || '';
  user.lname = req.body.lname || '';
  user.email = req.body.email || '';

  user.save(function(err){
    if (err) {
      if (err.name && err.name === "ValidationError") {
        res.send('error creating user - ' + err + '\n', 403);
      } else {
        res.send('error creating user\n', 500);
      }
    } else {
      res.header('Location', req.originalUrl + '/' + id);
      res.send("User " + id + " created\n", 201);
    }
  });
};

exports.show = function(req, res){
  var user = {};
  User.findById(req.params.user, function(err, doc) {
    user = doc;
    res.send(user);
  });
};
//
//exports.update = function(req, res){
//  res.send('update forum ' + req.params.hello);
//};
//
//exports.destroy = function(req, res){
//  Comment.findById(req.params.comment, function(err, doc) {
//    if (err) {
//      res.send('Error finding comment to delete\n', 500);
//    } else {
//      if (doc) {
//        doc.remove();
//        res.send('deleted');
//      } else {
//        res.send('No such comment', 404);
//      }
//    }
//  });
//};

