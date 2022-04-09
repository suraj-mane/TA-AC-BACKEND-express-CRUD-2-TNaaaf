var mongoose = require('mongoose');
var schema = mongoose.Schema;

var authorSchema = new schema({
  name:{type:String, required:true},
  email:String,
  countery:String,
  book:{type:schema.Types.ObjectId, ref:"book"}
}, {timestamps:true});

var author = mongoose.model('author', authorSchema);
module.exports = author;