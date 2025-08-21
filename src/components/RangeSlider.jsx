// src/components/RangeSlider.jsx
import React, { useCallback, useEffect, useState, useRef } from 'react';
import '../App.css';

function RangeSlider({ min, max, onChange, unit }) {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  const getPercent = useCallback((value) =>
    Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, getPercent]);

  useEffect(() => {
    onChange([minVal, maxVal]);
  }, [minVal, maxVal, onChange]);

  return (
    <div className="slider-container">
      <div className="slider-value-display">
        {minVal}{unit} ~ {maxVal}{unit}
      </div>
      <div className="range-slider-wrapper">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            minValRef.current = value;
          }}
          className="thumb thumb-left"
          style={{ zIndex: minVal > max - 100 && "5" }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value);
            maxValRef.current = value;
          }}
          className="thumb thumb-right"
        />

        <div className="slider-track-container">
          <div className="slider-track" />
          <div ref={range} className="slider-range" />
        </div>
      </div>
       <div className="slider-labels">
          <span>{min}{unit}</span>
          <span>{max}{unit}</span>
      </div>
    </div>
  );
}

export default RangeSlider;
