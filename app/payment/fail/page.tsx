'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Header from '@/components/Header';

function PaymentFailContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const message = searchParams.get('message');

  return (
    <div className="page-container">
      <Header />

      <main className="fail-main">
        <div className="fail-card">
          <div className="fail-icon">❌</div>
          <h1>결제에 실패했습니다</h1>
          <p className="fail-message">다시 시도해주세요</p>

          {(code || message) && (
            <div className="error-info">
              {code && (
                <div className="info-row">
                  <span>오류 코드</span>
                  <span>{code}</span>
                </div>
              )}
              {message && (
                <div className="info-row">
                  <span>오류 메시지</span>
                  <span>{message}</span>
                </div>
              )}
            </div>
          )}

          <div className="help-text">
            <p>결제 중 문제가 발생했습니다.</p>
            <p>카드 정보를 확인하시거나 다른 결제 수단을 이용해주세요.</p>
          </div>

          <div className="action-buttons">
            <button onClick={() => window.history.back()} className="primary-btn">
              다시 시도하기
            </button>
            <Link href="/products" className="secondary-btn">
              쇼핑 계속하기
            </Link>
          </div>

          <div className="support">
            <p>문제가 계속되면 고객센터로 문의해주세요</p>
            <p>📞 02-1234-5678</p>
          </div>
        </div>
      </main>

      <style jsx>{`
        .page-container {
          min-height: 100vh;
          background: #0a0a0a;
        }

        .fail-main {
          padding-top: 100px;
          padding-bottom: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }

        .fail-card {
          background: #1a1a1a;
          border: 1px solid #27272a;
          border-radius: 16px;
          padding: 3rem;
          text-align: center;
          max-width: 500px;
          width: 100%;
          margin: 0 1rem;
        }

        .fail-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        h1 {
          font-size: 1.75rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          color: #ef4444;
        }

        .fail-message {
          color: #a1a1aa;
          margin-bottom: 2rem;
        }

        .error-info {
          background: #0f0f0f;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          text-align: left;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid #27272a;
        }

        .info-row:last-child {
          border-bottom: none;
        }

        .info-row span:first-child {
          color: #71717a;
        }

        .help-text {
          margin-bottom: 2rem;
        }

        .help-text p {
          color: #a1a1aa;
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }

        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .primary-btn {
          padding: 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .primary-btn:hover {
          transform: scale(1.02);
        }

        .secondary-btn {
          display: block;
          padding: 1rem;
          background: transparent;
          border: 1px solid #27272a;
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          transition: all 0.3s;
        }

        .secondary-btn:hover {
          border-color: #667eea;
        }

        .support {
          padding-top: 1.5rem;
          border-top: 1px solid #27272a;
        }

        .support p {
          color: #71717a;
          font-size: 0.85rem;
          margin-bottom: 0.25rem;
        }
      `}</style>
    </div>
  );
}

export default function PaymentFailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentFailContent />
    </Suspense>
  );
}
