// js/lowDebt.js

export async function renderLowDebt() {
    try {
        const response = await fetch('./low_netDebt.json');
        if (!response.ok) throw new Error('데이터를 불러올 수 없습니다.');
        
        const data = await response.json();

        const container = document.getElementById('content-area');
        if (!container) return;

        if (data.length === 0) {
            container.innerHTML = '<p>순부채비율 조건을 만족하는 우량 종목이 없습니다.</p>';
            return;
        }

        // 컨테이너 제목 설정
        container.innerHTML = '<h2 style="margin: 20px 0;">💎 재무 우량주 (현금 부자 종목)</h2>';
        
        // 그리드 레이아웃 생성
        const cardGrid = document.createElement('div');
        cardGrid.className = 'card-grid';

        data.forEach(stock => {
            const card = document.createElement('div');
            card.className = 'stock-card';
            
            // 엑셀/JSON 필드명 확인: '순부채비율(최근)', '현재가' 등
            // 마이너스 값은 현금이 부채보다 많은 상태를 의미
            const netDebtRatio = stock['순부채비율(최근)'] || 0;
            const price = stock['현재가'] || 0;

            card.innerHTML = `
                <div class="card-header">
                    <span class="ticker">${stock.종목코드}</span>
                    <span class="badge safe">Net Cash</span>
                </div>
                <div class="card-body">
                    <h3 class="stock-name">${stock.종목명}</h3>
                    <div class="info-row">
                        <span>현재가</span>
                        <span class="info-value">${price.toLocaleString()}원</span>
                    </div>
                    <div class="info-row">
                        <span>순부채비율</span>
                        <span class="info-value" style="color: ${netDebtRatio < 0 ? '#2f855a' : '#2d3748'}">
                            ${netDebtRatio.toLocaleString()}%
                        </span>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="detail-btn" onclick="window.open('https://finance.naver.com/item/main.naver?code=${stock.종목코드}')">
                        재무제표 및 기업분석
                    </button>
                </div>
            `;
            cardGrid.appendChild(card);
        });

        container.appendChild(cardGrid);

    } catch (error) {
        console.error('LowDebt 데이터 렌더링 실패:', error);
        document.getElementById('content-area').innerHTML = '<p>데이터를 불러오는 중 오류가 발생했습니다.</p>';
    }
}