// src/pages/Home.jsx
import React, { useState } from 'react';
import '../App.css';
import BottomNav from '../components/BottomNav.jsx';
import BottomSheet from '../components/BottomSheet.jsx';
import redCatMarker from '../assets/white-cheese_yoyangi_face.png';
import yellowCatMarker from '../assets/three-color_yoyangi_face.png';
import mapImage from '../assets/map_background.png';

// --- 상세 정보를 포함한 모의 데이터 ---
const mockFacilities = [
  { 
    id: 1, 
    name: '서울요양병원', 
    type: '요양병원',
    address: '서울 중구 필동로1길 30', 
    distance: '91m', 
    phone: '010-0000-0000',
    tags: ['소형', '1등급', '설립 8년', '물리치료', '암치료'],
    description: "'병원은 병원다워야합니다' 한의학,의학 융합 협진, 통합연구소 기반 암환자 치료에 집중합니다.",
    evaluation: { grade: '1등급 (최우수)', date: '2024.01.29' },
    bedInfo: { total: 150, available: 12 },
    photos: [ 'photo1.jpg', 'photo2.jpg', 'photo3.jpg' ],
    markerImage: redCatMarker, 
    top: '25%', 
    left: '45%', 
    radius: 150 
  },
  { 
    id: 2, 
    name: '강남 GFC 요양원', 
    type: '요양원',
    address: '서울 강남구 테헤란로 152', 
    distance: '250m', 
    phone: '02-0000-0000',
    tags: ['대형', '2등급', '설립 3년', '재활치료', '도심'],
    description: "도심 속 프리미엄 요양원으로, 최신 시설과 전문적인 케어 서비스를 제공합니다.",
    evaluation: { grade: '2등급 (우수)', date: '2023.11.15' },
    bedInfo: { total: 200, available: 5 },
    photos: [ 'photo4.jpg', 'photo5.jpg' ],
    markerImage: yellowCatMarker, 
    top: '60%', 
    left: '50%', 
    radius: 250 
  },
];

function Home() {
  const [selectedFacility, setSelectedFacility] = useState(null);

  const handleMarkerClick = (facility) => {
    // 클릭이 되었는지 개발자 도구 콘솔에서 확인할 수 있도록 로그를 추가합니다.
    console.log("마커 클릭됨:", facility.name);
    setSelectedFacility(facility);
  };

  const handleCloseSheet = () => {
    setSelectedFacility(null);
  };

  return (
    <div className="home-container">
      {/* 검색 바, 지도 배경 등은 기존과 동일합니다. */}
      <div className="search-bar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input type="text" placeholder="지역, 지하철, 요양시설 검색" />
      </div>

      <div className="map-container">
        <img src={mapImage} alt="지도 배경" className="map-background" />
        <div className="current-location-marker" style={{ top: '40%', left: '52%' }} />
        <div className="home-marker" style={{ top: '70%', left: '65%' }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="#FF0000"><path d="M12 2L2 12h3v8h14v-8h3L12 2zm0 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></svg>
        </div>

        {mockFacilities.map(facility => (
          <React.Fragment key={facility.id}>
            <div 
              className="marker-wrapper" 
              style={{ top: facility.top, left: facility.left }}
            >
              {/* --- 수정된 부분 --- */}
              {/* onClick 이벤트를 div가 아닌 img 태그에 직접 연결합니다. */}
              <img 
                src={facility.markerImage} 
                alt={`${facility.type} 마커`} 
                className="facility-marker-img"
                onClick={() => handleMarkerClick(facility)} 
              />
            </div>
            <div 
              className="radius-circle" 
              style={{ 
                top: facility.top, 
                left: facility.left, 
                width: `${facility.radius * 2}px`, 
                height: `${facility.radius * 2}px` 
              }} 
            />
          </React.Fragment>
        ))}
      </div>

      <BottomNav activeTab="home" />
      <BottomSheet facility={selectedFacility} onClose={handleCloseSheet} />
    </div>
  );
}

export default Home;
