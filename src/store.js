// src/store.js
import { create } from 'zustand';

// 초기 주소 데이터 (백엔드랑 연결시 삭제)
const initialAddresses = [
  { id: 1, label: '우리집', text: '서울 중구 필동로1길 30 (필동3가)\n294동 1029호' },
  { id: 2, label: '회사', text: '서울 강남구 테헤란로 152 (역삼동)\n강남파이낸스센터' },
];

const useAppStore = create((set) => ({
  // --- 찜 목록 상태 ---
  wishlist: [],
  addToWishlist: (facility) => set((state) => {
    const isExist = state.wishlist.some(item => item.id === facility.id);
    if (isExist) {
      alert('이미 찜한 시설입니다.');
      return state;
    }
    alert(`${facility.name}을(를) 찜 목록에 추가했습니다.`);
    return { wishlist: [...state.wishlist, facility] };
  }),
  removeFromWishlist: (facilityId) => set((state) => ({
    wishlist: state.wishlist.filter(item => item.id !== facilityId),
  })),

  // --- 사용자 등급 상태 ---
  userGrade: '미설정',
  setUserGrade: (grade) => set({ userGrade: `${grade}등급` }),

  // --- 주소 목록 상태 추가 ---
  addresses: initialAddresses,
  addAddress: (address) => set((state) => ({
    addresses: [...state.addresses, { id: Date.now(), ...address }]
  })),
  updateAddress: (updatedAddress) => set((state) => ({
    addresses: state.addresses.map(addr => 
      addr.id === updatedAddress.id ? { ...addr, ...updatedAddress } : addr
    )
  })),
  removeAddress: (addressId) => set((state) => ({
    addresses: state.addresses.filter(addr => addr.id !== addressId)
  })),
}));

export default useAppStore;
