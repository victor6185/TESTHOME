'use client';

import Link from 'next/link';
import { useState } from 'react';
import Header from '@/components/Header';

// 샘플 주문 데이터
const sampleOrders = [
  {
    id: 'ORD-2024-001',
    date: '2024-01-15',
    product: '나이키 에어맥스 97 실버불릿',
    price: 189000,
    status: '배송완료',
    statusColor: '#22c55e',
  },
  {
    id: 'ORD-2024-002',
    date: '2024-01-18',
    product: '라메르 크림 60ml',
    price: 320000,
    status: '배송중',
    statusColor: '#3b82f6',
  },
  {
    id: 'ORD-2024-003',
    date: '2024-01-20',
    product: '애플 아이폰 16 Pro Max',
    price: 1590000,
    status: '구매대행중',
    statusColor: '#f59e0b',
  },
];

export default function MyPage() {
  const [activeTab, setActiveTab] = useState('orders');

  const tabs = [
    { id: 'orders', label: '주문 내역', icon: '📦' },
    { id: 'profile', label: '회원 정보', icon: '👤' },
    { id: 'address', label: '배송지 관리', icon: '📍' },
    { id: 'wishlist', label: '찜 목록', icon: '❤️' },
  ];

  return (
    <div className="page-container">
      <Header />

      <main className="mypage-main">
        <div className="container">
          {/* User Info Summary */}
          <div className="user-summary">
            <div className="user-avatar">👤</div>
            <div className="user-info">
              <h1>홍길동님, 안녕하세요!</h1>
              <p>example@email.com</p>
            </div>
            <div className="user-stats">
              <div className="stat">
                <span className="stat-value">3</span>
                <span className="stat-label">총 주문</span>
              </div>
              <div className="stat">
                <span className="stat-value">₩2,099,000</span>
                <span className="stat-label">총 구매금액</span>
              </div>
              <div className="stat">
                <span className="stat-value">Silver</span>
                <span className="stat-label">회원 등급</span>
              </div>
            </div>
          </div>

          <div className="mypage-content">
            {/* Sidebar */}
            <aside className="sidebar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
              <Link href="/login" className="logout-btn">
                로그아웃
              </Link>
            </aside>

            {/* Main Content */}
            <div className="main-content">
              {activeTab === 'orders' && (
                <div className="orders-section">
                  <h2>주문 내역</h2>
                  <div className="orders-list">
                    {sampleOrders.map((order) => (
                      <div key={order.id} className="order-card">
                        <div className="order-header">
                          <span className="order-id">{order.id}</span>
                          <span className="order-date">{order.date}</span>
                        </div>
                        <div className="order-body">
                          <span className="order-product">{order.product}</span>
                          <span className="order-price">
                            ₩{order.price.toLocaleString()}
                          </span>
                        </div>
                        <div className="order-footer">
                          <span
                            className="order-status"
                            style={{ color: order.statusColor }}
                          >
                            {order.status}
                          </span>
                          <button className="detail-btn">상세보기</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="profile-section">
                  <h2>회원 정보</h2>
                  <form className="profile-form">
                    <div className="form-group">
                      <label>이름</label>
                      <input type="text" defaultValue="홍길동" />
                    </div>
                    <div className="form-group">
                      <label>이메일</label>
                      <input type="email" defaultValue="example@email.com" disabled />
                    </div>
                    <div className="form-group">
                      <label>연락처</label>
                      <input type="tel" defaultValue="010-1234-5678" />
                    </div>
                    <div className="form-group">
                      <label>비밀번호 변경</label>
                      <input type="password" placeholder="새 비밀번호" />
                    </div>
                    <button type="submit" className="save-btn">저장하기</button>
                  </form>
                </div>
              )}

              {activeTab === 'address' && (
                <div className="address-section">
                  <h2>배송지 관리</h2>
                  <div className="address-card default">
                    <div className="address-badge">기본 배송지</div>
                    <h3>홍길동</h3>
                    <p>010-1234-5678</p>
                    <p>서울특별시 강남구 테헤란로 123</p>
                    <p>00빌딩 5층</p>
                    <div className="address-actions">
                      <button>수정</button>
                      <button>삭제</button>
                    </div>
                  </div>
                  <button className="add-address-btn">+ 새 배송지 추가</button>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="wishlist-section">
                  <h2>찜 목록</h2>
                  <div className="wishlist-grid">
                    <div className="wishlist-item">
                      <div className="item-image">👟</div>
                      <div className="item-info">
                        <span className="item-brand">Nike</span>
                        <span className="item-name">나이키 에어맥스 97</span>
                        <span className="item-price">₩189,000</span>
                      </div>
                      <button className="remove-btn">❌</button>
                    </div>
                    <div className="wishlist-item">
                      <div className="item-image">👜</div>
                      <div className="item-info">
                        <span className="item-brand">Gucci</span>
                        <span className="item-name">GG 마몽 미니백</span>
                        <span className="item-price">₩1,890,000</span>
                      </div>
                      <button className="remove-btn">❌</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .page-container {
          min-height: 100vh;
          background: #0a0a0a;
        }

        .mypage-main {
          padding-top: 100px;
          padding-bottom: 60px;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .user-summary {
          display: flex;
          align-items: center;
          gap: 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem;
          border-radius: 16px;
          margin-bottom: 2rem;
        }

        .user-avatar {
          width: 80px;
          height: 80px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
        }

        .user-info h1 {
          font-size: 1.5rem;
          margin-bottom: 0.25rem;
        }

        .user-info p {
          opacity: 0.9;
        }

        .user-stats {
          margin-left: auto;
          display: flex;
          gap: 3rem;
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .stat-value {
          font-size: 1.25rem;
          font-weight: 700;
        }

        .stat-label {
          font-size: 0.85rem;
          opacity: 0.9;
        }

        .mypage-content {
          display: grid;
          grid-template-columns: 250px 1fr;
          gap: 2rem;
        }

        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          background: #1a1a1a;
          border: 1px solid #27272a;
          border-radius: 8px;
          color: #a1a1aa;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s;
          text-align: left;
        }

        .tab-btn:hover {
          border-color: #667eea;
          color: white;
        }

        .tab-btn.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
        }

        .tab-icon {
          font-size: 1.25rem;
        }

        .logout-btn {
          margin-top: 1rem;
          padding: 1rem 1.25rem;
          background: transparent;
          border: 1px solid #ef4444;
          border-radius: 8px;
          color: #ef4444;
          text-decoration: none;
          text-align: center;
          font-size: 1rem;
          transition: all 0.3s;
        }

        .logout-btn:hover {
          background: #ef4444;
          color: white;
        }

        .main-content {
          background: #1a1a1a;
          border: 1px solid #27272a;
          border-radius: 16px;
          padding: 2rem;
        }

        .main-content h2 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
        }

        /* Orders */
        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .order-card {
          background: #0f0f0f;
          border: 1px solid #27272a;
          border-radius: 12px;
          padding: 1.25rem;
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .order-id {
          font-weight: 600;
          color: #667eea;
        }

        .order-date {
          color: #71717a;
          font-size: 0.9rem;
        }

        .order-body {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .order-product {
          font-weight: 500;
        }

        .order-price {
          font-weight: 700;
        }

        .order-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .order-status {
          font-weight: 600;
        }

        .detail-btn {
          padding: 0.5rem 1rem;
          background: transparent;
          border: 1px solid #27272a;
          border-radius: 6px;
          color: #a1a1aa;
          cursor: pointer;
          transition: all 0.3s;
        }

        .detail-btn:hover {
          border-color: #667eea;
          color: white;
        }

        /* Profile Form */
        .profile-form {
          max-width: 500px;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #e5e5e5;
        }

        .form-group input {
          width: 100%;
          padding: 0.875rem 1rem;
          background: #0a0a0a;
          border: 1px solid #27272a;
          border-radius: 8px;
          color: white;
          font-size: 1rem;
        }

        .form-group input:focus {
          outline: none;
          border-color: #667eea;
        }

        .form-group input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .save-btn {
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .save-btn:hover {
          transform: scale(1.02);
        }

        /* Address */
        .address-card {
          background: #0f0f0f;
          border: 1px solid #27272a;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1rem;
          position: relative;
        }

        .address-card.default {
          border-color: #667eea;
        }

        .address-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          padding: 0.25rem 0.75rem;
          background: #667eea;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .address-card h3 {
          font-size: 1.125rem;
          margin-bottom: 0.5rem;
        }

        .address-card p {
          color: #a1a1aa;
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }

        .address-actions {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .address-actions button {
          padding: 0.5rem 1rem;
          background: transparent;
          border: 1px solid #27272a;
          border-radius: 6px;
          color: #a1a1aa;
          cursor: pointer;
          font-size: 0.875rem;
        }

        .address-actions button:hover {
          border-color: #667eea;
          color: white;
        }

        .add-address-btn {
          width: 100%;
          padding: 1rem;
          background: transparent;
          border: 1px dashed #27272a;
          border-radius: 8px;
          color: #a1a1aa;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s;
        }

        .add-address-btn:hover {
          border-color: #667eea;
          color: white;
        }

        /* Wishlist */
        .wishlist-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .wishlist-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: #0f0f0f;
          border: 1px solid #27272a;
          border-radius: 12px;
          padding: 1rem;
        }

        .item-image {
          width: 80px;
          height: 80px;
          background: #1a1a1a;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
        }

        .item-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .item-brand {
          color: #667eea;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .item-name {
          font-weight: 500;
        }

        .item-price {
          font-weight: 700;
        }

        .remove-btn {
          background: none;
          border: none;
          font-size: 1.25rem;
          cursor: pointer;
          opacity: 0.6;
          transition: opacity 0.3s;
        }

        .remove-btn:hover {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .user-summary {
            flex-direction: column;
            text-align: center;
          }

          .user-stats {
            margin-left: 0;
            margin-top: 1rem;
          }

          .mypage-content {
            grid-template-columns: 1fr;
          }

          .sidebar {
            flex-direction: row;
            flex-wrap: wrap;
          }

          .tab-btn {
            flex: 1;
            min-width: calc(50% - 0.25rem);
            justify-content: center;
          }

          .logout-btn {
            margin-top: 0;
            min-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
