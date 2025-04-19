# backend/main.py
# FastAPI 앱 실행, 라우터 등록

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import image
from fastapi.staticfiles import StaticFiles
import os


app = FastAPI()

# CORS 설정 (React 개발 서버가 기본적으로 3000번 포트를 사용함)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 이미지 관련 라우터 등록
app.include_router(image.router)




# temp_uploads 폴더가 없다면 생성
os.makedirs("temp_uploads", exist_ok=True)
os.makedirs("static/downloads", exist_ok=True)

# 정적 파일 경로 등록 (원본 이미지 미리보기용)
app.mount("/temp_uploads", StaticFiles(directory="temp_uploads"), name="temp_uploads")

# 다운로드 이미지 미리보기용
app.mount("/static/downloads", StaticFiles(directory="static/downloads"), name="downloads")




# ✅ CORS 미들웨어 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 Origin 허용 (개발용)
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드 허용 (GET, POST 등)
    allow_headers=["*"],  # 모든 헤더 허용
)
