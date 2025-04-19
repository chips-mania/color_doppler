# 업로드, 분석 요청/응답에 사용할 Pydantic 모델 정의
# backend/models/schemas.py

from pydantic import BaseModel

# ▶ 분석 요청에 필요한 정보 (프론트에서 보내는 데이터)
class AnalyzeRequest(BaseModel):
    filename: str                  # 업로드된 이미지 파일명
    x: int                         # 드래그 영역의 시작 X 좌표
    y: int                         # 드래그 영역의 시작 Y 좌표
    width: int                     # 드래그한 영역의 너비
    height: int                    # 드래그한 영역의 높이
    threshold: int                 # 사용자 설정 채도 임계값
    v_min: int             # 최소 밝기
    v_max: int             # 최대 밝기

# ▶ 분석 결과 응답 (프론트로 보내줄 JSON)
class AnalyzeResponse(BaseModel):
    image_file: str
    selected_area_pixels: int
    satisfied_pixels: int
    satisfied_pixel_ratio: float
    download_url: str              # 추출 이미지 다운로드 경로
    
