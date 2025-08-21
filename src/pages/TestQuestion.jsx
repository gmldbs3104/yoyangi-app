// src/pages/TestQuestion.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import yoyangiImage from '../assets/cheese_yoyangi.png';
import RangeSlider from '../components/RangeSlider.jsx';

// 질문 유형(type)을 포함한 데이터
const quizData = [
  {
    id: 1,
    type: 'choice', // 객관식 질문
    question: "딱 맞는 요양 방법을 찾아드릴게요!",
    answers: ["며칠 이상 시설에 머물고 싶어요", "낮에만 잠시 시설에 머물고 싶어요", "집에서 돌봄 받고 싶어요", "치매 예방 활동 해보고 싶어요"],
  },
  {
    id: 2,
    type: 'range', // 범위를 선택하는 질문
    question: "원하시는 월 예산 범위를 선택해주세요.",
    min: 0,
    max: 500,
    unit: '만원',
  },
  {
    id: 3,
    type: 'choice',
    question: "두 번째 질문입니다!",
    answers: ["답변 A", "답변 B", "답변 C", "답변 D"],
  },
];

const TOTAL_QUESTIONS = quizData.length;

function TestQuestion() {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const currentQuestionIndex = parseInt(questionId, 10) - 1;
  const questionData = quizData[currentQuestionIndex];

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [rangeValue, setRangeValue] = useState([0, 500]);

  // 질문이 바뀔 때마다 선택된 답변을 초기화합니다.
  useEffect(() => {
    setSelectedAnswer(null);
    // 현재 질문이 범위 선택형이면, 상태를 기본값으로 초기화합니다.
    if (questionData?.type === 'range') {
      setRangeValue([questionData.min, questionData.max]);
    }
  }, [questionId, questionData]);

  const handleNext = () => {
    if (questionData.type === 'choice' && selectedAnswer === null) {
      alert("답변을 선택해주세요!");
      return;
    }
    
    // 선택된 값을 확인하기 위한 console.log (오류 해결용)
    if (questionData.type === 'range') {
      console.log('선택된 예산 범위:', rangeValue);
    } else {
      console.log('선택된 답변:', selectedAnswer);
    }

    const nextQuestionId = parseInt(questionId, 10) + 1;
    if (nextQuestionId > TOTAL_QUESTIONS) {
      navigate('/recommendation');
    } else {
      navigate(`/test-question/${nextQuestionId}`);
    }
  };
  
  const handleBack = () => navigate(-1);

  const renderAnswerSection = () => {
    if (!questionData) return null;

    switch (questionData.type) {
      case 'choice':
        return (
          <div className="answer-options">
            {questionData.answers.map((answer, index) => (
              <button
                key={index}
                className={`answer-button ${selectedAnswer === index ? 'selected' : ''}`}
                onClick={() => setSelectedAnswer(index)}
              >
                {answer}
              </button>
            ))}
          </div>
        );
      case 'range':
        return (
          <RangeSlider
            min={questionData.min}
            max={questionData.max}
            unit={questionData.unit}
            onChange={setRangeValue}
          />
        );
      default:
        return null;
    }
  };

  if (!questionData) return <div>잘못된 질문 번호입니다.</div>;

  return (
    <div className="container">
      <div className="quiz-nav">
        <button onClick={handleBack} className="back-button">‹</button>
        <div className="progress-bar-container">
          <div 
            className="progress-bar" 
            style={{ width: `${((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100}%` }}
          />
        </div>
        <span>{currentQuestionIndex + 1}/{TOTAL_QUESTIONS}</span>
      </div>

      <img src={yoyangiImage} alt="요양이 캐릭터" className="profile-image" style={{ margin: '20px 0' }} />
      <div className="speech-bubble">{questionData.question}</div>
      
      {renderAnswerSection()}

      <button onClick={handleNext} className="test-button primary" style={{ marginTop: 'auto' }}>
        다음
      </button>
    </div>
  );
}

export default TestQuestion;
