// src/pages/Directions.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';
import mapImage from '../assets/map_background.png'; // 지도 배경 이미지
import useAppStore from '../store';

function Directions() {
  const navigate = useNavigate();
  const location = useLocation();
  // URL을 통해 전달받은 도착지 이름
  const destinationName = location.state?.destination || '도착지 정보 없음';
  
  const addresses = useAppStore((state) => state.addresses);

  const [startPoint, setStartPoint] = useState('현재 위치');
  const [destinationPoint, setDestinationPoint] = useState(destinationName);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleStartPointSelect = (point) => {
    setStartPoint(point);
    setIsDropdownOpen(false); // 항목 선택 후 드롭다운 닫기
  };

  const handleSwap = () => {
    setStartPoint(destinationPoint);
    setDestinationPoint(startPoint);
  };

  return (
    <div className="directions-container">
      {/* 상단 뒤로가기 버튼 */}
      <button onClick={() => navigate(-1)} className="directions-back-button">‹</button>
      
      {/* 지도 배경 */}
      <div className="map-background-blurry">
        <img src={mapImage} alt="흐린 지도 배경" />
      </div>

      {/* 길찾기 UI */}
      <div className="directions-ui-wrapper">
        <div className="transport-options">
          <button className="transport-button active">대중교통</button>
          <button className="transport-button">자동차</button>
          <button className="transport-button">도보</button>
          <button className="transport-button">자전거</button>
        </div>

        <div className="route-inputs">
          {/* 4. 출발지 입력창을 드롭다운 트리거로 변경 */}
          <div className="start-point-selector" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <span>{startPoint}</span>
            <span>▼</span>
          </div>
          {/* 5. isDropdownOpen이 true일 때만 드롭다운 메뉴를 보여줍니다. */}
          {isDropdownOpen && (
            <div className="start-point-dropdown">
              <div onClick={() => handleStartPointSelect('현재 위치')}>현재 위치</div>
              {addresses.map(addr => (
                <div key={addr.id} onClick={() => handleStartPointSelect(addr.label)}>
                  {addr.label}
                </div>
              ))}
            </div>
          )}
          <input 
            type="text" 
            value={destinationPoint} 
            onChange={(e) => setDestinationPoint(e.target.value)}
          />
          <button className="swap-button" onClick={handleSwap}>↑↓</button>
        </div>

        <div className="route-actions">
          <button className="route-button primary">길찾기 ›</button>
        </div>
      </div>
    </div>
  );
}

export default Directions;
