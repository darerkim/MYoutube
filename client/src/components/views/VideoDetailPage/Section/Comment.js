import Axios from 'axios';
import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

function Comment(props) {
  const videoId = props.videoId;
  const user = useSelector(state => state.user);
  const [CommentValue, setCommentValue] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    const variables = {
      content: CommentValue,
      writer: user.userData._id,
      videoId: videoId
    }
    
    Axios.post('/api/comment/saveComment', variables)
    .then(response => {
      if(response.data.success ){
        console.log('%cComment.js line:20 response.data.result', 'color: #007acc;', response.data.result);
        props.refresh(response.data.result);
        setCommentValue('');
      }else{
        alert('커멘트를 저장하지 못했습니다.');
      }
    })
  }
  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value)
  }

  return (
    <div>
      <br />
      <p> Replies </p>
      <hr />

      {/* Comment Lists */}
      {props.commentList && props.commentList.map((comment, index) => (
        (!comment.responseTo &&
          <React.Fragment key={comment._id}>
            <SingleComment refresh={props.refresh} comment={comment} videoId={videoId}/>
            <ReplyComment refresh={props.refresh} parentCommentId={comment._id} commentList={props.commentList} videoId={videoId}/>
          </React.Fragment>
        )
      ))}

      {/* Root Comment Form  */}      
      <form style={{display:'flex'}} onSubmit={onSubmit}>
        <textarea
          style={{width: '100%', borderRadius: '5px'}}
          onChange ={handleChange}
          value={CommentValue}
          placeholder='코멘트를 작성해 주세요'          
        />
        <br />
        <button style={{width: '20%', height: '52px'}} onClick={onSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default Comment