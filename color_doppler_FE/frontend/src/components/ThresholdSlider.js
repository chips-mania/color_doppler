// frontend/src/components/ThresholdSlider.js

import React from 'react';

const ThresholdSlider = ({ threshold, onThresholdChange, v_min, v_max, onVMinChange, onVMaxChange }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <div>
        <label>
          채도 기준 (S): <strong>{threshold}</strong>
        </label>
        <br />
        <input
          type="range"
          min="0"
          max="255"
          value={threshold}
          onChange={(e) => onThresholdChange(parseInt(e.target.value))}
          style={{ width: '300px' }}
        />
      </div>

      {/* <div style={{ marginTop: '20px' }}>
        <label>
          최소 밝기 (V Min): <strong>{v_min}</strong>
        </label>
        <br />
        <input
          type="range"
          min="0"
          max="255"
          value={v_min}
          onChange={(e) => onVMinChange(parseInt(e.target.value))}
          style={{ width: '300px' }}
        />
      </div> */}

      {/* <div style={{ marginTop: '20px' }}>
        <label>
          최대 밝기 (V Max): <strong>{v_max}</strong>
        </label>
        <br />
        <input
          type="range"
          min="0"
          max="255"
          value={v_max}
          onChange={(e) => onVMaxChange(parseInt(e.target.value))}
          style={{ width: '300px' }}
        />
      </div> */}
    </div>
  );
};

export default ThresholdSlider;


