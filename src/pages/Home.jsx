// src/pages/Home.jsx
import React, { useState } from 'react';
import '../App.css';
import BottomNav from '../components/BottomNav.jsx';
import BottomSheet from '../components/BottomSheet.jsx';
import KakaoMap from '../components/KaKaoMap.jsx'; 
import redCatMarker from '../assets/white-cheese_yoyangi_face.png';
import yellowCatMarker from '../assets/three-color_yoyangi_face.png';
import useAppStore from '../store.js';

function Home() {
  const [selectedFacility, setSelectedFacility] = useState(null);
  // Zustand 스토어에서 전체 시설 목록을 가져옵니다 (나중을 위해).
  // 지금은 아래에 정의된 mockFacilities를 사용합니다.
  // const facilities = useAppStore((state) => state.facilities);

  // 데이터에 실제 위도(lat), 경도(lng) 값을 추가합니다.
  const mockFacilities = [
    { 
      id: 1, 
      name: '서울요양병원', 
      lat: 37.5599, 
      lng: 126.9946, 
      type: '요양병원',
      phone: '010-1111-2222',
      address: '서울 중구 필동로1길 30', 
      distance: '91m', 
      tags: ['소형', '1등급', '설립 8년', '물리치료', '암치료'],
      description: "'병원은 병원다워야합니다' 한의학,의학 융합 협진, 통합연구소 기반 암환자 치료에 집중합니다.",
      evaluation: { grade: '1등급 (최우수)', date: '2024.01.29' },
      bedInfo: { total: 150, available: 12 },
      photos: [ 'photo1.jpg', 'photo2.jpg', 'photo3.jpg' ],
      markerImage: redCatMarker
    },
    { 
      id: 2, 
      name: '강남 GFC 요양원', 
      lat: 37.5012, 
      lng: 127.0396, 
      type: '요양원',
      phone: '010-3333-4444',
      address: '서울 강남구 테헤란로 152', 
      distance: '250m', 
      tags: ['대형', '2등급', '설립 3년', '재활치료', '도심'],
      description: "도심 속 프리미엄 요양원으로, 최신 시설과 전문적인 케어 서비스를 제공합니다.",
      evaluation: { grade: '2등급 (우수)', date: '2023.11.15' },
      bedInfo: { total: 200, available: 5 },
      photos: [ 'photo4.jpg', 'photo5.jpg' ],
      markerImage: yellowCatMarker
    },
  ];

  const handleMarkerClick = (facility) => {
    setSelectedFacility(facility);
  };

  const handleCloseSheet = () => {
    setSelectedFacility(null);
  };

  return (
    <div className="home-container">
      <div className="search-bar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input 
          id="main-search"
          name="main-search"
          type="text" 
          placeholder="지역, 지하철, 요양시설 검색" 
        />
      </div>

      <div className="map-container">
        {/* 기존 img 태그를 KakaoMap 컴포넌트로 교체합니다. */}
        <KakaoMap facilities={mockFacilities} onMarkerClick={handleMarkerClick} />
      </div>

      <BottomNav activeTab="home" />
      <BottomSheet facility={selectedFacility} onClose={handleCloseSheet} />
    </div>
  );
}

export default Home;
