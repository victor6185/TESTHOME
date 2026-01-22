# 구글 시트 연동 설정 가이드

구매대행 랜딩 페이지와 Google Sheets를 연동하여 신청 폼 데이터를 자동으로 저장하는 방법입니다.

---

## 📋 목차

1. [준비사항](#준비사항)
2. [Google Sheets 설정](#google-sheets-설정)
3. [Apps Script 코드 배포](#apps-script-코드-배포)
4. [HTML 파일 수정](#html-파일-수정)
5. [테스트](#테스트)
6. [문제 해결](#문제-해결)

---

## 📌 준비사항

- Google 계정
- 구글 시트 ID: `1fNSRGqgjYXdwPGSbJ4BK4JMFcQhiiRSP6Mj-f6mfUwE`
- 이미 생성된 파일:
  - `purchase-proxy-landing.html` (메인 랜딩 페이지)
  - `google-apps-script.js` (Apps Script 코드)

---

## 🔧 Google Sheets 설정

### 1단계: 구글 시트 열기

구글 시트에 접속합니다:
```
https://docs.google.com/spreadsheets/d/1fNSRGqgjYXdwPGSbJ4BK4JMFcQhiiRSP6Mj-f6mfUwE/edit
```

### 2단계: Apps Script 편집기 열기

1. 상단 메뉴에서 **확장 프로그램** 클릭
2. **Apps Script** 선택
3. 새 탭에서 Apps Script 편집기가 열립니다

### 3단계: 코드 붙여넣기

1. 기본으로 생성된 `Code.gs` 파일의 내용을 **전체 삭제**
2. `google-apps-script.js` 파일의 내용을 **전체 복사**하여 붙여넣기
3. **Ctrl + S** (또는 저장 아이콘)를 눌러 저장
4. 프로젝트 이름을 "구매대행 폼 API"로 변경 (선택사항)

### 4단계: 시트 초기화 (최초 1회)

1. 편집기 상단에서 함수 선택 드롭다운 클릭
2. **`setupSheet`** 함수 선택
3. **실행** 버튼 (▶️) 클릭
4. 권한 요청이 나타나면:
   - **권한 검토** 클릭
   - 본인 Google 계정 선택
   - **고급** → **안전하지 않은 페이지로 이동** 클릭
   - **허용** 클릭

> ✅ "설정 완료!" 알림이 표시되면 성공입니다.

---

## 🚀 Apps Script 코드 배포

### 1단계: 새 배포 만들기

1. Apps Script 편집기 우측 상단의 **배포** 버튼 클릭
2. **새 배포** 선택

### 2단계: 배포 설정

1. **유형 선택** 옆 톱니바퀴 아이콘 클릭
2. **웹 앱** 선택
3. 설정 입력:
   ```
   설명: 구매대행 신청 폼 API
   실행 계정: 나
   액세스 권한: 모든 사용자 ⚠️ 중요!
   ```
4. **배포** 버튼 클릭

### 3단계: 웹 앱 URL 복사

1. 배포 완료 화면에서 **웹 앱 URL** 복사
2. URL 형식 예시:
   ```
   https://script.google.com/macros/s/AKfycbz.../exec
   ```
3. 이 URL을 안전한 곳에 저장해둡니다

---

## 📝 HTML 파일 수정

### `purchase-proxy-landing.html` 수정

1. 파일을 텍스트 에디터로 엽니다
2. `submitForm` 함수에서 다음 줄을 찾습니다:

```javascript
const scriptUrl = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
```

3. **YOUR_DEPLOYMENT_ID** 부분을 실제 배포 URL로 변경합니다:

```javascript
const scriptUrl = 'https://script.google.com/macros/s/AKfycbz...실제URL.../exec';
```

4. 파일 저장 (Ctrl + S)

---

## ✅ 테스트

### 방법 1: 브라우저에서 테스트

1. `purchase-proxy-landing.html` 파일을 브라우저에서 엽니다
2. 페이지 하단의 **구매 신청 폼**으로 스크롤합니다
3. 모든 필드를 입력합니다:
   - 이름
   - 이메일
   - 전화번호
   - 구매 희망 상품
   - 상품 URL
   - 수량
   - 예산
   - 구매 국가
   - 배송 방법
   - 상세 요청사항
4. **신청하기** 버튼 클릭
5. "신청 완료!" 토스트 메시지가 나타나는지 확인

### 방법 2: Google Sheets 확인

1. 구글 시트로 돌아갑니다
2. 새로운 행이 추가되었는지 확인합니다
3. 데이터가 올바르게 저장되었는지 확인합니다

### 방법 3: Apps Script에서 테스트 데이터 추가

1. Apps Script 편집기로 돌아갑니다
2. 함수 선택: **`addTestData`**
3. **실행** 버튼 클릭
4. 구글 시트에 테스트 데이터가 추가되었는지 확인

---

## 🔍 데이터 구조

구글 시트의 각 열(Column) 구조:

| 열 | 필드명 | 설명 |
|----|--------|------|
| A | 제출시간 | 자동으로 현재 시간 기록 |
| B | 이름 | 신청자 이름 |
| C | 이메일 | 신청자 이메일 |
| D | 전화번호 | 연락처 |
| E | 구매희망상품 | 상품명 |
| F | 상품URL | 상품 링크 |
| G | 수량 | 구매 수량 |
| H | 예산 | 예산 범위 |
| I | 상세요청사항 | 추가 요청사항 |
| J | 구매국가 | 구매 국가 선택 |
| K | 배송방법 | 배송 방법 선택 |

---

## 📊 통계 확인

### Apps Script에서 통계 보기

1. Apps Script 편집기에서 함수 선택: **`getStatistics`**
2. **실행** 버튼 클릭
3. 총 신청 건수와 마지막 업데이트 시간을 확인할 수 있습니다

---

## 🛠️ 문제 해결

### 문제 1: "권한이 거부되었습니다" 오류

**원인:** Apps Script 실행 권한이 없음

**해결 방법:**
1. Apps Script 편집기에서 setupSheet 함수 실행
2. 권한 검토 → 고급 → 안전하지 않은 페이지로 이동
3. 허용 클릭

### 문제 2: 데이터가 저장되지 않음

**원인:** 배포 URL이 잘못되었거나 배포 설정 오류

**해결 방법:**
1. Apps Script에서 배포 > 배포 관리 확인
2. 웹 앱 URL이 올바른지 확인
3. 액세스 권한이 "모든 사용자"로 되어 있는지 확인
4. HTML 파일의 scriptUrl이 정확한지 확인

### 문제 3: CORS 오류

**원인:** 브라우저의 CORS 정책

**해결 방법:**
- 현재 코드는 `mode: 'no-cors'`를 사용하여 이미 해결되어 있습니다
- 그래도 오류가 발생하면 브라우저 콘솔(F12)에서 상세 오류 확인

### 문제 4: "스크립트 함수를 찾을 수 없습니다" 오류

**원인:** 코드 저장이 안 되었거나 잘못된 함수 호출

**해결 방법:**
1. Apps Script 코드를 다시 저장 (Ctrl + S)
2. 페이지 새로고침
3. 함수 이름 철자 확인

### 문제 5: 배포 URL이 작동하지 않음

**원인:** 이전 버전의 배포 URL 사용

**해결 방법:**
1. Apps Script 편집기에서 배포 > 배포 관리
2. 새 버전으로 배포
3. 최신 웹 앱 URL 복사하여 HTML 파일에 적용

---

## 🔐 보안 팁

1. **스프레드시트 공유 설정**
   - 민감한 데이터가 포함되므로 공유 설정을 "특정 사용자만"으로 제한하세요
   - 파일 > 공유 > 액세스 제한

2. **데이터 백업**
   - 주기적으로 데이터를 다운로드하여 백업하세요
   - 파일 > 다운로드 > Microsoft Excel (.xlsx)

3. **버전 관리**
   - Apps Script 코드 수정 시 새로운 버전으로 배포하세요
   - 문제 발생 시 이전 버전으로 롤백 가능

---

## 📧 이메일 알림 설정 (선택사항)

새 신청이 들어올 때 이메일로 알림을 받으려면:

1. `google-apps-script.js`의 `doPost` 함수에 다음 코드 추가:

```javascript
// 데이터 저장 후
sheet.appendRow([...]);

// 이메일 알림 전송 (선택사항)
sendEmailNotification(data);
```

2. `sendEmailNotification` 함수의 이메일 주소 수정:

```javascript
const recipient = 'your-email@example.com'; // 실제 이메일로 변경
```

3. 저장 후 재배포

---

## 📚 추가 기능

### 자동 응답 이메일

신청자에게 자동으로 확인 이메일을 보내려면:

```javascript
function sendAutoReply(data) {
  MailApp.sendEmail({
    to: data.email,
    subject: '구매대행 신청이 접수되었습니다',
    body: `안녕하세요 ${data.name}님,\n\n구매대행 신청이 성공적으로 접수되었습니다.\n빠른 시일 내에 연락드리겠습니다.\n\n감사합니다.`
  });
}
```

### Slack 알림

Slack 웹훅을 사용하여 알림을 보낼 수 있습니다:

```javascript
function sendSlackNotification(data) {
  const webhookUrl = 'YOUR_SLACK_WEBHOOK_URL';
  const message = {
    text: `🆕 새로운 구매대행 신청\n이름: ${data.name}\n상품: ${data.product}`
  };

  UrlFetchApp.fetch(webhookUrl, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(message)
  });
}
```

---

## 💡 팁

1. **데이터 필터링**: 구글 시트에서 필터 기능을 사용하여 데이터를 쉽게 정렬하고 검색할 수 있습니다.

2. **차트 생성**: 구글 시트의 차트 기능으로 신청 통계를 시각화할 수 있습니다.

3. **자동화**: Google Apps Script의 트리거 기능으로 매일/매주 통계 리포트를 자동으로 생성할 수 있습니다.

4. **데이터 검증**: Apps Script에서 이메일 형식, 전화번호 형식 등을 검증할 수 있습니다.

---

## 📞 지원

문제가 계속 발생하면:
1. 브라우저 콘솔(F12)에서 오류 메시지 확인
2. Apps Script 편집기의 실행 로그 확인 (보기 > 로그)
3. 구글 시트의 데이터 확인

---

## ✨ 완료!

이제 구매대행 랜딩 페이지가 구글 시트와 완벽하게 연동되었습니다!

모든 신청 데이터가 자동으로 구글 시트에 저장됩니다. 🎉
