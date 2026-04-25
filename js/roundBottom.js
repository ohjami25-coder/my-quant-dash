// js/roundBottom.js

export async function renderRoundBottom() {
    try {
        const response = await fetch('./round_bottom.json');
        const data = await response.json();

        const container = document.getElementById('content-area');
        if (!container) return;

        if (data.length === 0) {
            container.innerHTML = '<p>라운드바텀 패턴이 감지된 종목이 없습니다.</p>';
            return;
        }

        // 컨테이너 초기화 및 제목
        container.innerHTML = '<h2 style="margin: 20px 0;">🔄 라운드바텀 (바닥권 추세전환)</h2>';
        
        // 그리드 레이아웃 생성
        const cardGrid = document.createElement('div');
        cardGrid.className = 'card-grid';

        data.forEach(stock => {
            const card = document.createElement('div');
            card.className = 'stock-card';
            
            // 데이터 필드가 유동적이므로, 존재하는 값 위주로 카드 구성
            // 엑셀 컬럼명에 맞춰 stock['컬럼명'] 형태로 접근하세요.
            const price = stock['현재가'] || stock['종가'] || 0;
            const change = stock['수익률'] || stock['등락률'] || 0;

            card.innerHTML = `
                <div class="card-header">
                    <span class="ticker">${stock.종목코드 || 'N/A'}</span>
                    <span class="badge pattern">U-Shape</span>
                </div>
                <div class="card-body">
                    <h3 class="stock-name">${stock.종목명}</h3>
                    <div class="info-row">
                        <span>현재가</span>
                        <span class="value">${price.toLocaleString()}원</span>
                    </div>
                    <div class="info-row">
                        <span>변동폭</span>
                        <span class="value" style="color: ${change >= 0 ? '#d32f2f' : '#1976d2'}">
                            ${change >= 0 ? '▲' : '▼'} ${Math.abs(change)}%
                        </span>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="detail-btn" onclick="window.open('https://finance.naver.com/item/main.naver?code=${stock.종목코드}')">
                        네이버 증권 상세
                    </button>
                </div>
            `;
            cardGrid.appendChild(card);
        });

        container.appendChild(cardGrid);

    } catch (error) {
        console.error('RoundBottom 데이터 렌더링 실패:', error);
    }
}