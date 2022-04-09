var mongoose = require('mongoose');
var schema = mongoose.Schema;

var bookSchema = new schema({
  title:{type:String, required:true},
  summary:String,
  pages:Number,
  publication:String,
}, {timestamps:true});

var book = mongoose.model('book', bookSchema);
module.exports = book;