// src/pages/Recommendation.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import BottomNav from '../components/BottomNav.jsx';
import yoyangiCharacter from '../assets/cheese_yoyangi.png'; // 캐릭터 이미지
import useAppStore from '../store.js';

// AI가 추천해준 시설에 대한 모의 데이터
// 2. 여러 개의 추천 시설 모의 데이터를 만듭니다.
const mockRecommendedFacilities = [
  { id: 1, name: '서울요양병원', type: '요양병원', phone: '010-1111-2222', address: '서울 중구 필동로1길 30', distance: '91m', travelTime: '10분', tags: ['소형', '1등급', '물리치료'], description: "'병원은 병원다워야합니다'...", evaluation: { grade: '1등급 (최우수)', date: '2024.01.29' }, bedInfo: { total: 150, available: 12 }, photos: [ 'photo1.jpg', 'photo2.jpg' ] },
  { id: 2, name: '강남 GFC 요양원', type: '요양원', phone: '010-3333-4444', address: '서울 강남구 테헤란로 152', distance: '250m', travelTime: '15분', tags: ['대형', '2등급', '재활치료'], description: "도심 속 프리미엄 요양원...", evaluation: { grade: '2등급 (우수)', date: '2023.11.15' }, bedInfo: { total: 200, available: 5 }, photos: [ 'photo4.jpg' ] },
  { id: 3, name: '은평 실버타운', type: '실버타운', phone: '010-5555-6666', address: '서울 은평구 연서로 20', distance: '1.2km', travelTime: '25분', tags: ['중형', '1등급', '도심'], description: "편안한 노후를 위한 최상의 선택...", evaluation: { grade: '1등급 (최우수)', date: '2024.03.10' }, bedInfo: { total: 120, available: 20 }, photos: [ 'photo5.jpg' ] },
];

function Recommendation() {
  const navigate = useNavigate();
  const [recommendedFacility, setRecommendedFacility] = useState(mockRecommendedFacilities[0]);
  const [isLoading, setIsLoading] = useState(false);
  const userName = useAppStore((state) => state.userName);

    // 4. '다시 추천받기' 버튼 클릭 시 실행될 함수 로직을 변경합니다.
  const handleReRecommend = () => {
    setIsLoading(true); // 로딩 시작

    // 1초 후 실행 (AI 모델 시뮬레이션)
    setTimeout(() => {
      // 현재 시설을 제외한 나머지 시설들 중에서 랜덤으로 하나를 선택합니다.
      const otherFacilities = mockRecommendedFacilities.filter(f => f.id !== recommendedFacility.id);
      const newRecommendation = otherFacilities[Math.floor(Math.random() * otherFacilities.length)];
      
      setRecommendedFacility(newRecommendation); // 추천 시설 업데이트
      setIsLoading(false); // 로딩 종료
    }, 1000);
  };

  const handleCardClick = () => {
    navigate(`/facility/${recommendedFacility.id}`, { state: { facility: recommendedFacility } });
  };

  return (
    <div className="recommendation-container">
      <div className="recommendation-content">
        <h1 className="recommendation-title">요양이가 {userName}님에게<br />딱 맞는 곳을 찾았어요</h1>

        {/* 5. 로딩 상태에 따라 다른 UI를 보여줍니다. */}
        {isLoading ? (
          <div className="recommendation-card loading">
            <p>다시 추천 중...</p>
          </div>
        ) : (
          <div className="recommendation-card" onClick={handleCardClick}>
            <div className="recommendation-photo" />
            <div className="recommendation-info">
              <h2>{recommendedFacility.name}</h2>
              <p>주소: {recommendedFacility.address}</p>
              <p>내 위치로부터 {recommendedFacility.distance} | 예상 이동 시간: {recommendedFacility.travelTime}</p>
              <div className="facility-tags">
                {recommendedFacility.tags.map((tag, index) => <span key={index}>{tag}</span>)}
              </div>
            </div>
          </div>
        )}

        <div className="re-recommend-section">
          <div className="re-recommend-bubble">
            <p>조건이 바뀌었다면?</p>
            <button className="re-recommend-button" onClick={handleReRecommend} disabled={isLoading}>
              {isLoading ? '추천 중...' : '다시 추천받기'}
            </button>
          </div>
          <img src={yoyangiCharacter} alt="요양이 캐릭터" className="re-recommend-cat" />
        </div>
      </div>

      <BottomNav activeTab="search" />
    </div>
  );
}

export default Recommendation;
