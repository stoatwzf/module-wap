var express = require('express');
var router = express.Router();

//景区详情
router.get('/:mold/:code', function(req, res, next) {
    var mold=req.params.mold,code=req.params.code;
    switch (mold){
        case "ticket":
            title="门票详情";
            break;
        case "hotel":
            title="酒店详情";
            break;
    }
    res.render('detail', { title: title , mold : mold , code:code });
});
module.exports = router;
