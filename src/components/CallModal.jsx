// src/components/CallModal.jsx
import React from 'react';
import '../App.css';

function CallModal({ isOpen, onClose, phone }) {
  if (!isOpen) {
    return null;
  }

  // '전화 걸기' 버튼 클릭 시 전화 앱 실행
  const handleCall = () => {
    window.location.href = `tel:${phone}`;
  };

  // '전화번호 저장하기' 버튼 클릭 시 알림
  const handleSave = () => {
    alert(`${phone} 번호를 저장했습니다.`);
    onClose(); // 알림 후 모달 닫기
  };

  return (
    // 배경을 클릭하면 모달이 닫히도록 설정
    <div className="modal-overlay" onClick={onClose}>
      {/* 모달 컨텐츠를 클릭해도 닫히지 않도록 이벤트 전파 중단 */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <p className="modal-phone-number">{phone}</p>
        <button className="modal-button primary" onClick={handleCall}>
          전화 걸기
        </button>
        <button className="modal-button secondary" onClick={handleSave}>
          전화번호 저장하기
        </button>
        <button className="modal-close-button" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}

export default CallModal;
