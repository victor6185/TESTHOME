/**
 * Google Apps Script for Purchase Proxy Landing Page
 * 구매대행 랜딩 페이지 - 구글 시트 연동 스크립트
 *
 * 사용 방법:
 * 1. Google Sheets에서 확장 프로그램 > Apps Script 열기
 * 2. 이 코드 전체를 복사하여 붙여넣기
 * 3. setupSheet() 함수를 실행하여 시트 초기화 (최초 1회)
 * 4. 배포 > 새 배포 > 웹 앱으로 배포
 * 5. 액세스 권한: "모든 사용자"로 설정
 * 6. 배포 URL을 HTML 파일의 scriptUrl에 입력
 */

// ==================== 설정 ====================
const SPREADSHEET_ID = '1fNSRGqgjYXdwPGSbJ4BK4JMFcQhiiRSP6Mj-f6mfUwE';

// ==================== POST 요청 처리 ====================
/**
 * POST 요청을 처리하여 폼 데이터를 구글 시트에 저장
 * @param {Object} e - POST 이벤트 객체
 * @returns {TextOutput} JSON 응답
 */
function doPost(e) {
  try {
    // 스프레드시트 ID로 시트 열기
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();

    // POST 요청에서 데이터 파싱
    const data = JSON.parse(e.postData.contents);

    // 현재 시간
    const timestamp = new Date();

    // 시트에 데이터 추가 (A열부터 시작)
    sheet.appendRow([
      timestamp,                    // A: 제출 시간
      data.name || '',              // B: 이름
      data.email || '',             // C: 이메일
      data.phone || '',             // D: 전화번호
      data.product || '',           // E: 구매 희망 상품
      data.url || '',               // F: 상품 URL
      data.quantity || '',          // G: 수량
      data.budget || '',            // H: 예산
      data.message || '',           // I: 상세 요청사항
      data.country || '',           // J: 구매 국가
      data.delivery || ''           // K: 배송 방법
    ]);

    // 로그 기록
    Logger.log('✅ 데이터 저장 성공: ' + data.name + ' (' + data.email + ')');

    // 성공 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        'success': true,
        'message': '신청이 성공적으로 접수되었습니다!',
        'timestamp': timestamp.toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // 에러 로그
    Logger.log('❌ 오류 발생: ' + error.toString());

    // 에러 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        'success': false,
        'message': '오류가 발생했습니다: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ==================== GET 요청 처리 (테스트용) ====================
/**
 * GET 요청을 처리 (API 상태 확인용)
 * @param {Object} e - GET 이벤트 객체
 * @returns {TextOutput} JSON 응답
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      'status': 'API is running',
      'message': 'Use POST method to submit data',
      'version': '1.0.0',
      'spreadsheet_id': SPREADSHEET_ID
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ==================== 시트 초기 설정 ====================
/**
 * 시트 초기 설정 함수 (최초 1회 실행)
 * - 헤더 행 생성
 * - 스타일 적용
 * - 열 너비 자동 조정
 */
function setupSheet() {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();

    // 헤더 행 설정
    const headers = [
      '제출시간',
      '이름',
      '이메일',
      '전화번호',
      '구매희망상품',
      '상품URL',
      '수량',
      '예산',
      '상세요청사항',
      '구매국가',
      '배송방법'
    ];

    // 첫 번째 행에 헤더 추가
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

    // 헤더 스타일 설정
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange
      .setBackground('#3b82f6')           // 파란색 배경
      .setFontColor('#ffffff')             // 흰색 글자
      .setFontWeight('bold')               // 굵게
      .setHorizontalAlignment('center')    // 가운데 정렬
      .setVerticalAlignment('middle')      // 세로 가운데 정렬
      .setFontSize(11);

    // 행 높이 설정
    sheet.setRowHeight(1, 35);

    // 열 너비 자동 조정
    for (let i = 1; i <= headers.length; i++) {
      sheet.autoResizeColumn(i);
    }

    // 열 너비 최소값 설정 (너무 좁아지지 않도록)
    sheet.setColumnWidth(1, 150);  // 제출시간
    sheet.setColumnWidth(2, 100);  // 이름
    sheet.setColumnWidth(3, 200);  // 이메일
    sheet.setColumnWidth(4, 120);  // 전화번호
    sheet.setColumnWidth(5, 250);  // 구매희망상품
    sheet.setColumnWidth(6, 400);  // 상품URL
    sheet.setColumnWidth(7, 80);   // 수량
    sheet.setColumnWidth(8, 100);  // 예산
    sheet.setColumnWidth(9, 300);  // 상세요청사항
    sheet.setColumnWidth(10, 100); // 구매국가
    sheet.setColumnWidth(11, 100); // 배송방법

    // 첫 번째 행 고정 (스크롤 시 헤더 고정)
    sheet.setFrozenRows(1);

    Logger.log('✅ 시트 설정 완료!');

    // 브라우저에 알림 표시
    SpreadsheetApp.getUi().alert(
      '설정 완료!',
      '시트가 성공적으로 설정되었습니다.\n이제 웹 앱으로 배포하세요.',
      SpreadsheetApp.getUi().ButtonSet.OK
    );

  } catch (error) {
    Logger.log('❌ 시트 설정 오류: ' + error.toString());
    SpreadsheetApp.getUi().alert(
      '오류 발생',
      '시트 설정 중 오류가 발생했습니다:\n' + error.toString(),
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  }
}

// ==================== 데이터 통계 함수 ====================
/**
 * 저장된 데이터 통계 확인
 */
function getStatistics() {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    const lastRow = sheet.getLastRow();

    if (lastRow <= 1) {
      Logger.log('📊 저장된 데이터가 없습니다.');
      return;
    }

    const totalEntries = lastRow - 1; // 헤더 제외

    Logger.log('📊 통계 정보:');
    Logger.log('- 총 신청 건수: ' + totalEntries + '건');
    Logger.log('- 마지막 업데이트: ' + new Date().toLocaleString('ko-KR'));

    // 브라우저에 알림 표시
    SpreadsheetApp.getUi().alert(
      '통계 정보',
      '총 신청 건수: ' + totalEntries + '건\n마지막 업데이트: ' + new Date().toLocaleString('ko-KR'),
      SpreadsheetApp.getUi().ButtonSet.OK
    );

  } catch (error) {
    Logger.log('❌ 통계 조회 오류: ' + error.toString());
  }
}

// ==================== 테스트 데이터 추가 ====================
/**
 * 테스트 데이터를 추가하는 함수 (개발/테스트용)
 */
function addTestData() {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();

    const testData = [
      new Date(),
      '홍길동',
      'test@example.com',
      '010-1234-5678',
      '나이키 에어포스 1',
      'https://www.nike.com/kr/t/air-force-1-07-shoes',
      '1',
      '100,000원',
      '화이트 컬러로 구매 부탁드립니다.',
      '미국',
      '항공 특송'
    ];

    sheet.appendRow(testData);

    Logger.log('✅ 테스트 데이터 추가 완료!');
    SpreadsheetApp.getUi().alert(
      '완료',
      '테스트 데이터가 추가되었습니다.',
      SpreadsheetApp.getUi().ButtonSet.OK
    );

  } catch (error) {
    Logger.log('❌ 테스트 데이터 추가 오류: ' + error.toString());
  }
}

// ==================== 이메일 알림 (선택사항) ====================
/**
 * 새로운 신청이 들어올 때 이메일로 알림 전송
 * @param {Object} data - 폼 데이터
 */
function sendEmailNotification(data) {
  try {
    const recipient = 'your-email@example.com'; // 여기에 받을 이메일 주소 입력
    const subject = '[구매대행 신청] ' + data.name + '님의 신청';
    const body = `
새로운 구매대행 신청이 접수되었습니다.

📋 신청 정보:
- 이름: ${data.name}
- 이메일: ${data.email}
- 전화번호: ${data.phone}
- 구매 희망 상품: ${data.product}
- 상품 URL: ${data.url}
- 수량: ${data.quantity}
- 예산: ${data.budget}
- 구매 국가: ${data.country}
- 배송 방법: ${data.delivery}
- 상세 요청사항: ${data.message}

신청 시간: ${new Date().toLocaleString('ko-KR')}

구글 시트에서 확인하기:
https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit
    `;

    // 이메일 전송
    MailApp.sendEmail(recipient, subject, body);
    Logger.log('✅ 이메일 알림 전송 완료: ' + recipient);

  } catch (error) {
    Logger.log('⚠️ 이메일 전송 실패: ' + error.toString());
  }
}

// ==================== 도움말 ====================
/**
 * 사용 방법 안내
 */
function showHelp() {
  const ui = SpreadsheetApp.getUi();
  ui.alert(
    '📚 사용 방법',

    '1️⃣ 초기 설정 (최초 1회)\n' +
    '   - setupSheet() 함수 실행\n\n' +

    '2️⃣ 웹 앱 배포\n' +
    '   - 배포 > 새 배포 클릭\n' +
    '   - 유형: 웹 앱\n' +
    '   - 액세스 권한: "모든 사용자"\n' +
    '   - 배포 URL 복사\n\n' +

    '3️⃣ HTML 파일 수정\n' +
    '   - submitForm() 함수의 scriptUrl에 배포 URL 입력\n\n' +

    '4️⃣ 통계 확인\n' +
    '   - getStatistics() 함수 실행\n\n' +

    '5️⃣ 테스트\n' +
    '   - addTestData() 함수로 테스트 데이터 추가',

    ui.ButtonSet.OK
  );
}
