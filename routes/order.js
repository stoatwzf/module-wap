var express = require('express');
var router = express.Router();

//景区下单
router.get('/ticket-order.html', function(req, res, next) {
    res.render('order/ticket-order', { title: '门票下单' });
});


module.exports = router;
