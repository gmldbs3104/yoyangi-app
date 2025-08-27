// src/store.js
import { create } from 'zustand';

// 초기 주소 데이터 (백엔드랑 연결시 삭제)
const initialAddresses = [
  { id: 1, label: '우리집', text: '서울 중구 필동로1길 30 (필동3가)\n294동 1029호' },
  { id: 2, label: '회사', text: '서울 강남구 테헤란로 152 (역삼동)\n강남파이낸스센터' },
];

/** 찜(Wishlist) 관련 상태와 액션을 관리하는 슬라이스 */
const createWishlistSlice = (set, get) => ({
  wishlist: [],
  addToWishlist: (facility) => {
    const isExist = get().wishlist.some(item => item.id === facility.id);
    if (isExist) {
      return false; 
    }
    set((state) => ({ wishlist: [...state.wishlist, facility] }));
    return true; 
  },
  removeFromWishlist: (facilityId) => {
    set((state) => ({
      wishlist: state.wishlist.filter(item => item.id !== facilityId),
    }));
  },
});

/** 사용자 정보(User) 관련 상태와 액션을 관리하는 슬라이스 */
const createUserSlice = (set) => ({
  userName: '회원명',
  userGrade: '미설정',
  setUserName: (name) => set({ userName: name }), // 쉼표 추가된 부분
  setUserGrade: (grade) => set({ userGrade: `${grade}등급` }),
});

/** 주소(Address) 관련 상태와 액션을 관리하는 슬라이스 */
const createAddressSlice = (set) => ({
  addresses: initialAddresses,
  addAddress: (address) => {
    set((state) => ({
      addresses: [...state.addresses, { id: Date.now(), ...address }],
    }));
  },
  updateAddress: (updatedAddress) => {
    set((state) => ({
      addresses: state.addresses.map(addr =>
        addr.id === updatedAddress.id ? { ...addr, ...updatedAddress } : addr
      ),
    }));
  },
  removeAddress: (addressId) => {
    set((state) => ({
      addresses: state.addresses.filter(addr => addr.id !== addressId),
    }));
  },
});

// 각각의 슬라이스를 하나로 합쳐서 스토어를 생성
const useAppStore = create((set, get) => ({
  ...createWishlistSlice(set, get),
  ...createUserSlice(set, get),
  ...createAddressSlice(set, get),
}));

export default useAppStore;