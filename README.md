# 🌍 글로벌 구매대행 랜딩페이지 (다크모드)

BSD 스킬스(AI 챗봇 빌더 + 랜딩페이지 빌더)를 활용하여 제작한 구매대행 서비스 랜딩페이지입니다.

## ✨ 주요 기능

### 1. 다크모드 디자인
- 눈에 편안한 다크 테마 적용
- 그라디언트 효과와 글래스모피즘 디자인
- 모던하고 세련된 UI/UX

### 2. 잠재고객 데이터 수집
- 상세한 고객 정보 입력 폼
- 이름, 연락처, 이메일 수집
- 상품 URL, 카테고리, 수량 정보
- 배송 주소 및 추가 요청사항

### 3. 실시간 인기 상품 그래프
- Chart.js를 활용한 동적 바 차트
- 5초마다 자동 업데이트
- 7개 인기 상품의 실시간 신청 현황
- 인터랙티브 툴팁 제공

### 4. AI 챗봇 통합
- 24시간 실시간 상담 버튼
- Voiceflow/Chatbase 연동 준비 완료
- 상품 문의, 견적 계산, 배송 추적 지원

### 5. 반응형 디자인
- 모바일, 태블릿, 데스크톱 완벽 대응
- 터치 친화적 인터랙션
- 빠른 로딩 속도 최적화

## 🎨 디자인 특징

### 컬러 팔레트
```css
Primary Color: #6366f1 (인디고 블루)
Accent Color: #f59e0b (앰버 골드)
Background: #0f172a (딥 네이비)
Card Background: #1e293b (슬레이트 그레이)
Text Primary: #f1f5f9 (라이트 그레이)
Text Secondary: #94a3b8 (미디엄 그레이)
```

### 주요 섹션
1. **Hero Section**: 임팩트 있는 헤드라인과 CTA
2. **Stats Section**: 핵심 통계 (15,000+ 구매대행, 98.7% 만족도)
3. **Features Section**: 6가지 주요 강점 (합리적 수수료, 안전거래 등)
4. **Categories Section**: 인기 카테고리 (스니커즈, 화장품, 명품백 등)
5. **Chart Section**: 실시간 인기 상품 그래프
6. **Request Form**: 구매대행 신청 폼
7. **Footer**: 연락처 및 링크

## 📊 실시간 그래프 기능

### 표시되는 데이터
- 나이키 에어포스 (127건)
- 디올 백 (89건)
- 아이폰15 Pro (156건)
- 다이슨 청소기 (73건)
- 루이비통 지갑 (94건)
- 소니 PS5 (112건)
- 맥북 Pro (68건)

### 동작 방식
```javascript
// 5초마다 자동 업데이트
setInterval(() => {
    // -3 ~ +6 범위의 랜덤 변화
    chartData.datasets[0].data = chartData.datasets[0].data.map(value => {
        const change = Math.floor(Math.random() * 10) - 3;
        return Math.max(0, value + change);
    });
    demandChart.update();
}, 5000);
```

## 💾 데이터 수집 폼 필드

### 필수 입력 항목
- **이름**: 고객 성함
- **연락처**: 전화번호 (010-XXXX-XXXX)
- **이메일**: 연락 가능한 이메일
- **상품 URL**: 구매 희망 제품 링크
- **카테고리**: 상품 분류 (7개 옵션)
- **수량**: 주문 수량
- **상품 상세**: 옵션, 색상, 사이즈 등
- **배송 주소**: 받을 주소

### 선택 입력 항목
- **추가 요청사항**: 자유 기재

### 폼 제출 시
```javascript
function submitForm(event) {
    event.preventDefault();

    // FormData 수집
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    // 성공 메시지 표시
    successMessage.classList.add('show');

    // 폼 초기화
    event.target.reset();

    // 차트 업데이트 (신청 건수 +1)
    chartData.datasets[0].data[categoryIndex] += 1;
    demandChart.update();
}
```

## 🤖 AI 챗봇 연동 가이드

### 현재 상태
- 챗봇 버튼 UI 구현 완료
- 클릭 시 안내 메시지 표시
- Voiceflow/Chatbase 연동 준비 완료

### Voiceflow 연동 방법

1. **Voiceflow 프로젝트 생성**
   ```
   - Voiceflow.com 가입
   - 새 프로젝트 생성
   - 구매대행 챗봇 시나리오 설계
   ```

2. **대화 흐름 설계**
   ```
   [환영 인사]
   "안녕하세요! 글로벌구매대행입니다. 무엇을 도와드릴까요?"

   [메인 메뉴]
   1. 구매대행 신청
   2. 견적 문의
   3. 배송 추적
   4. 자주 묻는 질문
   ```

3. **HTML 임베드 코드 추가**
   ```html
   <script type="text/javascript">
     (function(d, t) {
         var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
         v.onload = function() {
           window.voiceflow.chat.load({
             verify: { projectID: 'YOUR_PROJECT_ID' },
             url: 'https://general-runtime.voiceflow.com',
             versionID: 'production',
             assistant: {
               stylesheet: `
                 .vfrc-chat-button {
                   display: none; /* 기존 버튼 사용 */
                 }
               `
             }
           });
         }
         v.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
         v.type = "text/javascript";
         s.parentNode.insertBefore(v, s);
     })(document, 'script');
   </script>
   ```

4. **openChat() 함수 수정**
   ```javascript
   function openChat() {
       if (window.voiceflow && window.voiceflow.chat) {
           window.voiceflow.chat.open();
       }
   }
   ```

### Chatbase 연동 방법

1. **Chatbase 프로젝트 생성**
   - Chatbase.co 가입
   - 지식베이스 업로드 (FAQ, 상품 정보 등)

2. **임베드 코드 추가**
   ```html
   <script>
     window.embeddedChatbotConfig = {
       chatbotId: "YOUR_CHATBOT_ID",
       domain: "www.chatbase.co"
     }
   </script>
   <script
     src="https://www.chatbase.co/embed.min.js"
     chatbotId="YOUR_CHATBOT_ID"
     domain="www.chatbase.co"
     defer>
   </script>
   ```

## 📱 반응형 브레이크포인트

```css
/* Mobile: 0 - 768px */
@media (max-width: 768px) {
    .hero h1 { font-size: 2rem; }
    .form-row { grid-template-columns: 1fr; }
    .nav-links { display: none; }
}

/* Tablet: 769px - 1024px */
/* Desktop: 1025px+ */
```

## 🚀 사용 방법

### 1. 파일 열기
```bash
# 브라우저에서 직접 열기
purchase-proxy-landing.html 더블 클릭

# 또는 로컬 서버 실행
python -m http.server 8000
# http://localhost:8000/purchase-proxy-landing.html 접속
```

### 2. 커스터마이징

#### 브랜드명 변경
```javascript
// Line 22-23
<div class="logo">🌍 [당신의 브랜드명]</div>
```

#### 색상 변경
```css
/* Line 13-26 */
:root {
    --primary-color: #6366f1; /* 원하는 색상으로 변경 */
    --accent-color: #f59e0b;
}
```

#### 통계 수정
```html
<!-- Line 131-149 -->
<div class="stat-number">15,000+</div>
<div class="stat-label">누적 구매대행 건수</div>
```

#### 차트 데이터 변경
```javascript
/* Line 597-599 */
labels: ['나이키 에어포스', '디올 백', ...], // 상품명 변경
data: [127, 89, 156, ...] // 초기값 변경
```

## 📈 전환율 최적화 팁

### 1. 헤드라인 A/B 테스트
```
버전 A: "세계 어디든, 원하는 상품을 빠르고 안전하게"
버전 B: "해외직구 고민 끝! 전문가가 대신 구매해드립니다"
```

### 2. CTA 문구 최적화
```
일반적: "신청하기"
개선: "지금 신청하기 →"
최적: "무료 견적 받기 (24시간 내 답변)"
```

### 3. 긴급성 추가
```html
<span style="color: #f59e0b;">⏰ 오늘 신청 시 수수료 20% 할인</span>
```

### 4. 사회적 증거 강화
```
"이번 주 327명이 신청했습니다"
"평균 ⭐4.9 / 5.0 만족도"
```

## 🔧 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, Grid, Animations
- **JavaScript (Vanilla)**: 폼 처리, 차트 업데이트
- **Chart.js v4.4.1**: 실시간 그래프
- **Google Fonts**: Pretendard 폰트

## 📦 외부 라이브러리

```html
<!-- Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>

<!-- Pretendard Font -->
<link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@400;600;700;800&display=swap" rel="stylesheet">
```

## 🎯 다음 단계 개선사항

### Phase 1: 백엔드 연동
- [ ] 폼 데이터를 DB에 저장 (Firebase, Supabase)
- [ ] 이메일 알림 자동 발송
- [ ] 관리자 대시보드 구축

### Phase 2: 챗봇 고도화
- [ ] Voiceflow 프로젝트 생성 및 연동
- [ ] FAQ 자동 응답 시스템
- [ ] 실시간 견적 계산 기능

### Phase 3: 분석 도구
- [ ] Google Analytics 연동
- [ ] 히트맵 분석 (Hotjar)
- [ ] A/B 테스트 설정

### Phase 4: 추가 기능
- [ ] 배송 추적 시스템
- [ ] 고객 후기 섹션
- [ ] 실시간 채팅 상담
- [ ] 결제 시스템 연동 (PG사)

## 📊 성과 측정 지표

### 추적해야 할 KPI
- **방문자 수**: Google Analytics
- **전환율**: 폼 제출 / 방문자
- **이탈률**: 스크롤 깊이 분석
- **평균 세션 시간**: 콘텐츠 몰입도
- **챗봇 사용률**: 클릭 / 방문자

## 💡 BSD 스킬 활용 포인트

### AI 챗봇 빌더 스킬
✅ 24/7 자동 고객 응대
✅ 리드 정보 수집
✅ FAQ 자동 응답
✅ 실시간 상담원 연결

### 랜딩페이지 빌더 스킬
✅ 전환율 최적화 구조
✅ 설득력 있는 카피라이팅
✅ 반응형 디자인
✅ 즉시 수정 가능한 코드

## 📞 문의 및 지원

프로젝트 관련 문의사항이 있으시면 언제든 연락주세요.

---

**Made with ❤️ using BSD Claude Skills**
- AI Chatbot Builder Skill
- Landing Page Builder Skill
- Powered by Claude Code

## 🎉 시작하기

1. [purchase-proxy-landing.html](purchase-proxy-landing.html) 파일을 브라우저에서 엽니다
2. 각 섹션을 확인하고 필요에 맞게 커스터마이징합니다
3. 실제 데이터 수집을 위해 백엔드를 연동합니다
4. Voiceflow/Chatbase로 AI 챗봇을 추가합니다
5. 런칭 후 지속적으로 전환율을 모니터링하고 개선합니다

**전환율 높은 랜딩페이지로 비즈니스를 성장시키세요! 🚀**