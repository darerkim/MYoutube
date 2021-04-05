import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col } from 'antd';
import Axios from 'axios';
import SideVideo from './Section/SideVideo';
import Subscribe from './Section/Subscribe';
import Comment from './Section/Comment';
import LikeDislikes from './Section/LikeDislikes';

function VideoDetailPage(props) {
  const [VideoDetail, setVideoDetail] = useState([]);
  const [Comments, setComments] = useState([]);
  const videoId = props.match.params.videoId;
  const variable = { videoId };
  useEffect(() => {
    Axios.post('/api/video/getVideoDetail', variable)
    .then(response =>{
      if(response.data.success){
        setVideoDetail(response.data.videoDetail);
      }else{
        alert('비디오 정보를 가져오지 못했습니다.');
      }
    })
    Axios.post('/api/comment/getComments', variable)
    .then(response => {
      if (response.data.success){
        setComments(response.data.comments);
      }else{
        alert('코멘트 정보를 가져오는 것을 실패 하였습니다.');
      }
    })
  }, []);

  const refresh = (newComment) => {
    setComments(Comments.concat(newComment));
  }

  if(VideoDetail.writer){
    const subscribeBtn = VideoDetail.writer._id !== localStorage.getItem('userId') 
    && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')}/>
    return (
      <div>
        <Row gutter={[16, 16]}>
          <Col lg={18} xs={24}>
            <div style={{width:'100%', padding:'3rem 4rem'}}>
              <video style={{width:'100%'}} src={`http://localhost:5000/${VideoDetail.filePath}`} controls/>
              <List.Item actions={[<LikeDislikes video videoId={videoId} userId={localStorage.getItem('userId')}/> , subscribeBtn]}>
                <List.Item.Meta
                  avatar={<Avatar src={VideoDetail.writer.image} />}
                  title={VideoDetail.writer.name}
                  description={VideoDetail.description}
                />
              </List.Item>
              {/* Comments */}
              <Comment refresh={refresh} commentList={Comments} videoId={videoId}c/>
            </div>
          </Col>
          <Col lg={6} xs={24}>
            <SideVideo />
          </Col>
        </Row>
      </div>
    )
  }else{
    return (
      <div>
        ...loading
      </div>
    )
  }
  
}

export default VideoDetailPage
