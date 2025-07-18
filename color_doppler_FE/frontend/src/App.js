import React, { useState } from 'react';
import './App.css';
import ImageUpload from './components/ImageUpload';
import ThresholdSlider from './components/ThresholdSlider';
import AnalyzeResult from './components/AnalyzeResult';
import DownloadButton from './components/DownloadButton';
import axios from 'axios';

function App() {
  const [filename, setFilename] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [threshold, setThreshold] = useState(100);
  const [v_min, setVMin] = useState(0);
  const [v_max, setVMax] = useState(255);
  const [result, setResult] = useState(null);

  // 이미지 업로드 후 파일명 저장
  const handleImageUploaded = (uploadedFilename) => {
    setFilename(uploadedFilename);
    setResult(null); // 이전 결과 초기화
  };

  // 드래그한 좌표 저장
  const handleDragAreaSelected = (area) => {
    setSelectedArea(area);
  };

  // 슬라이더 값 변경 핸들러
  const handleThresholdChange = (value) => setThreshold(value);
  const handleVMinChange = (value) => setVMin(value);
  const handleVMaxChange = (value) => setVMax(value);

  // 분석 요청
  const handleAnalyze = async () => {
    if (!filename || !selectedArea) {
      alert("Image upload and area selection are required.");
      return;
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/analyze`, {
        filename,
        threshold,
        v_min,
        v_max,
        ...selectedArea
      });
      setResult(res.data);
    } catch (err) {
      console.error("Analysis request failed:", err);
      alert("Image analysis failed.");
    }
  };

  return (
    <div className="App">
      <h2>Ultrasound Image Saturation Analysis</h2>

      <div className="container">
        {/* 왼쪽 - 이미지 업로드 */}
        <div className="left-panel">
          <ImageUpload
            onImageUploaded={handleImageUploaded}
            onDragAreaSelected={handleDragAreaSelected}
          />
        </div>

        {/* 오른쪽 - 분석 슬라이더, 결과 */}
        <div className="right-panel">
          {filename && (
            <>
              <ThresholdSlider
                threshold={threshold}
                onThresholdChange={handleThresholdChange}
                v_min={v_min}
                v_max={v_max}
                onVMinChange={handleVMinChange}
                onVMaxChange={handleVMaxChange}
              />
              <button onClick={handleAnalyze} style={{ marginTop: '20px' }}>
                Analyze
              </button>
            </>
          )}

          {result && (
            <>
              <AnalyzeResult result={result} />
              <DownloadButton url={`${process.env.REACT_APP_API_URL}${result.download_url}`} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

