var express = require('express');
var router = express.Router();

//景区支付
router.get('/ticket-pay.html', function(req, res, next) {
    res.render('pay/ticket-pay', { title: '门票支付' });
});


module.exports = router;
