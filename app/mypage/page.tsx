'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { getUserOrders, Order, getUserAddresses, Address, updateUser } from '@/lib/firestore';

export default function MyPage() {
  const router = useRouter();
  const { firebaseUser, user, loading: authLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileForm, setProfileForm] = useState({
    name: '',
    phone: '',
    newPassword: '',
  });
  const [saving, setSaving] = useState(false);

  const tabs = [
    { id: 'orders', label: '주문 내역', icon: '📦' },
    { id: 'profile', label: '회원 정보', icon: '👤' },
    { id: 'address', label: '배송지 관리', icon: '📍' },
    { id: 'wishlist', label: '찜 목록', icon: '❤️' },
  ];

  useEffect(() => {
    if (!authLoading && !firebaseUser) {
      router.push('/login');
    }
  }, [authLoading, firebaseUser, router]);

  useEffect(() => {
    if (firebaseUser) {
      loadUserData();
    }
  }, [firebaseUser]);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        phone: user.phone || '',
        newPassword: '',
      });
    }
  }, [user]);

  const loadUserData = async () => {
    if (!firebaseUser) return;

    try {
      const [ordersData, addressesData] = await Promise.all([
        getUserOrders(firebaseUser.uid),
        getUserAddresses(firebaseUser.uid),
      ]);
      setOrders(ordersData);
      setAddresses(addressesData);
    } catch (error) {
      console.error('데이터 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firebaseUser) return;

    setSaving(true);
    try {
      await updateUser(firebaseUser.uid, {
        name: profileForm.name,
        phone: profileForm.phone,
      });
      alert('회원 정보가 저장되었습니다.');
    } catch (error) {
      console.error('저장 실패:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case '결제완료': return '#3b82f6';
      case '구매대행중': return '#f59e0b';
      case '배송중': return '#22c55e';
      case '배송완료': return '#22c55e';
      case '취소': return '#ef4444';
      default: return '#71717a';
    }
  };

  const formatDate = (timestamp: unknown): string => {
    if (!timestamp) return '-';
    if (typeof timestamp === 'object' && timestamp !== null && 'toDate' in timestamp) {
      return (timestamp as { toDate: () => Date }).toDate().toLocaleDateString('ko-KR');
    }
    return '-';
  };

  const totalAmount = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  if (authLoading || loading) {
    return (
      <div className="page-container">
        <Header />
        <main className="loading-main">
          <div className="spinner"></div>
          <p>로딩 중...</p>
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

  if (!firebaseUser) {
    return null;
  }

  return (
    <div className="page-container">
      <Header />

      <main className="mypage-main">
        <div className="container">
          {/* User Info Summary */}
          <div className="user-summary">
            <div className="user-avatar">
              {user?.name?.charAt(0) || firebaseUser.email?.charAt(0)?.toUpperCase() || '👤'}
            </div>
            <div className="user-info">
              <h1>{user?.name || '회원'}님, 안녕하세요!</h1>
              <p>{firebaseUser.email}</p>
            </div>
            <div className="user-stats">
              <div className="stat">
                <span className="stat-value">{orders.length}</span>
                <span className="stat-label">총 주문</span>
              </div>
              <div className="stat">
                <span className="stat-value">₩{totalAmount.toLocaleString()}</span>
                <span className="stat-label">총 구매금액</span>
              </div>
              <div className="stat">
                <span className="stat-value">{user?.grade || 'Silver'}</span>
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
              <button onClick={handleLogout} className="logout-btn">
                로그아웃
              </button>
            </aside>

            {/* Main Content */}
            <div className="main-content">
              {activeTab === 'orders' && (
                <div className="orders-section">
                  <h2>주문 내역</h2>
                  {orders.length === 0 ? (
                    <div className="empty-state">
                      <p>주문 내역이 없습니다.</p>
                      <Link href="/products" className="shop-btn">쇼핑하러 가기</Link>
                    </div>
                  ) : (
                    <div className="orders-list">
                      {orders.map((order) => (
                        <div key={order.id} className="order-card">
                          <div className="order-header">
                            <span className="order-id">{order.orderId}</span>
                            <span className="order-date">{formatDate(order.createdAt)}</span>
                          </div>
                          <div className="order-body">
                            <span className="order-product">{order.productName}</span>
                            <span className="order-price">
                              ₩{order.totalAmount.toLocaleString()}
                            </span>
                          </div>
                          <div className="order-footer">
                            <span
                              className="order-status"
                              style={{ color: getStatusColor(order.status) }}
                            >
                              {order.status}
                            </span>
                            <button className="detail-btn">상세보기</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="profile-section">
                  <h2>회원 정보</h2>
                  <form className="profile-form" onSubmit={handleProfileSubmit}>
                    <div className="form-group">
                      <label>이름</label>
                      <input
                        type="text"
                        name="name"
                        value={profileForm.name}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>이메일</label>
                      <input
                        type="email"
                        value={firebaseUser.email || ''}
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label>연락처</label>
                      <input
                        type="tel"
                        name="phone"
                        value={profileForm.phone}
                        onChange={handleProfileChange}
                        placeholder="010-1234-5678"
                      />
                    </div>
                    <button type="submit" className="save-btn" disabled={saving}>
                      {saving ? '저장 중...' : '저장하기'}
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'address' && (
                <div className="address-section">
                  <h2>배송지 관리</h2>
                  {addresses.length === 0 ? (
                    <div className="empty-state">
                      <p>등록된 배송지가 없습니다.</p>
                    </div>
                  ) : (
                    addresses.map((addr) => (
                      <div key={addr.id} className={`address-card ${addr.isDefault ? 'default' : ''}`}>
                        {addr.isDefault && <div className="address-badge">기본 배송지</div>}
                        <h3>{addr.name}</h3>
                        <p>{addr.phone}</p>
                        <p>{addr.address}</p>
                        <p>{addr.detail}</p>
                        <div className="address-actions">
                          <button>수정</button>
                          <button>삭제</button>
                        </div>
                      </div>
                    ))
                  )}
                  <button className="add-address-btn">+ 새 배송지 추가</button>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="wishlist-section">
                  <h2>찜 목록</h2>
                  <div className="empty-state">
                    <p>찜한 상품이 없습니다.</p>
                    <Link href="/products" className="shop-btn">쇼핑하러 가기</Link>
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
          cursor: pointer;
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

        .empty-state {
          text-align: center;
          padding: 3rem;
          color: #71717a;
        }

        .empty-state p {
          margin-bottom: 1rem;
        }

        .shop-btn {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
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
          font-size: 0.9rem;
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

        .save-btn:hover:not(:disabled) {
          transform: scale(1.02);
        }

        .save-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
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
