// src/pages/FacilityDetails.jsx
import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

import useWishlistStore from '../store';
import CallModal from '../components/CallModal';

function FacilityDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const facility = location.state?.facility;

  // 4. 전화 팝업의 열림/닫힘 상태를 관리합니다.
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  // 5. 찜하기 기능을 가져옵니다.
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);

  // 6. 바텀시트에서 사용했던 버튼 핸들러 함수들을 그대로 가져옵니다.
  const handleGoToDirections = () => {
    navigate('/directions', { state: { destination: facility.name } });
  };

  const handleShare = async () => {
    const shareData = {
      title: `요양 시설 추천: ${facility.name}`,
      text: `${facility.name}\n주소: ${facility.address}`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
        alert('시설 정보가 클립보드에 복사되었습니다.');
      }
    } catch (err) {
      console.error("공유 실패:", err);
      alert('공유에 실패했습니다.');
    }
  };

  // 데이터가 없으면 홈으로 돌려보냅니다.
  if (!facility) {
    return (
      <div className="container">
        <h1>정보 없음</h1>
        <p>시설 정보를 불러올 수 없습니다.</p>
        <button onClick={() => navigate('/home')}>홈으로 돌아가기</button>
      </div>
    );
  }

  return (
    <div className="details-page-container">
      {/* 상단 헤더 */}
      <div className="details-header">
        <button onClick={() => navigate(-1)} className="back-button">‹</button>
        <h2>{facility.name}</h2>
        {/* 제목을 중앙에 맞추기 위한 빈 공간 */}
        <div style={{ width: '40px' }} />
      </div>

      {/* 스크롤되는 콘텐츠 */}
      <div className="details-content">
        
        {/* 상단 정보 섹션 */}
        <div className="facility-info-section">
          <p className="facility-type">{facility.type}</p>
          <h2 className="facility-name">{facility.name}</h2>
          <p className="facility-address">주소: {facility.address}</p>
          <p className="facility-distance">내 위치로부터 {facility.distance}</p>
          {/* 7. 각 버튼에 onClick 이벤트를 연결합니다. */}
          <div className="action-buttons">
            <button onClick={handleGoToDirections}>도착</button>
            <button onClick={() => setIsCallModalOpen(true)}>전화</button>
            <button onClick={() => addToWishlist(facility)}>저장</button>
            <button onClick={handleShare}>공유</button>
          </div>
          
          <div className="facility-tags">
            {facility.tags.map((tag, index) => <span key={index}>{tag}</span>)}
          </div>
        </div>

        <div className="photo-gallery">
          {facility.photos.map((photo, index) => <div key={index} className="photo-placeholder" />)}
        </div>
        
        <div className="detail-section">
          <h3>소개글</h3>
          <p>{facility.description}</p>
        </div>

        <div className="detail-section">
          <h3>평가등급</h3>
          <div className="info-box">
            <p><strong>{facility.evaluation.grade}</strong></p>
            <p>평가일: {facility.evaluation.date}</p>
          </div>
        </div>

        <div className="detail-section">
          <h3>병상정보</h3>
          <div className="info-box">
            <p>총 병상: {facility.bedInfo.total}개</p>
            <p><strong>입원 가능: {facility.bedInfo.available}개</strong></p>
          </div>
        </div>

        <div className="detail-section">
          <h3>주요 프로그램</h3>
          <div className="info-box">
            <p><strong>인지 기능 향상:</strong> 미술 치료, 음악 치료, 회상 요법</p>
            <p><strong>신체 재활:</strong> 전문 물리치료, 작업 치료, 도수 치료</p>
            <p><strong>여가 활동:</strong> 원예, 종교 활동, 노래 교실</p>
          </div>
        </div>

        <div className="detail-section">
          <h3>비용 안내 (월 기준)</h3>
          <div className="info-box">
            <p><strong>1인실:</strong> 300만원</p>
            <p><strong>2인실:</strong> 250만원</p>
            <p><strong>4인실:</strong> 180만원</p>
            <p>* 식대 및 비급여 항목은 별도입니다.</p>
          </div>
        </div>
      </div>

      {/* 8. 전화 팝업 모달을 렌더링합니다. */}
      <CallModal 
        isOpen={isCallModalOpen} 
        onClose={() => setIsCallModalOpen(false)} 
        phone={facility.phone} 
      />
    </div>
  );
}

export default FacilityDetails;
