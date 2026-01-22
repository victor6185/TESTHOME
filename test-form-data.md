# 구매대행 폼 테스트 데이터

## 📋 테스트 케이스 1 - 나이키 스니커즈

```
이름: 홍길동
연락처: 010-1234-5678
이메일: hong@example.com
구매 희망 상품: 나이키 에어포스 1
상품 URL: https://www.nike.com/kr/t/air-force-1-07-shoes
수량: 1
예산: 150,000원
구매 국가: 미국
배송 방법: 항공 특송
상세 요청사항: 화이트 컬러, 270mm (US 9) 사이즈로 부탁드립니다.
```

## 📋 테스트 케이스 2 - 다이슨 청소기

```
이름: 김영희
연락처: 010-9876-5432
이메일: kim@example.com
구매 희망 상품: 다이슨 V15 디텍트
상품 URL: https://www.dyson.com/vacuum-cleaners/cordless/v15-detect
수량: 1
예산: 800,000원
구매 국가: 미국
배송 방법: 일반 항공
상세 요청사항: 한국 전압(220V) 호환 제품으로 구매 부탁드립니다.
```

## 📋 테스트 케이스 3 - 애플 에어팟

```
이름: 박철수
연락처: 010-5555-1234
이메일: park@example.com
구매 희망 상품: 애플 에어팟 프로 2세대
상품 URL: https://www.apple.com/kr/airpods-pro/
수량: 2
예산: 600,000원
구매 국가: 일본
배송 방법: 항공 특송
상세 요청사항: 2개 구매 시 할인 가능한지 확인 부탁드립니다.
```

## ✅ 예상되는 구글 시트 데이터 구조

| A | B | C | D | E | F | G | H | I | J | K |
|---|---|---|---|---|---|---|---|---|---|---|
| 제출시간 | 이름 | 이메일 | 전화번호 | 구매희망상품 | 상품URL | 수량 | 예산 | 상세요청사항 | 구매국가 | 배송방법 |
| 2025-01-15 10:30 | 홍길동 | hong@... | 010-1234-5678 | 나이키 에어포스 1 | https://... | 1 | 150,000원 | 화이트... | 미국 | 항공 특송 |
| 2025-01-15 10:35 | 김영희 | kim@... | 010-9876-5432 | 다이슨 V15 디텍트 | https://... | 1 | 800,000원 | 한국 전압... | 미국 | 일반 항공 |
| 2025-01-15 10:40 | 박철수 | park@... | 010-5555-1234 | 애플 에어팟... | https://... | 2 | 600,000원 | 2개 구매... | 일본 | 항공 특송 |

## 🔍 매칭 확인

### HTML 폼 필드 이름:
- `name` → 이름
- `phone` → 전화번호
- `email` → 이메일
- `product` → 구매 희망 상품
- `url` → 상품 URL
- `quantity` → 수량
- `budget` → 예산
- `country` → 구매 국가
- `delivery` → 배송 방법
- `message` → 상세 요청사항

### Google Apps Script 필드 매칭:
```javascript
sheet.appendRow([
  timestamp,       // A: 제출 시간 (자동)
  data.name,       // B: 이름 ✅
  data.email,      // C: 이메일 ✅
  data.phone,      // D: 전화번호 ✅
  data.product,    // E: 구매 희망 상품 ✅
  data.url,        // F: 상품 URL ✅
  data.quantity,   // G: 수량 ✅
  data.budget,     // H: 예산 ✅
  data.message,    // I: 상세 요청사항 ✅
  data.country,    // J: 구매 국가 ✅
  data.delivery    // K: 배송 방법 ✅
]);
```

## 🎯 테스트 체크리스트

- [ ] 브라우저에서 purchase-proxy-landing.html 열기
- [ ] 페이지 하단 "구매대행 신청하기" 섹션으로 스크롤
- [ ] 테스트 케이스 1 데이터 입력
- [ ] "견적 신청하기" 버튼 클릭
- [ ] 콘솔에서 "📤 데이터 전송 중" 메시지 확인
- [ ] 콘솔에서 "✅ 데이터 전송 완료" 메시지 확인
- [ ] "신청 완료!" 토스트 메시지 표시 확인
- [ ] 폼이 자동으로 초기화되는지 확인
- [ ] 구글 시트에서 새로운 행 추가 확인
- [ ] 모든 필드 데이터가 올바르게 저장되었는지 확인

## 🚨 주요 수정 사항

### 1. 폼 필드 이름 변경
- ✅ `product_url` → `url`
- ✅ `category` → 삭제 (구글 시트 구조에 없음)
- ✅ `details` → `message`
- ✅ `address` → 삭제 (구글 시트 구조에 없음)
- ✅ `notes` → 삭제
- ✅ 신규 추가: `product`, `budget`, `country`, `delivery`

### 2. demandChart 오류 수정
- ✅ 전역 변수로 선언 (`let demandChart = null`)
- ✅ null 체크 추가

### 3. 데이터 전송 확인
- ✅ `no-cors` 모드 사용 (CORS 우회)
- ✅ JSON 형식으로 전송
- ✅ Google Apps Script URL 정확히 설정

## 📝 브라우저 콘솔 확인 사항

정상 동작 시 콘솔 메시지:
```
📤 데이터 전송 중: {
  name: "홍길동",
  phone: "010-1234-5678",
  email: "hong@example.com",
  product: "나이키 에어포스 1",
  url: "https://www.nike.com/...",
  quantity: "1",
  budget: "150,000원",
  country: "미국",
  delivery: "항공 특송",
  message: "화이트 컬러, 270mm (US 9) 사이즈로 부탁드립니다."
}
✅ 데이터 전송 완료
```

## 🔗 구글 시트 확인 링크

```
https://docs.google.com/spreadsheets/d/1fNSRGqgjYXdwPGSbJ4BK4JMFcQhiiRSP6Mj-f6mfUwE/edit
```

---

모든 수정이 완료되었습니다! 이제 테스트해주세요. 🚀
