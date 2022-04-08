let express = require('express');
const { router } = require('../app');
let routes = express.Router();
let book = require('../models/book');
let comment = require('../models/comment');

routes.get('/', (req,res,next) =>  {
  book.find({}, (err,data) => {
    if(err) return next(err);
    res.render('bookdetails', {data:data})
  })
})

routes.get('/new', (req,res,next) => {
  res.render('newbook')
})

routes.post('/new', (req,res,next) => {
  book.create(req.body, (err,data) => {
    if(err) return next(err);
    res.redirect('/book/');
  })
})

routes.get('/:id', (req,res,next) => {
  let id = req.params.id;
  book.findById(id).populate("Comment").exec((err,data) => {
    if(err) return next(err);
    res.render('onebook', {data:data})
  })
})

routes.get('/:id/edit', (req,res,next) => {
  let id = req.params.id;
  book.findById(id, (err,data) => {
    if(err) return next(err);
    res.render('editbook', {data:data});
  })
})

routes.post('/:id/edit', (req,res,next) => {
  let id = req.params.id;
  book.findByIdAndUpdate(id, req.body, (err,data) => {
    if(err) return next(err);
    res.redirect('/book/'+ id);
  })
})

routes.get('/:id/likes', (req,res,next) => {
  let id = req.params.id;
  book.findByIdAndUpdate(id, {$inc : {likes: 1}}, (err,data) => {
    if(err) return next(err);
    res.redirect("/book/" + id);
  })
})

routes.get('/:id/delete', (req,res,next) => {
  let id = req.params.id;
  book.findByIdAndDelete(id, (err,data) => {
    if(err) return next(err);
    comment.deleteMany({bookId: data.id}, (err,info) => {
      if(err) return next(err);
      res.redirect('/book');
    })
  })
})

routes.post("/:id/comment", (req,res,next) => {
  let id = req.params.id;
  req.body.bookId = id;
  comment.create(req.body, (err,data) => {
    if(err) return next(err);
    book.findByIdAndUpdate(id, {$push: {Comment:data._id}}, (err,data) => {
      if(err) return next(err);
      res.redirect('/book/'+ id);
    })
  })
})
module.exports = routes;