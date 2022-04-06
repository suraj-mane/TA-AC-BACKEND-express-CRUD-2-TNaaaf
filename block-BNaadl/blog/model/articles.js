var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articlesSchema = new Schema({
  title:String,
  description:String,
  tags:String,
  author:String,
  likes:Number
}, {timestamps: true});

var articles = mongoose.model('article', articlesSchema);
module.exports = articles;