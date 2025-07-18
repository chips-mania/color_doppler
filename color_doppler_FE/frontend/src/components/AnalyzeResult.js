// frontend/src/components/AnalyzeResult.js

import React from 'react';

const AnalyzeResult = ({ result }) => {
  return (
    <div style={{ marginTop: '40px' }}>
      <h3 style={{ fontSize: '30px', marginBottom: '5px' }}>Analysis Results</h3>
      <p><strong>Number of pixels in selected region:</strong> {result.selected_area_pixels}</p>
      <p><strong>Number of pixels meeting saturation criteria:</strong> {result.satisfied_pixels}</p>
      <p><strong>Satisfaction ratio:</strong> {result.satisfied_pixel_ratio}%</p>

      <div style={{ marginTop: '10px' }}>
        <h4 style={{ fontSize: '30px', marginBottom: '5px' }}>Extracted image</h4>
        <img
        src={`${process.env.REACT_APP_API_URL}${result.download_url}?t=${Date.now()}`}
        alt="Extracted image"
        style={{ maxWidth: '150%', border: '1px solid #ccc' }}
        />
      </div>
    </div>
  );
};

export default AnalyzeResult;
