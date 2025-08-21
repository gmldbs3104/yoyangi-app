// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// 각 페이지 컴포넌트를 .jsx 확장자까지 명시해서 불러옵니다.
//처음 -> 회원가입/로그인
import Splash from './pages/Splash.jsx';
import AuthChoice from './pages/AuthChoice.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';

// 요양 등급 모의 테스트
import TestStart from './pages/TestStart.jsx';
import TestQuestion from './pages/TestQuestion.jsx';

// 홈화면
import Home from './pages/Home.jsx';
import Directions from './pages/Directions.jsx';
import FacilityDetails from './pages/FacilityDetails.jsx';

// 마이페이지
import MyPage from './pages/MyPage.jsx';

// 저장목록 페이지
import Wishlist from './pages/Wishlist.jsx';

// 추천 페이지
import Recommendation from './pages/Recommendataion.jsx';

import './index.css';

// 라우터 설정
const router = createBrowserRouter([
  {
    path: '/',
    element: <Splash />,
  },
  {
    path: '/auth-choice',
    element: <AuthChoice />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/test-start',
    element: <TestStart />
  },
  {
    path: '/test-question/:questionId', 
    element: <TestQuestion />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/mypage',
    element: <MyPage />,
  },
  {
    path: '/wishlist',
    element: <Wishlist />,
  },
  {
    path: '/recommendation',
    element: <Recommendation />,
  },
  {
    path: '/directions',
    element: <Directions />,
  },
  {
    path: '/facility/:facilityId',
    element: <FacilityDetails />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
