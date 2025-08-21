// src/pages/TestStart.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import yoyangiImage from '../assets/cheese_yoyangi.png'; // 기존 이미지 재사용
import useAppStore from '../store';

function TestStart() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState('1');

  const setUserGrade = useAppStore((state) => state.setUserGrade);
  // '시작하기' 버튼을 누르면 테스트의 첫 페이지로 이동합니다.
  const startTest = () => {
    // '/test-question/1' 과 같은 주소로 이동하도록 설정할 수 있습니다.
    navigate('/test-question/1'); 
  };

  // '이미 알고있어요' 버튼을 누르면 메인 홈 페이지로 이동합니다.
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  };

  const handleGradeSubmit = () => {
    setUserGrade(selectedGrade);
    alert(`${selectedGrade}등급으로 설정되었습니다.`);
    navigate('/home');
  }

  return (
    <div className="container">
      <img 
        src={yoyangiImage} 
        alt="요양이 캐릭터" 
        className="profile-image" 
        style={{ marginBottom: '30px' }} 
      />

      <h1 className="test-title">
        요양 등급<br />모의 테스트
      </h1>

      <button type="button" className="test-button primary" onClick={startTest}>
        시작하기
      </button>
      <button type="button" className="test-button secondary" onClick={toggleDropdown}>
        이미 알고있어요
      </button>
      
      {/* 6. showDropdown이 true일 때만 드롭다운 메뉴를 보여줍니다. */}
      {showDropdown && (
        <div className="dropdown-section">
          <select 
            value={selectedGrade} 
            onChange={(e) => setSelectedGrade(e.target.value)} 
            className="grade-select"
          >
            <option value="1">1등급</option>
            <option value="2">2등급</option>
            <option value="3">3등급</option>
            <option value="4">4등급</option>
            <option value="5">5등급</option>
          </select>
          <button type="button" className="test-button primary" onClick={handleGradeSubmit}>
            확인
          </button>
        </div>
      )}
    </div>
  );
}

export default TestStart;
