import React,{useState} from 'react'
import { useSelector } from 'react-redux';
import {Comment, Avatar, Button, Input} from 'antd';
import Axios from 'axios';
import LikeDislikes from './LikeDislikes';

function SingleComment(props) {
  const user = useSelector(state => state.user);
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState('');
  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  }
  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    const variables = {
      content: CommentValue,
      writer: user.userData._id,
      videoId: props.videoId,
      responseTo: props.comment._id
    }
    
    Axios.post('/api/comment/saveComment', variables)
    .then(response => {
      if(response.data.success ){
        console.log('%cComment.js line:20 response.data', 'color: #007acc;', response.data);
        props.refresh(response.data.result);
        setCommentValue('');
        setOpenReply(false);
      }else{
        alert('커멘트를 저장하지 못했습니다.')
      }
    })
  }
  const actions = [
    <LikeDislikes commentId={props.comment._id} userId={localStorage.getItem('userId')}/>,
    <span onClick={onClickReplyOpen} key='comment-basic-reply-to'> Reply to</span>
  ]

  return (
    <div>
      <Comment 
        actions={actions}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt={props.comment.writer.name} />}
        content={<p>{props.comment.content}</p>}
      />
      {/* Root Comment Form  */}      
      {OpenReply &&
        <form style={{display:'flex'}} onSubmit={onSubmit}>
          <textarea
            style={{width: '100%', borderRadius: '5px'}}
            onChange={handleChange}
            value={CommentValue}
            placeholder='코멘트를 작성해 주세요'          
          />
          <br />
          <button style={{width: '20%', height: '52px'}} onClick={onSubmit}>Submit</button>
        </form> 
      }
    </div>
  )
}

export default SingleComment
