// src/components/ImageViewerModal.jsx
import React from 'react';
import '../App.css'; // 모달 스타일을 App.css에 추가할 예정

function ImageViewerModal({ imageUrl, onClose }) {
  if (!imageUrl) return null; // 이미지가 없으면 렌더링하지 않음

  return (
    // 배경을 클릭하면 모달이 닫히도록 설정
    <div className="image-viewer-overlay" onClick={onClose}>
      <div className="image-viewer-content">
        <img 
          src={imageUrl} 
          alt="확대 이미지" 
          // 이미지 자체를 클릭해도 모달이 닫히지 않도록 이벤트 버블링 방지
          onClick={(e) => e.stopPropagation()} 
        />
        <button className="image-viewer-close-button" onClick={onClose}>×</button>
      </div>
    </div>
  );
}

export default ImageViewerModal;