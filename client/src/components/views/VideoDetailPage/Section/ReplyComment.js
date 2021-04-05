import React,{useEffect,useState} from 'react'
import SingleComment from './SingleComment';

function ReplyComment(props) {
  const [OpenReplyComments, setOpenReplyComments] = useState(false);
  const [ChildCommetCount, setChildCommetCount] = useState(0);
  useEffect(() => {
    let commentCount = 0;
  
    props.commentList.map((comment) => {
      if(comment.responseTo === props.parentCommentId){
        commentCount ++;
      }
    })

    setChildCommetCount(commentCount);
  }, [props.commentList])
  
  let renderReplyComment = (parentCommentId) => (
    props.commentList.map((comment, index) => (
      <React.Fragment key={index}>
        {          
          comment.responseTo === parentCommentId &&
          <div style={{width: '80%', marginLeft: '40px'}}>
            <SingleComment refresh={props.refresh} comment={comment} videoId={props.videoId}/>
            <ReplyComment refresh={props.refresh} parentCommentId={comment._id} commentList={props.commentList} videoId={props.videoId}/>
          </div>
        }
      </React.Fragment>
    )) 
  )

  const onHandleChange = () => {
    console.log('%cReplyComment.js line:33 OpenReplyComments', 'color: #007acc;', OpenReplyComments);
    setOpenReplyComments(!OpenReplyComments);
  }

  return (
    <div>
      {
        ChildCommetCount > 0 && 
        <p style={{fontSize: '14px', margin: 0, color: 'gray'}} onClick={onHandleChange}>
        View {ChildCommetCount} more comment(s)
        </p>
      }

      {
        OpenReplyComments &&
        renderReplyComment(props.parentCommentId)
      }

    </div>
  )
}

export default ReplyComment
