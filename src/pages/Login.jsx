// src/pages/Login.jsx
import React from 'react';
// 1. react-router-dom에서 useNavigate를 불러옵니다.
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Login() {
  // 2. navigate 함수를 사용할 수 있도록 준비합니다.
  const navigate = useNavigate();

  // 3. 폼(form)이 제출될 때 실행될 함수를 만듭니다.
  const handleLogin = (event) => {
    // 폼 제출 시 페이지가 새로고침되는 기본 동작을 막습니다.
    event.preventDefault(); 
    
    // 여기에 실제 아이디/비밀번호 확인 로직을 추가할 수 있습니다.
    // 지금은 성공했다고 가정하고 바로 페이지를 이동시킵니다.
    console.log("로그인 시도!");

    // 4. 로그인 성공 후, '/test-start' 경로로 페이지를 이동시킵니다.
    navigate('/test-start');
  };

  return (
    <div className="container">
      <h1 className="name">로그인</h1>
      {/* 5. form 태그에 onSubmit 이벤트를 연결합니다. */}
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">아이디</label>
          <input type="text" id="username" placeholder="아이디를 입력하세요" />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" placeholder="비밀번호를 입력하세요" />
        </div>

        <button type="submit" className="login-button">로그인</button>
      </form>
    </div>
  );
}

export default Login;
