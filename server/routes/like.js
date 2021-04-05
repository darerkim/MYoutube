const express = require('express');
const router = express.Router();
const { Like } = require('../models/Like');
const { Dislike } = require('../models/Dislike');

//=================================
//             Like
//=================================
router.post('/getLikes', (req, res) => {
  let variables = {};
  if (req.body.videoId) {
    variables = {videoId:req.body.videoId}
  }else{
    variables = {commentId:req.body.commentId}
  }
  Like.find(variables)
  .exec((err, likes) => {
    if(err) return res.status(400).send(err);
    res.status(200).json({success:true,likes});
  })
});
router.post('/getDislikes', (req, res) => {
  let variables = {};
  if (req.body.videoId) {
    variables = {videoId:req.body.videoId}
  }else{
    variables = {commentId:req.body.commentId}
  }
  Dislike.find(variables)
  .exec((err, dislikes) => {
    if(err) return res.status(400).send(err);
    res.status(200).json({success:true,dislikes});
  })
});

router.post('/upLike', (req, res) => {
  let variables = {};
  if (req.body.videoId) {
    variables = {videoId:req.body.videoId, userId:req.body.userId}
  }else{
    variables = {commentId:req.body.commentId, userId:req.body.userId}
  }  
  //Like Collection에 클릭 정보를 넣어준다.  
  const like = new Like(req.body);
  like.save((err, likeResult)=>{
    if(err) return res.status(400).json({success:false,err});
    //만약에 Dislike이 이미 클릭이 되어있다면 그것을 1 줄여준다.
    Dislike.findOneAndDelete(variables)
    .exec((err, dislikeResult)=>{
      if(err) return res.status(400).json({success:false,err});
      res.status(200).json({success:true});
    })
  })  
});

router.post('/unLike', (req, res) => {
  let variables = {};
  if (req.body.videoId) {
    variables = {videoId:req.body.videoId, userId:req.body.userId}
  }else{
    variables = {commentId:req.body.commentId, userId:req.body.userId}
  }  
  //Like Collection에 클릭 정보를 넣어준다.  
  Like.findOneAndDelete(variables)
  exec((err, result)=>{
    if(err) return res.status(400).json({success:false,err});
    res.status(200).json({success:true});
  })
});

router.post('/upDislike', (req, res) => {
  let variables = {};
  if (req.body.videoId) {
    variables = {videoId:req.body.videoId, userId:req.body.userId}
  }else{
    variables = {commentId:req.body.commentId, userId:req.body.userId}
  }  
  //Like Collection에 클릭 정보를 넣어준다.  
  const dislike = new Dislike(req.body);
  dislike.save((err, dislikeResult)=>{
    if(err) return res.status(400).json({success:false,err});
    //만약에 Dislike이 이미 클릭이 되어있다면 그것을 1 줄여준다.
    Like.findOneAndDelete(variables)
    .exec((err, likeResult)=>{
      if(err) return res.status(400).json({success:false,err});
      res.status(200).json({success:true});
    })
  })  
});

router.post('/unDislike', (req, res) => {
  let variables = {};
  if (req.body.videoId) {
    variables = {videoId:req.body.videoId, userId:req.body.userId}
  }else{
    variables = {commentId:req.body.commentId, userId:req.body.userId}
  }  
  //Dislike Collection에 클릭 정보를 넣어준다.  
  Dislike.findOneAndDelete(variables)
  exec((err, result)=>{
    if(err) return res.status(400).json({success:false,err});
    res.status(200).json({success:true});
  })
});
module.exports = router;
