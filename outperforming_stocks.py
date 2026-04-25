import pandas as pd
import json
import os

# 1. 경로 설정
excel_file_path = r'C:\workJupyter\종합분석\시장보다강한종목.xlsx'
json_target_path = r'c:/workJs/js_testb/outperforming_stocks.json'

def export_market_strength_to_json():
    try:
        # 2. 엑셀 파일 읽기
        # '시장보다강한종목.xlsx' 파일을 데이터프레임으로 로드
        df = pd.read_excel(excel_file_path, dtype={'종목코드': str})

        # 3. 데이터 정제 (소수점 2자리 설정)
        # 수치형 데이터만 골라서 소수점 2자리로 반올림
        df = df.round(2)

        # 4. JSON 변환
        # orient='records'는 [ {col1:val1, col2:val2}, ... ] 형식을 만듭니다.
        # force_ascii=False를 해야 한글이 깨지지 않고 그대로 저장됩니다.
        json_data = df.to_json(orient='records', force_ascii=False, indent=4)

        # 5. 대상 폴더가 없으면 생성
        target_dir = os.path.dirname(json_target_path)
        if not os.path.exists(target_dir):
            os.makedirs(target_dir)

        # 6. 파일 저장
        with open(json_target_path, 'w', encoding='utf-8') as f:
            f.write(json_data)

        print(f"성공: {json_target_path} 파일이 생성되었습니다.")
        print(f"총 {len(df)}개의 종목 데이터가 포함되었습니다.")

    except Exception as e:
        print(f"오류 발생: {e}")

if __name__ == "__main__":
    export_market_strength_to_json()