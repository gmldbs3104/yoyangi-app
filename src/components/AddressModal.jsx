// src/components/AddressModal.jsx
import React, { useState, useEffect } from 'react';
import '../App.css';

function AddressModal({ isOpen, onClose, onComplete, initialData }) {
  // 1. 주소 별명과 주소 텍스트를 관리하는 상태 추가
  const [label, setLabel] = useState('');
  const [address, setAddress] = useState('');

  // 2. 모달이 열릴 때, 수정 모드이면 기존 데이터를 채워넣음
  useEffect(() => {
    if (isOpen && initialData) {
      setLabel(initialData.label);
      setAddress(initialData.text);
    } else if (isOpen) {
      // 추가 모드일 때는 필드를 비움
      setLabel('');
      setAddress('');
    }
  }, [isOpen, initialData]);

  // 3. 주소 검색 버튼 클릭 시 카카오 API 실행
  const handleSearch = () => {
    new window.daum.Postcode({
      oncomplete: (data) => {
        let fullAddress = data.address;
        let extraAddress = '';
        if (data.addressType === 'R') {
          if (data.bname) extraAddress += data.bname;
          if (data.buildingName) extraAddress += (extraAddress ? `, ${data.buildingName}` : data.buildingName);
          fullAddress += (extraAddress ? ` (${extraAddress})` : '');
        }
        setAddress(fullAddress); // 검색된 주소로 상태 업데이트
      },
    }).open();
  };

  // 4. 저장 버튼 클릭 시
  const handleSubmit = () => {
    if (!label || !address) {
      alert('주소 별명과 주소를 모두 입력해주세요.');
      return;
    }
    onComplete({ label, text: address });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">{initialData ? '주소 수정' : '새 주소 추가'}</h3>
        <div className="form-group">
          <label htmlFor="address-label">주소 별명 (예: 집, 회사)</label>
          <input
            id="address-label"
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="주소 별명을 입력하세요"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address-text">주소</label>
          <div className="address-input-group">
            <input
              id="address-text"
              type="text"
              value={address}
              readOnly
              placeholder="아래 버튼을 눌러 주소를 검색하세요"
            />
            <button onClick={handleSearch} className="address-search-button">검색</button>
          </div>
        </div>
        <div className="modal-button-group">
          <button className="modal-button secondary" onClick={onClose}>취소</button>
          <button className="modal-button primary" onClick={handleSubmit}>저장하기</button>
        </div>
      </div>
    </div>
  );
}

export default AddressModal;
