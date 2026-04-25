// js/outperforming.js

export async function renderOutperforming() {
    try {
        const response = await fetch('./outperforming_stocks.json');
        if (!response.ok) throw new Error('데이터를 불러올 수 없습니다.');
        
        const data = await response.json();

        const container = document.getElementById('content-area');
        if (!container) return;

        if (data.length === 0) {
            container.innerHTML = '<p>현재 시장보다 강한 종목 데이터가 없습니다.</p>';
            return;
        }

        // 컨테이너 제목 설정
        container.innerHTML = '<h2 style="margin: 20px 0;">🔥 시장 주도주 (Market Outperformers)</h2>';
        
        // 그리드 레이아웃 생성
        const cardGrid = document.createElement('div');
        cardGrid.className = 'card-grid';

        data.forEach(stock => {
            const card = document.createElement('div');
            card.className = 'stock-card';
            
            // 엑셀에서 넘어온 필드명 확인 필요 (예: '상대강도', '수익률', '현재가')
            const price = stock['현재가'] || 0;
            const strength = stock['상대강도'] || stock['수익률'] || 0;

            card.innerHTML = `
                <div class="card-header">
                    <span class="ticker">${stock.종목코드}</span>
                    <span class="badge strong">Leader</span>
                </div>
                <div class="card-body">
                    <h3 class="stock-name">${stock.종목명}</h3>
                    <div class="info-row">
                        <span>현재가</span>
                        <span class="info-value">${price.toLocaleString()}원</span>
                    </div>
                    <div class="info-row">
                        <span>시장대비 강세</span>
                        <span class="info-value" style="color: #2b6cb0;">
                             +${strength}%
                        </span>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="detail-btn" onclick="window.open('https://finance.naver.com/item/main.naver?code=${stock.종목코드}')">
                        차트 및 수급 확인
                    </button>
                </div>
            `;
            cardGrid.appendChild(card);
        });

        container.appendChild(cardGrid);

    } catch (error) {
        console.error('Outperforming 데이터 렌더링 실패:', error);
        document.getElementById('content-area').innerHTML = '<p>데이터 로딩 중 오류가 발생했습니다.</p>';
    }
}