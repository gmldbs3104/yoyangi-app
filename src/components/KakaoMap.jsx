// src/components/KakaoMap.jsx
import React, { useEffect, useRef } from 'react';

function KakaoMap({ facilities, onMarkerClick }) {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    // Vite 환경 변수에서 카카오 앱 키를 가져옵니다.
    const kakaoMapApiKey = import.meta.env.VITE_KAKAO_APP_KEY;
    
    // 이미 스크립트가 로드되었는지 확인
    if (window.kakao && window.kakao.maps) {
      initializeMap();
      return;
    }

    const script = document.createElement('script');
script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapApiKey}&libraries=services&autoload=false`; 
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        initializeMap();
      });
    };
    
    script.onerror = () => {
      console.error("카카오맵 API 스크립트를 불러오는 데 실패했습니다.");
    };

    function initializeMap() {
      if (!mapContainerRef.current) return;

      const mapOption = {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780),
        level: 8,
      };
      
      const map = new window.kakao.maps.Map(mapContainerRef.current, mapOption);

      facilities.forEach(facility => {
        const markerPosition = new window.kakao.maps.LatLng(facility.lat, facility.lng);
        
        const content = document.createElement('div');
        content.style.cursor = 'pointer';
        content.innerHTML = `<img src="${facility.markerImage}" alt="${facility.name} 마커" style="width: 45px; height: auto; filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.2));">`;
        
        content.onclick = () => onMarkerClick(facility);

        new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
          yAnchor: 1
        }).setMap(map);
      });
    }
  }, [facilities, onMarkerClick]);

  return (
    <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
  );
}

export default KakaoMap;
