var express = require('express');
var router = express.Router();


router.get('/:mold', function(req, res, next) {
    var mold=req.params.mold;
    switch (mold){
        case "ticket":
            title="景区列表";
            break;
        case "hotel":
            title="酒店列表";
            break;
    }
    res.render('list', { title: title , mold : mold });
});

module.exports = router;
