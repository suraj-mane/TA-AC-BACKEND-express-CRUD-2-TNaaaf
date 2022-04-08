let mongoose = require('mongoose');
let schema = mongoose.Schema;

let bookSchema = new schema({
  title:String,
  description:String,
  tags:String,
  author:String,
  likes:{type:Number, default:0},
  Comment:[{type:schema.Types.ObjectId, ref: "comment"}]
},{timestamps:true});

let book = mongoose.model('book', bookSchema);
module.exports = book;