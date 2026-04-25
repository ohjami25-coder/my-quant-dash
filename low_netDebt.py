import pandas as pd
import json
import os

# 1. 경로 설정
excel_file_path = r'C:\workJupyter\종합분석\ks_낮은순부채비율.xlsx'
json_target_path = r'c:/workJs/js_testb/low_netDebt.json'

def export_low_debt_to_json():
    try:
        # 2. 엑셀 파일 읽기 (종목코드 문자열 유지)
        df = pd.read_excel(excel_file_path, dtype={'종목코드': str})

        # 3. 필터링 조건 추가: 순부채비율(최근) < 0
        # 엑셀의 컬럼명이 '순부채비율(최근)'이라고 가정합니다.
        if '순부채비율(최근)' in df.columns:
            df = df[df['순부채비율(최근)'] < 0]
        else:
            print("경고: '순부채비율(최근)' 컬럼을 찾을 수 없습니다. 원본 데이터를 유지합니다.")

        # 4. 데이터 정제 (소수점 2자리)
        df = df.round(2)

        # 5. JSON 변환 (자바스크립트 배열 형식)
        json_data = df.to_json(orient='records', force_ascii=False, indent=4)

        # 6. 폴더 생성 및 저장
        target_dir = os.path.dirname(json_target_path)
        if not os.path.exists(target_dir):
            os.makedirs(target_dir)

        with open(json_target_path, 'w', encoding='utf-8') as f:
            f.write(json_data)

        print(f"성공: {json_target_path} 파일이 생성되었습니다.")
        print(f"순부채비율 0 미만 종목 수: {len(df)}개")

    except Exception as e:
        print(f"오류 발생: {e}")

if __name__ == "__main__":
    export_low_debt_to_json()