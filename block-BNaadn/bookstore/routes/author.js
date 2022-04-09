var express = require('express');
const { get } = require('.');
const { rawListeners } = require('../app');
var router = express.Router();
var author = require('../models/author');
var book = require('../models/book');

/* GET home page. */
router.get('/', function(req, res, next) {
  author.find({}, (err,data) => {
    if(err) return next(err);
    res.render('author', {data:data});
  })
});

/* GET new author */
router.get('/new',(req,res,next) => {
  res.render('new');
})

/* POST add author*/
router.post('/new', (req,res,next) => {
  author.create(req.body, (err,data) => {
    if(err) return next(err);
    res.redirect('/author');
  })
})

/* one Athor*/
router.get('/:id', (req,res,next) => {
  var id = req.params.id;
  author.findById(id).populate("book").exec((err,data) => {
    if(err) return next(err);
    res.render('oneAuthor', {data:data});
  })
})

/* Add book */
router.post('/:id/book', (req,res,next) => {
  var id = req.params.id;
  book.create(req.body, (err,data) => {
    if(err) return next(err);
    author.findByIdAndUpdate(id, {$push : {book:data._id}}, (err,data) => {
      if(err) return next(err);
      res.redirect('/author/'+ id);
    })
  })
})
module.exports = router;
