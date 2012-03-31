var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/envelopes');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var _ = require('underscore')._;

var EnvelopeSchema = new Schema({
    name: String,
    ownerId: String,
    authorizedUserIds: [String]
});

var Envelope = mongoose.model('Envelope', EnvelopeSchema);

exports.index = function(req, res){
  Envelope.find(function(err, docs) {
    var envelopeIds = _.map(docs, function(envelope){ return envelope.id; });
    res.send(envelopeIds);
  });
};

exports.create = function(req, res){
  var envelope = new Envelope();
  envelope.title = req.body.title || '';
  envelope.body = req.body.body || '';

  var id = envelope._id;

  envelope.save(function(err){
    if (err) {
      res.send('error creating envelope\n', 500);
    } else {
      res.header('Location', req.originalUrl + '/' + envelope._id);
      res.send("envelope " + id + " created\n", 201);
    }
  });
};

exports.show = function(req, res){
  var c = {};
  Envelope.findById(req.params.envelope, function(err, doc) {
    c = doc;
    res.send(c);
  });
};

exports.update = function(req, res){
  res.send('update forum ' + req.params.hello);
};

exports.destroy = function(req, res){
  Envelope.findById(req.params.envelope, function(err, doc) {
    if (err) {
      res.send('Error finding envelope to delete\n', 500);
    } else {
      if (doc) {
        doc.remove();
        res.send('deleted');
      } else {
        res.send('No such envelope', 404);
      }
    }
  });
};

