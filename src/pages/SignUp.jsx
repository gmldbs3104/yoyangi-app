// src/pages/SignUp.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import useAppStore from '../store';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  
  const setUserName = useAppStore((state) => state.setUserName);

  // '가입하기' 버튼 클릭 시 실행될 함수
  const handleSubmit = (event) => {
    event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    if (!name || !email || !password) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    console.log(`[SignUp] setUserName을 '${name}' 값으로 호출합니다.`);
    setUserName(name);

    // 나중에 이 부분에서 백엔드로 회원가입 API를 호출합니다.
    console.log('회원가입 정보:', { name, email, password });
    alert(`${name}님, 회원가입이 완료되었습니다!`);

    navigate('/test-start');
  };

  return (
    <div className="container">
      <h1 className="name">회원가입</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        {/* 3. 회원명 입력 필드를 추가합니다. */}
        <div className="form-group">
          <label htmlFor="name">회원명</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <button type="submit" className="login-button">가입하기</button>
      </form>
    </div>
  );
}

export default SignUp;
