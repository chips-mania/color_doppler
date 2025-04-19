// frontend/src/components/AnalyzeResult.js

import React from 'react';

const AnalyzeResult = ({ result }) => {
  return (
    <div style={{ marginTop: '40px' }}>
      <h3 style={{ fontSize: '30px' }}>📊 분석 결과</h3>
      <p><strong>이미지 파일:</strong> {result.image_file}</p>
      <p><strong>선택 영역 픽셀 수:</strong> {result.selected_area_pixels}</p>
      <p><strong>채도 기준 만족 픽셀 수:</strong> {result.satisfied_pixels}</p>
      <p><strong>만족 비율:</strong> {result.satisfied_pixel_ratio}%</p>

      <div style={{ marginTop: '40px' }}>
        <h4 style={{ fontSize: '30px' }}>🎨 추출 이미지</h4>
        <img
        src={`${process.env.REACT_APP_API_URL}${result.download_url}?t=${Date.now()}`}
        alt="추출 이미지"
        style={{ maxWidth: '150%', border: '1px solid #ccc' }}
        />
      </div>
    </div>
  );
};

export default AnalyzeResult;
