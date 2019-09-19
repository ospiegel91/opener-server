const router = require('express').Router();
const authenticate = require('../middleware/authenticate');


router.get('/private', authenticate, (req,res)=>{
    let obj = {
        message: 'this is a secret route',
        secret: 'You may pass!',
        _id: req._id,
    }

    res.status(200).send(obj);
})

module.exports = router;