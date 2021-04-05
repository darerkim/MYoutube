import Axios from 'axios'
import React,{useEffect,useState} from 'react'
import {Button} from 'antd';

function Subscribe(props) {
  const [SubscribeCount, setSubscribeCount] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);
  useEffect(() => {
    let variables = {
      userFrom: props.userFrom,
      userTo: props.userTo
    };
    Axios.post('/api/subscribe/subscribeCount', variables)
    .then(response => {
      if(response.data.success) {
        console.log('%cSubscribe.js line:17 response.data', 'color: #007acc;', response.data);
        setSubscribeCount(response.data.subscirbeCount);
      }else{
        alert('구독자 수 정보 가져오기를 실패했습니다.');
      }
    });
    Axios.post('/api/subscribe/subscribed', variables)
    .then(response => {
      if(response.data.success) {
        console.log('%cSubscribe.js line:27 response.data', 'color: #007acc;', response.data);
        setSubscribed(response.data.subscribed);
      }else{
        alert('구독 여부 가져오기를 실패했습니다.');
      }
    });
  }, [])
  const onSubscribe = () => {
    let variables = {
      userFrom: props.userFrom,
      userTo: props.userTo
    }
    if(Subscribed){
      Axios.post('/api/subscribe/unsubscribe', variables)
      .then(response => {
        if(response.data.success) {
          console.log('%cSubscribe.js line:44 response.data', 'color: #007acc;', response.data);
          setSubscribeCount(SubscribeCount-1);
          setSubscribed(!Subscribed);
        }else{
          alert('구독에 실패했습니다.');
      }})
    }else{
      Axios.post('/api/subscribe/subscribe', variables)
      .then(response => {
        if(response.data.success) {
          console.log('%cSubscribe.js line:53 response.data', 'color: #007acc;', response.data);
          setSubscribeCount(SubscribeCount+1);
          setSubscribed(!Subscribed);
        }else{
          alert('구독 취소에 실패했습니다.');
      }})
    }
  }
  return (
      <div>
          <button 
            style={{
              backgroundColor: `${Subscribed?'#AAAAAA':'#CC0000'}`, borderRadius: '4px',
              color: 'white', padding: '10px 16px', fontWeight: '500',
              fontSize: '1rem', textTransform: 'uppercase'
            }}
            onClick={onSubscribe}
          >
            {SubscribeCount} {Subscribed ? 'Subscribed':'Subscribe'}
          </button>
      </div>
  )
}

export default Subscribe
