import cv2
import os
import numpy as np
import logging
from utils.file_utils import get_upload_path, get_download_path
from models.schemas import AnalyzeResponse

logger = logging.getLogger(__name__)  # 현재 모듈에 맞는 로거 생성

def analyze_image(
    filename: str,
    x: int,
    y: int,
    width: int,
    height: int,
    threshold: int,
    v_min: int,
    v_max: int
):
    print('a')
    logger.info("📌 analyze_image() 시작됨")
    logger.debug(f"파라미터: filename={filename}, x={x}, y={y}, width={width}, height={height}, "
                 f"threshold={threshold}, v_min={v_min}, v_max={v_max}")

    image_path = get_upload_path(filename)
    img = cv2.imread(image_path, cv2.IMREAD_COLOR)

    if img is None:
        logger.error(f"[오류] 이미지 파일을 찾을 수 없음: {image_path}")
        return None

    height_img, width_img, _ = img.shape

    x_end = min(x + width, width_img)
    y_end = min(y + height, height_img)
    x = max(0, x)
    y = max(0, y)

    if x >= x_end or y >= y_end:
        logger.warning(f"[오류] 잘못된 드래그 범위: x={x}, x_end={x_end}, y={y}, y_end={y_end}")
        return None

    #강제 지정
    v_min = 80  
    v_max = 240

    roi = img[y:y_end, x:x_end]
    hsv_roi = cv2.cvtColor(roi, cv2.COLOR_BGR2HSV)
    h, s, v = cv2.split(hsv_roi)

    mask = np.logical_and(
        np.logical_and(s >= threshold, v >= v_min),
        v <= v_max
    )

    satisfied_pixels = int(np.sum(mask))
    total_pixels = mask.size
    pixel_ratio = round(100 * satisfied_pixels / total_pixels, 2)

    logger.info(f"✅ 조건 만족 픽셀 수: {satisfied_pixels} / {total_pixels} ({pixel_ratio}%)")

    roi_rgba = cv2.cvtColor(roi, cv2.COLOR_BGR2BGRA)
    roi_rgba[~mask] = [0, 0, 0, 0]

    result_filename = f"result_{filename.rsplit('.', 1)[0]}.png"
    result_path = get_download_path(result_filename)

    cv2.imwrite(result_path, roi_rgba)

    return AnalyzeResponse(
        image_file=filename,
        selected_area_pixels=total_pixels,
        satisfied_pixels=satisfied_pixels,
        satisfied_pixel_ratio=pixel_ratio,
        download_url=f"/static/downloads/{result_filename}"
    )


