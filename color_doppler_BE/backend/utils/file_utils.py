# UUID 기반 파일명 생성, 경로 유효성 검사 등 도우미 함수
# backend/utils/file_utils.py

import os
import shutil
import uuid
from fastapi import UploadFile

TEMP_UPLOAD_DIR = "temp_uploads"
DOWNLOAD_DIR = "static/downloads"


# ▶ 업로드된 파일 저장
async def save_upload_file(file: UploadFile) -> str:
    # 고유한 파일명 생성
    ext = os.path.splitext(file.filename)[-1]
    unique_filename = f"{uuid.uuid4().hex}{ext}"
    save_path = os.path.join(TEMP_UPLOAD_DIR, unique_filename)

    # 파일 저장
    with open(save_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return unique_filename


# ▶ 다운로드 이미지 저장 경로 반환
def get_download_path(filename: str) -> str:
    return os.path.join(DOWNLOAD_DIR, filename)


# ▶ 업로드 이미지 전체 경로 반환 (for analysis)
def get_upload_path(filename: str) -> str:
    return os.path.join(TEMP_UPLOAD_DIR, filename)
