let express = require('express');
const { router } = require('../app');
let routes = express.Router();
let book = require('../models/book');
let comment = require('../models/comment');

routes.get('/:id/edit', (req,res,next) => {
  var id = req.params.id;
  comment.findById(id, (err,comment) => {
    if(err) return next(err);
    res.render('editcomment', {comment:comment});
  })
})

routes.post('/:id/edit', (req,res,next) => {
  var id = req.params.id;
  comment.findByIdAndUpdate(id, req.body, (err,comment) => {
    if(err) return next(err);
    res.redirect('/book/'+ comment.bookId);
  })
})

routes.get('/:id/likes', (req,res,next) => {
  let id = req.params.id;
  comment.findByIdAndUpdate(id, {$inc : {likes: 1}}, (err,data) => {
    if(err) return next(err);
    res.redirect("/book/" + data.bookId);
  })
})

routes.get('/:id/delete', (req,res,next) => {
  var id = req.params.id;
  comment.findByIdAndDelete(id, (err, data) => {
    if(err) return next(err);
    book.findByIdAndUpdate(data.bookId, {$pull: {Comment:data._id}}, (err,data) => {
      if(err) return next(err);
      res.redirect('/book/'+ data.bookId);
    })
  })
})

module.exports = routes;