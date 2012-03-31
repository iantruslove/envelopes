var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/envelopes');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var _ = require('underscore')._;

var Comments = new Schema({
     title     : String,
     body      : String,
     date      : Date
});

var Comment = mongoose.model('Comment', Comments);

exports.index = function(req, res){
  Comment.find(function(err, docs) {
    var commentIds = _.map(docs, function(comment){ return comment.id; });
    res.send(commentIds);
  });
};

// GET create?!
//exports.new = function(req, res){
//  res.send('new forum');
//};

exports.create = function(req, res){
  var comment = new Comment();
  comment.title = req.body.title || '';
  comment.body = req.body.body || '';

  var id = comment._id;

  comment.save(function(err){
    if (err) {
      res.send('error creating comment\n', 500);
    } else {
      res.header('Location', req.originalUrl + '/' + comment._id);
      res.send("comment " + id + " created\n", 201);
    }
  });

};

exports.show = function(req, res){
  var c = {};
  Comment.findById(req.params.comment, function(err, doc) {
    c = doc;
    res.send(c);
  });
};

// This is for a GET-tunnelled edit - don't need it?
//exports.edit = function(req, res){
//  res.send('edit forum ' + req.params.hello);
//};

exports.update = function(req, res){
  res.send('update forum ' + req.params.hello);
};

exports.destroy = function(req, res){
  Comment.findById(req.params.comment, function(err, doc) {
    if (err) {
      res.send('Error finding comment to delete\n', 500);
    } else {
      if (doc) {
        doc.remove();
        res.send('deleted');
      } else {
        res.send('No such comment', 404);
      }
    }
  });
};

