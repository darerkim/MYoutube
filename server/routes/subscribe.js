const express = require('express');
const router = express.Router();
const { Subscriber } = require('../models/Subscriber');

//=================================
//             Subscriber
//=================================
router.post('/subscribe', (req, res) => {
  //구독 합니다.
  const subscribe = new Subscriber(req.body);
  subscribe.save((err, doc) => {
    if(err) return res.status(400).json({success:false, err});
    res.status(200).json({success:true, doc});
  });
})

router.post('/unsubscribe', (req, res) => {
  //구독자을 취소합니다.
  Subscriber.findOneAndDelete({userTo:req.body.userTo, userFrom:req.body.userFrom})
  .exec((err, doc) => {
    if(err) return res.status(400).json({success:false, err});
    res.status(200).json({success:true, doc});
  })
})

router.post('/subscribeCount', (req, res) => {
  //구독자 정보를 가져온다
  Subscriber.find({'userTo': req.body.userTo})
  .exec((err, subscribe) => {
    if(err) return res.status(400).send(err);
    return res.status(200).json({success: true, subscirbeCount: subscribe.length});
  })
})

router.post('/subscribed', (req, res) => {
  //구독상태 여부를 가져온다
  Subscriber.find({'userTo': req.body.userTo, 'userFrom': req.body.userFrom})
  .exec((err, subscribe) => {
    if(err) return res.status(400).send(err);
    let result = false;
    if(subscribe.length !== 0)
    result = true;
    return res.status(200).json({success: true, subscribed: result});
  })
})

module.exports = router;
