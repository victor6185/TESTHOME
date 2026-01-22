'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Header from '@/components/Header';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');
  const paymentKey = searchParams.get('paymentKey');

  return (
    <div className="page-container">
      <Header />

      <main className="success-main">
        <div className="success-card">
          <div className="success-icon">✅</div>
          <h1>결제가 완료되었습니다!</h1>
          <p className="success-message">주문이 성공적으로 처리되었습니다</p>

          <div className="order-info">
            <div className="info-row">
              <span>주문번호</span>
              <span>{orderId || '-'}</span>
            </div>
            {amount && (
              <div className="info-row">
                <span>결제금액</span>
                <span>₩{Number(amount).toLocaleString()}</span>
              </div>
            )}
            {paymentKey && (
              <div className="info-row">
                <span>결제키</span>
                <span className="payment-key">{paymentKey.substring(0, 20)}...</span>
              </div>
            )}
          </div>

          <div className="notice">
            <p>📧 주문 확인 이메일이 발송되었습니다</p>
            <p>📦 배송 준비가 시작되면 알림을 보내드립니다</p>
          </div>

          <div className="action-buttons">
            <Link href="/mypage" className="primary-btn">
              주문 내역 확인
            </Link>
            <Link href="/products" className="secondary-btn">
              쇼핑 계속하기
            </Link>
          </div>
        </div>
      </main>

      <style jsx>{`
        .page-container {
          min-height: 100vh;
          background: #0a0a0a;
        }

        .success-main {
          padding-top: 100px;
          padding-bottom: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }

        .success-card {
          background: #1a1a1a;
          border: 1px solid #27272a;
          border-radius: 16px;
          padding: 3rem;
          text-align: center;
          max-width: 500px;
          width: 100%;
          margin: 0 1rem;
        }

        .success-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        h1 {
          font-size: 1.75rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          color: #22c55e;
        }

        .success-message {
          color: #a1a1aa;
          margin-bottom: 2rem;
        }

        .order-info {
          background: #0f0f0f;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
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

        .payment-key {
          font-family: monospace;
          font-size: 0.85rem;
        }

        .notice {
          margin-bottom: 2rem;
        }

        .notice p {
          color: #a1a1aa;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .primary-btn {
          padding: 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 700;
          transition: transform 0.2s;
        }

        .primary-btn:hover {
          transform: scale(1.02);
        }

        .secondary-btn {
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
      `}</style>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
