const express = require('express');
const router = express.Router();
const Opener = require('../db/models/opener-model');
const User  = require('../db/models/user-model');

router.post('/create', (req, res)=>{
    const {alias, content, genere} = req.body;

    let newOpener = new Opener({
        alias,
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
    console.log(req.query['id'])
    let _openerId = req.query['id'];
    Opener.findOne({_id: _openerId}).then((opener)=>{
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


router.get('/retrieve-by-cat', (req,res)=>{
    console.log(req.query['category'])
    let category = req.query['category'];
    Opener.find({ genere: category}).then((openers)=>{
        if(!openers){
            return res.status(404).send();
        }
        console.log(openers)
        return res.status(200).send(openers);
    })
    .catch(err => {
        if(err) {
            return res.status(401).send(err);
        }
        return res.status(401).send();
    });
});

function countUnique(iterable) {
    return new Set(iterable).size;
}

router.get('/success', (req, res)=>{
    let _openerId = req.query['id'];

    Opener.findOne({_id: _openerId}).then((opener)=>{
        if(!opener){
            console.log('opener not found')
            return res.status(404).send();
        }
        let ups = countUnique(opener.upVotes); 
        console.log('up votes: ' + ups);
        let downs = countUnique(opener.downVotes); 
        console.log('down votes: ' + ups);
        let successRate = ups/(ups+downs)
        let success = Math.round(successRate * 100) / 100 
        console.log('sucess rate is :   -  - ' + success)
        let data = {
            "upVotes": ups,
            "downVotes": downs,
            "successRate": success
        };
        return res.status(200).send(data);

    })
    .catch(err => {
        if(err) {
            return res.status(401).send(err);
        }
        return res.status(401).send();
    });
});

router.post('/up-vote', (req, res)=>{
    const {_userId, _openerId} = req.body;

    Opener.findOne({_id: _openerId}).then((opener)=>{
        if(!opener){
            console.log('opener not found')
            return res.status(404).send();
        }
        opener.upVotes.push(_userId);
        opener.save()
        return res.status(200).send(opener);
    })
    .catch(err => {
        if(err) {
            return res.status(401).send(err);
        }
        return res.status(401).send();
    });
});

router.post('/down-vote', (req, res)=>{
    const {_userId, _openerId} = req.body;

    Opener.findOne({_id: _openerId}).then((opener)=>{
        if(!opener){
            console.log('opener not found')
            return res.status(404).send();
        }
        opener.downVotes.push(_userId);
        opener.save()
        return res.status(200).send(opener);
    })
    .catch(err => {
        if(err) {
            return res.status(401).send(err);
        }
        return res.status(401).send();
    });
});



module.exports = router