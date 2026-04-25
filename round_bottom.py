import pandas as pd
import os

# 1. 경로 설정
excel_file_path = r'C:\workJupyter\종합분석\월봉_라운드바닥.xlsx'
json_target_path = r'c:/workJs/js_testb/data.json'

# 2. 폴더가 없을 경우 생성 (js_testb 폴더 생성)
target_dir = os.path.dirname(json_target_path)
if not os.path.exists(target_dir):
    os.makedirs(target_dir)
    print(f"✅ 폴더 생성 완료: {target_dir}")

# 3. 엑셀 파일 읽기
try:
    # 엑셀의 첫 번째 시트를 읽어옵니다.
    df = pd.read_excel(excel_file_path, dtype={'종목코드': str})
    # df = pd.read_excel(excel_file_path)
    
    # 4. JSON 변환 및 저장
    # orient='records': 자바스크립트 배열 형태로 저장 [{col:val}, {col:val}]
    # force_ascii=False: 한글 깨짐 방지
    # double_precision=2: 사용자님의 '소수점 2자리' 규칙 적용
    df.to_json(json_target_path, orient='records', force_ascii=False, indent=4, double_precision=2)
    
    print(f"🚀 변환 성공! JSON 파일이 생성되었습니다: {json_target_path}")
    print(f"📊 총 {len(df)}개의 종목 분석 데이터가 이동되었습니다.")

except Exception as e:
    print(f"❌ 에러 발생: {e}")