// src/pages/AuthChoice.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import yoyangiImage from '../assets/cheese_yoyangi.png'; // 이미지 경로 확인!

function AuthChoice() {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    navigate('/login');
  };

  return (
    <div className="container">
      <p className="welcome-text">요양이가 기다리고 있었어요!</p>

      <img src={yoyangiImage} alt="요양이 캐릭터" className="profile-image" style={{ marginBottom: '40px' }}/>

      <button type="button" className="kakao-button" onClick={handleKakaoLogin}>
        카카오 1초 로그인/회원가입
      </button>

      <div className="separator">
        <div className="line" />
        <span>또는</span>
        <div className="line" />
      </div>

      <Link to="/signup" className="signup-link">일반 회원가입</Link>
    </div>
  );
}

export default AuthChoice;
