var express = require('express');
var router = express.Router();
var article = require('../model/articles');

router.get('/', (req,res,next) => {
  res.render('dArticles');
})

router.get('/:id', (req,res,next) => {
  res.render('single');
})

router.get('/new', (req,res,next) => {
  res.render('')
})

module.exports = router;