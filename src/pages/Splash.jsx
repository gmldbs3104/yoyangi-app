// src/pages/Splash.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import yoyangiImage from '../assets/cheese_yoyangi.png'; // 이미지 경로 확인!

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/auth-choice');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container">
      <p>안녕하세요!<br />요양이가 왔어요!</p>
      <h1 className="name">요양이</h1>
      <img src={yoyangiImage} alt="요양이 캐릭터" className="profile-image" />
      <p style={{ marginTop: '20px' }}>잠시 후 시작합니다...</p>
    </div>
  );
}

export default Splash;
