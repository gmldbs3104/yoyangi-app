// src/components/BottomNav.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

// 아이콘 SVG 정의
const HomeIcon = () => <svg width="35" height="35" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg>;
const SearchIcon = () => <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
// 1. 아이콘을 별 모양으로 변경
const StarIcon = () => <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const ProfileIcon = () => <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;

// activeTab prop을 받아서 현재 어떤 페이지에 있는지 표시합니다.
function BottomNav({ activeTab }) {
  const navigate = useNavigate();

  return (
    <div className="bottom-nav">
      <button className={`nav-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => navigate('/home')}>
        <HomeIcon />
        <span>홈</span>
      </button>
      <button className={`nav-item ${activeTab === 'search' ? 'active' : ''}`} onClick={() => navigate('/recommendation')}>
        <SearchIcon />
        <span>시설 추천</span>
      </button>
      {/* 2. '요양가이드'를 '찜 목록'으로 변경 */}
      <button className={`nav-item ${activeTab === 'wishlist' ? 'active' : ''}`} onClick={() => navigate('/wishlist')}>
        <StarIcon />
        <span>저장 목록</span>
      </button>
      <button className={`nav-item ${activeTab === 'mypage' ? 'active' : ''}`} onClick={() => navigate('/mypage')}>
        <ProfileIcon />
        <span>마이페이지</span>
      </button>
    </div>
  );
}

export default BottomNav;
