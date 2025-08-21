// src/pages/MyPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import BottomNav from '../components/BottomNav.jsx';
import AddressModal from '../components/AddressModal.jsx';
import ConfirmModal from '../components/ConfirmModal.jsx';
import useAppStore from '../store';

function MyPage() {
  const { addresses, addAddress, updateAddress, removeAddress, userGrade } = useAppStore();
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const navigate = useNavigate();

  // 주소 추가/수정이 완료되었을 때 스토어 함수를 호출합니다.
  const handleAddressComplete = (newAddressData) => {
    if (addressToEdit) {
      updateAddress({ ...addressToEdit, ...newAddressData });
    } else {
      addAddress(newAddressData);
    }
    setAddressToEdit(null);
  };

  const handleAddClick = () => {
    setAddressToEdit(null);
    setIsAddressModalOpen(true);
  };

  const handleEditClick = (address) => {
    setAddressToEdit(address);
    setIsAddressModalOpen(true);
  };

  const openConfirmModal = (action) => {
    setConfirmAction(action);
  };

  const closeConfirmModal = () => {
    setConfirmAction(null);
  };

  // 확인 모달에서 '예'를 눌렀을 때 스토어 함수를 호출합니다.
  const handleConfirm = () => {
    if (!confirmAction) return;

    switch (confirmAction.type) {
      case 'deleteAddress':
        removeAddress(confirmAction.id);
        break;
      case 'logout':
        navigate('/');
        break;
      case 'deleteAccount':
        alert('안녕히 가세요');
        navigate('/');
        break;
      default:
        break;
    }
    closeConfirmModal();
  };
  
  const getConfirmMessage = () => {
    if (!confirmAction) return '';
    switch (confirmAction.type) {
      case 'deleteAddress': return '주소를 삭제하시겠습니까?';
      case 'logout': return '로그아웃 하시겠습니까?';
      case 'deleteAccount': return '회원탈퇴 하시겠습니까?';
      default: return '';
    }
  };

  return (
    <div className="mypage-container">
      <div className="mypage-content">
        <div className="profile-section">
          <div className="profile-icon-placeholder" />
          <span className="profile-name">회원명</span>
        </div>

        <div className="info-section">
          {addresses.map(addr => (
            <div key={addr.id} className="address-item">
              <div className="address-item-content">
                <p className="address-label">{addr.label}</p>
                <p className="address-text">{addr.text.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}</p>
              </div>
              <div className="address-item-buttons">
                <button onClick={() => handleEditClick(addr)} className="edit-address-button">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                <button onClick={() => openConfirmModal({ type: 'deleteAddress', id: addr.id })} className="delete-address-button">×</button>
              </div>
            </div>
          ))}
          <button className="mypage-button" onClick={handleAddClick}>
            주소 추가하기
          </button>
        </div>

        <div className="info-section">
          <h3 className="section-title">요양 등급</h3>
          <div className="grade-display">{userGrade}</div>
          <button className="mypage-button" onClick={() => navigate('/test-start')}>등급 변경하기</button>
        </div>

        <div className="info-section">
          <button className="account-action-button" onClick={() => openConfirmModal({ type: 'logout' })}>로그아웃</button>
          <button className="account-action-button" onClick={() => openConfirmModal({ type: 'deleteAccount' })}>회원탈퇴</button>
        </div>
      </div>

      <BottomNav activeTab="mypage" />

      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onComplete={handleAddressComplete}
        initialData={addressToEdit}
      />

      <ConfirmModal
        isOpen={confirmAction !== null}
        onClose={closeConfirmModal}
        onConfirm={handleConfirm}
        message={getConfirmMessage()}
      />
    </div>
  );
}

export default MyPage;
