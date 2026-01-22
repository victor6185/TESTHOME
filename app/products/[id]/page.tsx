'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import { loadTossPayments, TossPaymentsInstance } from '@tosspayments/tosspayments-sdk';
import { getProduct, Product } from '@/lib/firestore';
import { useAuth } from '@/contexts/AuthContext';

// 폴백용 상품 데이터
const fallbackProducts: Record<string, Product> = {
  '1': {
    id: '1',
    name: '나이키 에어맥스 97 실버불릿',
    brand: 'Nike',
    category: '스니커즈',
    price: 189000,
    originalPrice: 229000,
    image: '👟',
    country: '미국',
    badge: 'HOT',
    description: '1997년 첫 출시 이후 아이코닉한 디자인으로 사랑받는 나이키 에어맥스 97.',
    specs: ['풀 렝스 에어 유닛', '메쉬 & 합성 소재 어퍼', '고무 밑창', '리플렉티브 디테일'],
  },
  '2': {
    id: '2',
    name: '샤넬 클래식 플랩백 미디움',
    brand: 'Chanel',
    category: '명품가방',
    price: 8900000,
    originalPrice: 10500000,
    image: '👜',
    country: '프랑스',
    badge: 'LUXURY',
    description: '샤넬의 시그니처 클래식 플랩백.',
    specs: ['캐비어 가죽', '골드 체인 스트랩', '더블 플랩 디자인', '버건디 레더 안감'],
  },
  '3': {
    id: '3',
    name: '라메르 크림 60ml',
    brand: 'La Mer',
    category: '화장품',
    price: 320000,
    originalPrice: 420000,
    image: '💄',
    country: '미국',
    badge: 'SALE',
    description: '전설적인 미라클 브로스를 함유한 라메르 크림.',
    specs: ['미라클 브로스 함유', '60ml 용량', '올 스킨 타입', '집중 보습 케어'],
  },
  '4': {
    id: '4',
    name: '애플 아이폰 16 Pro Max 256GB',
    brand: 'Apple',
    category: '전자기기',
    price: 1590000,
    originalPrice: 1900000,
    image: '📱',
    country: '미국',
    badge: 'NEW',
    description: '애플의 최신 플래그십 스마트폰.',
    specs: ['A18 Pro 칩셋', '6.9인치 Super Retina XDR', '48MP 메인 카메라', '256GB 저장공간'],
  },
  '99': {
    id: '99',
    name: '테스트 상품 (결제 테스트용)',
    brand: 'TEST',
    category: '테스트',
    price: 100,
    originalPrice: 1000,
    image: '🧪',
    country: '한국',
    badge: 'TEST',
    description: '토스페이먼츠 결제 테스트를 위한 100원 상품입니다.',
    specs: ['결제 테스트용', '100원', '환불 가능', '테스트 전용'],
  },
};

const CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || 'test_ck_P9BRQmyarY7mKPKDzmmN3J07KzLN';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const { firebaseUser } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [tossPayments, setTossPayments] = useState<TossPaymentsInstance | null>(null);
  const paymentInProgress = useRef(false);

  useEffect(() => {
    loadProduct();
  }, [productId]);

  useEffect(() => {
    const initTossPayments = async () => {
      try {
        const toss = await loadTossPayments(CLIENT_KEY);
        setTossPayments(toss);
      } catch (error) {
        console.error('토스페이먼츠 SDK 로딩 실패:', error);
      }
    };

    initTossPayments();
  }, []);

  const loadProduct = async () => {
    try {
      const data = await getProduct(productId);
      if (data) {
        setProduct(data);
      } else {
        // Firestore에 없으면 폴백 데이터 사용
        const fallback = fallbackProducts[productId];
        if (fallback) {
          setProduct(fallback);
        }
      }
    } catch (error) {
      console.error('상품 로드 실패:', error);
      // 에러 시 폴백 데이터 사용
      const fallback = fallbackProducts[productId];
      if (fallback) {
        setProduct(fallback);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <Header />
        <main className="loading-main">
          <div className="spinner"></div>
          <p>상품을 불러오는 중...</p>
        </main>
        <style jsx>{`
          .page-container {
            min-height: 100vh;
            background: #0a0a0a;
          }
          .loading-main {
            padding-top: 150px;
            text-align: center;
          }
          .spinner {
            width: 48px;
            height: 48px;
            border: 4px solid #27272a;
            border-top-color: #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          .loading-main p {
            color: #a1a1aa;
          }
        `}</style>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="page-container">
        <Header />
        <main className="not-found">
          <h1>상품을 찾을 수 없습니다</h1>
          <Link href="/products">상품 목록으로 돌아가기</Link>
        </main>
        <style jsx>{`
          .page-container {
            min-height: 100vh;
            background: #0a0a0a;
          }
          .not-found {
            padding-top: 150px;
            text-align: center;
          }
          .not-found a {
            color: #667eea;
          }
        `}</style>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR');
  };

  const getDiscount = (original: number, current: number) => {
    return Math.round((1 - current / original) * 100);
  };

  const totalPrice = product.price * quantity;

  const handlePayment = async () => {
    if (!tossPayments) {
      alert('결제 모듈을 로딩 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    // 중복 결제 방지
    if (paymentInProgress.current) {
      console.log('결제가 이미 진행 중입니다.');
      return;
    }

    paymentInProgress.current = true;
    setIsPaymentLoading(true);

    try {
      const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // 주문 정보를 sessionStorage에 저장 (결제 성공 시 사용)
      const orderData = {
        userId: firebaseUser?.uid || '',
        productId: product.id || productId,
        productName: product.name,
        quantity: quantity,
        totalAmount: totalPrice,
        orderId: orderId,
      };
      sessionStorage.setItem('pendingOrder', JSON.stringify(orderData));

      const payment = tossPayments.payment({ customerKey: `CUSTOMER_${firebaseUser?.uid || Date.now()}` });

      await payment.requestPayment({
        method: 'CARD',
        amount: {
          value: totalPrice,
          currency: 'KRW',
        },
        orderId: orderId,
        orderName: `${product.name} x ${quantity}`,
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
        customerEmail: firebaseUser?.email || 'customer@example.com',
        customerName: '구매자',
        card: {
          useEscrow: false,
          flowMode: 'DEFAULT',
          useCardPoint: false,
          useAppCardOnly: false,
        },
      });
    } catch (error: unknown) {
      paymentInProgress.current = false;
      if (error && typeof error === 'object' && 'code' in error) {
        const tossError = error as { code: string; message: string };
        if (tossError.code === 'USER_CANCEL') {
          console.log('결제가 취소되었습니다.');
        } else {
          console.error('결제 오류:', tossError.message);
          alert(`결제 중 오류가 발생했습니다: ${tossError.message}`);
        }
      } else {
        console.error('결제 오류:', error);
        alert('결제 중 오류가 발생했습니다.');
      }
    } finally {
      setIsPaymentLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Header />

      <main className="product-main">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">홈</Link>
            <span>/</span>
            <Link href="/products">상품</Link>
            <span>/</span>
            <span>{product.category}</span>
          </nav>

          <div className="product-detail">
            <div className="product-image-section">
              {product.badge && (
                <span className={`badge badge-${product.badge.toLowerCase()}`}>
                  {product.badge}
                </span>
              )}
              <div className="main-image">
                <span>{product.image}</span>
              </div>
            </div>

            <div className="product-info-section">
              <span className="brand">{product.brand}</span>
              <h1 className="product-title">{product.name}</h1>

              <div className="product-meta">
                <span className="country">🌍 {product.country}에서 구매대행</span>
                <span className="category">{product.category}</span>
              </div>

              <div className="price-section">
                <div className="discount-rate">
                  {getDiscount(product.originalPrice, product.price)}% OFF
                </div>
                <div className="prices">
                  <span className="current-price">
                    ₩{formatPrice(product.price)}
                  </span>
                  <span className="original-price">
                    ₩{formatPrice(product.originalPrice)}
                  </span>
                </div>
              </div>

              <p className="description">{product.description}</p>

              <div className="specs">
                <h3>상품 정보</h3>
                <ul>
                  {product.specs.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>

              <div className="quantity-section">
                <label>수량</label>
                <div className="quantity-controls">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>

              <div className="total-section">
                <span>총 결제금액</span>
                <span className="total-price">₩{formatPrice(totalPrice)}</span>
              </div>

              <div className="action-buttons">
                <button
                  className="buy-btn"
                  onClick={handlePayment}
                  disabled={isPaymentLoading || !tossPayments}
                >
                  {isPaymentLoading ? '처리 중...' : !tossPayments ? '결제 준비 중...' : '바로 구매하기'}
                </button>
                <button className="cart-btn">장바구니</button>
              </div>

              <div className="payment-info">
                <p>💳 토스페이먼츠로 안전하게 결제됩니다</p>
                <p>🔒 에스크로 서비스로 안심 거래</p>
                <p>📦 평균 7일 내 배송</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .page-container {
          min-height: 100vh;
          background: #0a0a0a;
        }

        .product-main {
          padding-top: 100px;
          padding-bottom: 60px;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .breadcrumb {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          color: #71717a;
          font-size: 0.9rem;
        }

        .breadcrumb a {
          color: #71717a;
          text-decoration: none;
        }

        .breadcrumb a:hover {
          color: #667eea;
        }

        .product-detail {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
        }

        .product-image-section {
          position: relative;
        }

        .badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          padding: 0.375rem 1rem;
          border-radius: 4px;
          font-size: 0.875rem;
          font-weight: 700;
          z-index: 1;
        }

        .badge-hot {
          background: #ef4444;
          color: white;
        }

        .badge-new {
          background: #22c55e;
          color: white;
        }

        .badge-sale {
          background: #f59e0b;
          color: white;
        }

        .badge-luxury {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .badge-test {
          background: #71717a;
          color: white;
        }

        .main-image {
          background: #1a1a1a;
          border: 1px solid #27272a;
          border-radius: 16px;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .main-image span {
          font-size: 10rem;
        }

        .product-info-section {
          display: flex;
          flex-direction: column;
        }

        .brand {
          color: #667eea;
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }

        .product-title {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .product-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .country,
        .category {
          font-size: 0.9rem;
          color: #71717a;
        }

        .price-section {
          margin-bottom: 1.5rem;
          padding: 1.5rem;
          background: #1a1a1a;
          border-radius: 12px;
        }

        .discount-rate {
          color: #ef4444;
          font-weight: 700;
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }

        .prices {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .current-price {
          font-size: 2rem;
          font-weight: 800;
        }

        .original-price {
          font-size: 1.125rem;
          color: #71717a;
          text-decoration: line-through;
        }

        .description {
          color: #a1a1aa;
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }

        .specs {
          margin-bottom: 1.5rem;
        }

        .specs h3 {
          font-size: 1rem;
          margin-bottom: 0.75rem;
        }

        .specs ul {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem;
        }

        .specs li {
          color: #a1a1aa;
          font-size: 0.9rem;
          padding-left: 1.25rem;
          position: relative;
        }

        .specs li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #667eea;
        }

        .quantity-section {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .quantity-section label {
          font-weight: 600;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .quantity-controls button {
          width: 36px;
          height: 36px;
          background: #1a1a1a;
          border: 1px solid #27272a;
          border-radius: 8px;
          color: white;
          font-size: 1.25rem;
          cursor: pointer;
          transition: all 0.3s;
        }

        .quantity-controls button:hover {
          border-color: #667eea;
        }

        .quantity-controls span {
          width: 50px;
          text-align: center;
          font-weight: 600;
        }

        .total-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: #0f0f0f;
          border-radius: 8px;
          margin-bottom: 1.5rem;
        }

        .total-price {
          font-size: 1.5rem;
          font-weight: 800;
          color: #667eea;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .buy-btn {
          flex: 2;
          padding: 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.125rem;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .buy-btn:hover:not(:disabled) {
          transform: scale(1.02);
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
        }

        .buy-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .cart-btn {
          flex: 1;
          padding: 1rem;
          background: transparent;
          color: white;
          border: 1px solid #27272a;
          border-radius: 8px;
          font-size: 1.125rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .cart-btn:hover {
          border-color: #667eea;
        }

        .payment-info {
          padding: 1rem;
          background: #1a1a1a;
          border-radius: 8px;
        }

        .payment-info p {
          color: #a1a1aa;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .payment-info p:last-child {
          margin-bottom: 0;
        }

        @media (max-width: 768px) {
          .product-detail {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .main-image {
            height: 350px;
          }

          .main-image span {
            font-size: 6rem;
          }

          .product-title {
            font-size: 1.5rem;
          }

          .specs ul {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
