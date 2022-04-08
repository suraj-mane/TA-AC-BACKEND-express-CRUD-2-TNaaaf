let mongoose = require('mongoose');
let schema = mongoose.Schema;

let commentSchema = new schema({
  content:{type:String,required:true},
  bookId:{type:schema.Types.ObjectId, ref:"book", required:true},
  likes:{type:Number, default:0}
},{timestamps:true});

let comment = mongoose.model('comment', commentSchema);
module.exports = comment;