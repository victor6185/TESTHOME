import { NextRequest, NextResponse } from 'next/server';

const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID || '';
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET || '';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  if (error) {
    return new NextResponse(getErrorHtml(error), {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  if (!code || !state) {
    return new NextResponse(getErrorHtml('인증 코드가 없습니다.'), {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  try {
    // 액세스 토큰 요청
    const tokenResponse = await fetch(
      `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_CLIENT_SECRET}&code=${code}&state=${state}`,
      { method: 'GET' }
    );

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return new NextResponse(getErrorHtml(tokenData.error_description || '토큰 발급 실패'), {
        headers: { 'Content-Type': 'text/html' },
      });
    }

    const accessToken = tokenData.access_token;

    // 사용자 정보 요청
    const profileResponse = await fetch('https://openapi.naver.com/v1/nid/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const profileData = await profileResponse.json();

    if (profileData.resultcode !== '00') {
      return new NextResponse(getErrorHtml('사용자 정보 조회 실패'), {
        headers: { 'Content-Type': 'text/html' },
      });
    }

    const { id, email, name } = profileData.response;

    // 부모 창에 메시지 전송
    return new NextResponse(getSuccessHtml(id, email, name), {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (err) {
    console.error('Naver OAuth Error:', err);
    return new NextResponse(getErrorHtml('서버 오류가 발생했습니다.'), {
      headers: { 'Content-Type': 'text/html' },
    });
  }
}

function getSuccessHtml(naverId: string, email: string, name: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>네이버 로그인</title>
      </head>
      <body>
        <script>
          window.opener.postMessage({
            type: 'NAVER_LOGIN_SUCCESS',
            naverId: '${naverId}',
            email: '${email || ''}',
            name: '${name || ''}'
          }, window.location.origin);
          window.close();
        </script>
        <p>로그인 처리 중...</p>
      </body>
    </html>
  `;
}

function getErrorHtml(error: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>네이버 로그인 오류</title>
      </head>
      <body>
        <script>
          window.opener.postMessage({
            type: 'NAVER_LOGIN_FAIL',
            error: '${error}'
          }, window.location.origin);
          window.close();
        </script>
        <p>오류: ${error}</p>
      </body>
    </html>
  `;
}
