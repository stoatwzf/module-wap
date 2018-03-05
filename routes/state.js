var express = require('express');
var router = express.Router();

//景区下单-提交成功
router.get('/ticket-pay-success.html', function(req, res, next) {
    res.render('state/state', { title: '门票提交成功' , substate : "成功" });
});

//景区下单-提交失败
router.get('/ticket-pay-fail.html', function(req, res, next) {
    res.render('state/state', { title: '门票提交失败' , substate : "失败" });
});

module.exports = router;
