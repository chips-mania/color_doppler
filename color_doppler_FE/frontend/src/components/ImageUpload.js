// frontend/src/components/ImageUpload.js

import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

const ImageUpload = ({ onImageUploaded, onDragAreaSelected }) => {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  // 드래그 상태
  const [isDragging, setIsDragging] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });

  // 이미지 업로드 핸들러
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 백엔드에 업로드
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, formData);
      const filename = res.data.filename;
      onImageUploaded(filename); // 부모 컴포넌트에 전달

      // 이미지 객체로 로딩
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setCanvasSize({ width: img.width, height: img.height });
        setImage(img);
      };
    } catch (err) {
      console.error("이미지 업로드 실패:", err);
    }
  };

  // 캔버스에 이미지 및 드래그 박스 그리기
  useEffect(() => {
    if (!image || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');

    // 이미지 렌더링
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    ctx.drawImage(image, 0, 0);

    // 드래그 영역 표시
    if (isDragging || (startPoint.x !== endPoint.x && startPoint.y !== endPoint.y)) {
      const rectX = Math.min(startPoint.x, endPoint.x);
      const rectY = Math.min(startPoint.y, endPoint.y);
      const rectW = Math.abs(startPoint.x - endPoint.x);
      const rectH = Math.abs(startPoint.y - endPoint.y);

      ctx.fillStyle = 'rgba(0, 128, 255, 0.3)';
      ctx.fillRect(rectX, rectY, rectW, rectH);
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 2;
      ctx.strokeRect(rectX, rectY, rectW, rectH);
    }
  }, [image, canvasSize, isDragging, startPoint, endPoint]);

  // 마우스 이벤트
  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    setStartPoint({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setEndPoint({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const rect = canvasRef.current.getBoundingClientRect();
    setEndPoint({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    const rectX = Math.min(startPoint.x, endPoint.x);
    const rectY = Math.min(startPoint.y, endPoint.y);
    const rectW = Math.abs(startPoint.x - endPoint.x);
    const rectH = Math.abs(startPoint.y - endPoint.y);

    // 부모 컴포넌트에 선택 영역 전달
    onDragAreaSelected({
      x: Math.floor(rectX),
      y: Math.floor(rectY),
      width: Math.floor(rectW),
      height: Math.floor(rectH)
    });
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <br /><br />
      {image && (
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          style={{ border: '1px solid #aaa', cursor: 'crosshair' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      )}
    </div>
  );
};

export default ImageUpload;
