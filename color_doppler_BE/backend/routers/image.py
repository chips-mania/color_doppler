# 이미지 업로드, 분석, 다운로드 API 정의
# backend/routers/image.py

from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from models.schemas import AnalyzeRequest, AnalyzeResponse
from services.image_processing import analyze_image
from utils.file_utils import save_upload_file, get_download_path
import os

router = APIRouter()


# 1. 이미지 업로드
@router.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    saved_filename = await save_upload_file(file)
    return {"filename": saved_filename}


# 2. 이미지 분석
@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze(request: AnalyzeRequest):
    result = analyze_image(
    filename=request.filename,
    x=request.x,
    y=request.y,
    width=request.width,
    height=request.height,
    threshold=request.threshold,
    v_min=request.v_min,
    v_max=request.v_max
)
    if result is None:
        raise HTTPException(status_code=400, detail="이미지 분석 실패")
    return result


# 3. 이미지 다운로드
@router.get("/download/{filename}")
def download_result_image(filename: str):
    file_path = get_download_path(filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="파일을 찾을 수 없습니다.")
    return FileResponse(path=file_path, filename=filename, media_type='image/png')
