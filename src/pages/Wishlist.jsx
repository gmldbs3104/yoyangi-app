// src/pages/Wishlist.jsx
import React from 'react';
import { useNavigate  } from 'react-router-dom';
import '../App.css';
import useWishlistStore from '../store'; // 1. store를 불러옵니다.
import BottomNav from '../components/BottomNav.jsx';

function Wishlist() {
  // 2. store에서 찜 목록 데이터를 가져옵니다.
  const wishlist = useWishlistStore((state) => state.wishlist);
  const navigate = useNavigate();

  const handleItemClick = (facility) => {
    navigate(`/facility/${facility.id}`, { state: { facility: facility } });
  }

  return (
    <div className="wishlist-container">
      <h1 className="wishlist-title">찜 목록</h1>
      
      <div className="wishlist-content">
        {wishlist.length === 0 ? (
          <p className="empty-wishlist-text">요양님이 저장한 곳들이에요</p>
        ) : (
          wishlist.map(facility => (
            // 4. 각 아이템에 onClick 이벤트를 연결합니다.
            <div key={facility.id} className="wishlist-item" onClick={() => handleItemClick(facility)}>
              <div className="wishlist-item-photo" />
              <div className="wishlist-item-info">
                <h2 className="wishlist-item-name">{facility.name}</h2>
                <p className="wishlist-item-address">주소: {facility.address}</p>
                <p className="wishlist-item-distance">내 위치로부터 {facility.distance} | 예상 이동 시간: 10분</p>
                <div className="wishlist-item-tags">
                  {facility.tags.map((tag, index) => <span key={index}>{tag}</span>)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <BottomNav activeTab="wishlist" />
    </div>
  );
}

export default Wishlist;
