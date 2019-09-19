const express = require('express');
const router = express.Router();
const Opener = require('../db/models/opener-model');

router.post('/create', (req, res)=>{
    const {content, genere} = req.body;

    let newOpener = new Opener({
        content,
        genere
    });

    newOpener.save().then(opener=>{
        if (!opener){
            alert('opener not registered')
            return res.status(400).send()
        }
        return res.status(201).send(opener);
    }).catch(err=>{
        if (err){
            alert(err)
            return res.status(400).send({error:err});
        }
        alert('in opener route catch')
        return res.status(400).send();
    })
});


router.get('/retrieve-one', (req,res)=>{
    const {_openerId} = req.body;
    Opener.findOne({_openerId}).then((opener)=>{
        if(!opener){
            return res.status(404).send();
        }
        return res.status(200).send(opener);
    })
    .catch(err => {
        if(err) {
            return res.status(401).send(err);
        }
        return res.status(401).send();
    });
});

router.get('/retrieve-all', (req,res)=>{
    Opener.find().then((openers)=>{
        if(!openers){
            return res.status(404).send();
        }
        return res.status(200).send(openers);
    })
    .catch(err => {
        if(err) {
            return res.status(401).send(err);
        }
        return res.status(401).send();
    });
});






module.exports = router