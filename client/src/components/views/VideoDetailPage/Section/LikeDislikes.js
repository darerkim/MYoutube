import React,{useEffect, useState} from 'react';
import { Tooltip, Icon } from 'antd';
import Axios from 'axios';

function LikeDislikes(props) {
  const [LikesCount, setLikesCount] = useState(0);
  const [DislikesCount, setDislikesCount] = useState(0);
  const [IsLiked, setIsLiked] = useState(null);
  const [IsDisliked, setIsDisliked] = useState(null);
  let variables = {};
  if (props.video) {
    variables = {videoId:props.videoId , userId:props.userId}
  }else{
    variables = {commentId:props.commentId , userId:props.userId}
  }
  useEffect(() => {
    Axios.post('/api/like/getLikes', variables)
    .then(response => {
      if(response.data.success) {
        //얼마나 많은 좋아요를 받았는지
        setLikesCount(response.data.likes.length)
        //내가 이미 좋아요를 눌렀는지
        response.data.likes.map(like => {
          if (like.userId === props.userId) {
            setIsLiked('liked');
          }
        })
      }else{
        alert('Likes의 정보를 가져오지 못했습니다.');
      }
    });

    Axios.post('/api/like/getDislikes', variables)
    .then(response => {
      if(response.data.success) {
        //얼마나 많은 싫어요를 받았는지
        setDislikesCount(response.data.dislikes.length);
        //내가 이미 싫어요를 눌렀는지
        response.data.dislikes.map(dislike => {
          if (dislike.userId === props.userId) {
            setIsDisliked('disliked');
          }
        })
      }else{
        alert('Dislikes의 정보를 가져오지 못했습니다.');
      }
    });
  }, [])

  const onLike = () => {
    if (variables.userId === null) {
      alert('로그인 후 좋아요 기능을 이용해주세요');
      return;
    }
    if (IsLiked === null) {
      Axios.post('/api/like/upLike', variables)
      .then(response => {
        if(response.data.success){
          setLikesCount(LikesCount + 1);
          setIsLiked('liked');
          if(IsDisliked !== null){
            setIsDisliked(null);
            setDislikesCount(DislikesCount-1);
          }
        }else{
          alert('Like를 올리지 못했습니다.');
        }
      })
    }else{
      Axios.post('/api/like/unLike', variables)
      .then(response => {
        if(response.data.success){
          setLikesCount(LikesCount - 1);
          setIsLiked(null);
        }else{
          alert('Like를 내리지 못했습니다.');
        }
      })
    }
  }
  const onDislike = () => {
    if (variables.userId === null) {
      alert('로그인 후 싫어요 기능을 이용해주세요');
      return;
    }
    if (IsDisliked === null) {
      console.log('%cLikeDislikes.js line:79 variables', 'color: #007acc;', variables);
      console.log('%cLikeDislikes.js line:79 props', 'color: #007acc;', props);
      Axios.post('/api/like/upDislike', variables)
      .then(response => {
        if(response.data.success){
          setDislikesCount(DislikesCount + 1);
          setIsDisliked('disliked');
          if(IsLiked !== null){
            setIsLiked(null);
            setLikesCount(LikesCount-1);
          }
        }else{
          alert('Dislike를 올리지 못했습니다.');
        }
      })
    }else{
      Axios.post('/api/like/unDislike', variables)
      .then(response => {
        if(response.data.success){
          setDislikesCount(DislikesCount - 1);
          setIsDisliked(null);
        }else{
          alert('Dislike를 내리지 못했습니다.');
        }
      })
    }
  }
  return (
    <div>
      <span key='comment-basic-like'>
        <Tooltip title='Like'>
          <Icon type='like'
                theme={IsLiked==='liked'? 'filled':'outlined'}
                onClick={onLike}
          />
        </Tooltip>
        <span style={{ padding:'8px', cursor:'auto'}}> {LikesCount} </span>
      </span>
      <span key='comment-basic-dislike'>
        <Tooltip title='Dislike'>
          <Icon type='dislike'
                theme={IsDisliked==='disliked'? 'filled':'outlined'}
                onClick={onDislike}
          />
        </Tooltip>
        <span style={{ padding:'8px', cursor:'auto'}}> {DislikesCount} </span>
      </span>
    </div>
  )
}

export default LikeDislikes
