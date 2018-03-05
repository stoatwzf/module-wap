var express = require('express');
var router = express.Router();

/* 首页   请求：req   接收：res   下一个：next*/
router.get('/index.html', function(req, res, next) {
  res.render('index', { title: '黄果树' });
});

/* 引导页 */
router.get('/', function(req, res, next) {
  res.render('index-prologue', { title: '黄果树' });
});

module.exports = router;
