// src/pages/Directions.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';
import mapImage from '../assets/map_background.png'; // 지도 배경 이미지
import useAppStore from '../store';

const { kakao } = window;

function Directions() {
  const navigate = useNavigate();
  const location = useLocation();
  const destinationName = location.state?.destination || '도착지 정보 없음';
  
  const addresses = useAppStore((state) => state.addresses);

  const [startPoint, setStartPoint] = useState('현재 위치');
  const [destinationPoint, setDestinationPoint] = useState(destinationName);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transportMode, setTransportMode] = useState('transit'); // 'transit', 'car', 'walk', 'bike'
  
  const handleStartPointSelect = (point) => {
    setStartPoint(point);
    setIsDropdownOpen(false); // 항목 선택 후 드롭다운 닫기
  };

  const handleSwap = () => {
    // '현재 위치'는 도착지로 설정할 수 없도록 예외 처리
    if (destinationPoint === '현재 위치') return;
    setStartPoint(destinationPoint);
    setDestinationPoint(startPoint);
  };

    // --- 👇 길찾기 로직을 처리할 함수 ---
  const handleStartNavigation = async () => {
    setIsLoading(true); // 로딩 시작

    // 좌표를 가져오는 비동기 함수
    const getCoordinates = (place) => {
      return new Promise((resolve, reject) => {
        // 1. '현재 위치'일 경우
        if (place === '현재 위치') {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                name: '현위치',
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            (err) => reject(new Error('현재 위치를 가져올 수 없습니다.'))
          );
        } else {
          // 2. 저장된 주소(우리집, 회사 등) 또는 직접 입력한 주소일 경우
          const geocoder = new kakao.maps.services.Geocoder();
          
          // 저장된 주소 레이블인지 확인하고, 맞다면 실제 주소 텍스트를 찾음
          const savedAddress = addresses.find(addr => addr.label === place);
          const searchAddress = savedAddress ? savedAddress.text.split('\n')[0] : place;

          geocoder.addressSearch(searchAddress, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              resolve({
                name: place,
                lat: result[0].y,
                lng: result[0].x,
              });
            } else {
              reject(new Error(`'${place}' 주소를 찾을 수 없습니다.`));
            }
          });
        }
      });
    };

    try {
      // 출발지와 도착지 좌표를 동시에 가져옴
      const [start, end] = await Promise.all([
        getCoordinates(startPoint),
        getCoordinates(destinationPoint)
      ]);

      // 카카오맵 길찾기 URL 생성
      const url = `kakaomap://route?start_name=${start.name}&start_x=${start.lng}&start_y=${start.lat}&end_name=${end.name}&end_x=${end.lng}&end_y=${end.lat}`;
      
      console.log("카카오맵 실행 URL:", url);
      window.location.href = url; // 카카오맵 앱 실행

    } catch (error) {
      console.error("길찾기 오류:", error);
      alert(error.message);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
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
          <button 
            className={`transport-button ${transportMode === 'transit' ? 'active' : ''}`}
            onClick={() => setTransportMode('transit')}
          >
            대중교통
          </button>
          <button 
            className={`transport-button ${transportMode === 'car' ? 'active' : ''}`}
            onClick={() => setTransportMode('car')}
          >
            자동차
          </button>
          <button 
            className={`transport-button ${transportMode === 'walk' ? 'active' : ''}`}
            onClick={() => setTransportMode('walk')}
          >
            도보
          </button>
          <button 
            className={`transport-button ${transportMode === 'bike' ? 'active' : ''}`}
            onClick={() => setTransportMode('bike')}
          >
            자전거
          </button>
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
            id="destination-input"
            name="destination-input"
            type="text" 
            value={destinationPoint} 
            onChange={(e) => setDestinationPoint(e.target.value)}
          />
          <button className="swap-button" onClick={handleSwap}>↑↓</button>
        </div>

        <div className="route-actions">
          <button 
            className="route-button primary" 
            onClick={handleStartNavigation}
            disabled={isLoading}
          >
            {isLoading ? '경로를 찾는 중...' : '길찾기 ›'}
          </button>        </div>
      </div>
    </div>
  );
}

export default Directions;
