// src/components/BottomSheet.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. useNavigate를 다시 불러옵니다.
import '../App.css';
import useAppStore from '../store';
import CallModal from './CallModal.jsx';

function BottomSheet({ facility, onClose }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const sheetRef = useRef(null);
  const touchStartY = useRef(0);
  const navigate = useNavigate(); // 2. navigate 함수를 준비합니다.

  const addToWishlist = useAppStore((state) => state.addToWishlist);

  // 3. '도착' 버튼을 눌렀을 때 길찾기 페이지로 이동하는 함수를 다시 추가합니다.
  const handleGoToDirections = () => {
    navigate('/directions', { state: { destination: facility.name } });
  };

  const handleAddToWishlist = () => {
  const success = addToWishlist(facility); // store 함수는 이제 true/false를 반환합니다.

  // 반환된 값에 따라 다른 alert를 보여줍니다.
  if (success) {
    alert(`${facility.name}을(를) 찜 목록에 추가했습니다.`);
  } else {
    alert('이미 찜한 시설입니다.');
  }
};

  const handleTouchStart = (e) => { touchStartY.current = e.targetTouches[0].clientY; };
  const handleTouchMove = (e) => {
    const touchCurrentY = e.targetTouches[0].clientY;
    const deltaY = touchCurrentY - touchStartY.current;
    if (deltaY < -50){
      navigate(`/facility/${facility.id}`, { state: { facility: facility}});
    }
  };

  useEffect(() => {
    if (facility) {
      setIsExpanded(false);
      if (sheetRef.current) {
        sheetRef.current.scrollTop = 0;
      }
    }
  }, [facility]);

  if (!facility) return null;

  // '공유' 버튼을 눌렀을 때 실행될 이 함수를 추가하세요.
  const handleShare = async () => {
    const shareData = {
      title: `요양 시설 추천: ${facility.name}`,
      text: `${facility.name}\n주소: ${facility.address}`,
      url: window.location.origin, // 앱의 기본 주소
    };

    if (navigator.share) {
      // Web Share API 지원 시 (모바일)
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("공유 실패:", err);
      }
    } else {
      // Web Share API 미지원 시 (데스크탑) - 클립보드 복사로 대체
      try {
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
        alert('시설 정보가 클립보드에 복사되었습니다.');
      } catch (err) {
        alert('정보를 복사하는 데 실패했습니다.', err);
      }
    }
  };

  return (
    <>
      <div className="bottom-sheet-overlay" onClick={onClose} />
      <div 
        className={`bottom-sheet-container ${isExpanded ? 'expanded' : ''}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="handle-bar" />
        
        <div className="sheet-header">
          <p className="facility-type">{facility.type}</p>
          <h2 className="facility-name">{facility.name}</h2>
          <p className="facility-address">주소: {facility.address}</p>
          <p className="facility-distance">내 위치로부터 {facility.distance}</p>
          <div className="action-buttons">
            {/* 4. '도착' 버튼에 onClick 이벤트를 다시 연결합니다. */}
            <button onClick={handleGoToDirections}>도착</button>
            <button onClick={() => setIsCallModalOpen(true)}>전화</button>
            <button onClick={handleAddToWishlist}>저장</button>
            <button onClick={handleShare}>공유</button>
          </div>
          <div className="facility-tags">
            {facility.tags.map((tag, index) => <span key={index}>{tag}</span>)}
          </div>
        </div>
        
        <div ref={sheetRef} className="sheet-scrollable-content">
          <div className="sheet-content">
            <div className="photo-gallery">
              {facility.photos.map((photo, index) => <div key={index} className="photo-placeholder" />)}
            </div>
            
            <div className="detail-section">
              <h3>소개글</h3>
              <p>{facility.description}</p>
              <button className="more-button">더보기</button>
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
          </div>
        </div>
      </div>

      <CallModal 
        isOpen={isCallModalOpen} 
        onClose={() => setIsCallModalOpen(false)} 
        phone={facility.phone} 
      />
    </>
  );
}

export default BottomSheet;
