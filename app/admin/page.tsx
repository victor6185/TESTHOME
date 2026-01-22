'use client';

import Link from 'next/link';
import { useState } from 'react';

// 샘플 데이터
const recentOrders = [
  { id: 'ORD-001', customer: '홍길동', product: '나이키 에어맥스', amount: 189000, status: '결제완료', date: '2024-01-20' },
  { id: 'ORD-002', customer: '김철수', product: '샤넬 플랩백', amount: 8900000, status: '구매대행중', date: '2024-01-20' },
  { id: 'ORD-003', customer: '이영희', product: '라메르 크림', amount: 320000, status: '배송중', date: '2024-01-19' },
  { id: 'ORD-004', customer: '박민수', product: '아이폰 16 Pro', amount: 1590000, status: '배송완료', date: '2024-01-19' },
  { id: 'ORD-005', customer: '최수진', product: '발렌시아가 스니커즈', amount: 890000, status: '결제완료', date: '2024-01-18' },
];

const recentUsers = [
  { id: 1, name: '홍길동', email: 'hong@email.com', joinDate: '2024-01-20', orders: 3 },
  { id: 2, name: '김철수', email: 'kim@email.com', joinDate: '2024-01-19', orders: 1 },
  { id: 3, name: '이영희', email: 'lee@email.com', joinDate: '2024-01-18', orders: 5 },
  { id: 4, name: '박민수', email: 'park@email.com', joinDate: '2024-01-17', orders: 2 },
];

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: '대시보드', icon: '📊' },
    { id: 'orders', label: '주문 관리', icon: '📦' },
    { id: 'products', label: '상품 관리', icon: '🛍️' },
    { id: 'users', label: '회원 관리', icon: '👥' },
    { id: 'payments', label: '결제 관리', icon: '💳' },
    { id: 'settings', label: '설정', icon: '⚙️' },
  ];

  const stats = [
    { label: '오늘 주문', value: '12', change: '+15%', color: '#22c55e' },
    { label: '오늘 매출', value: '₩8,540,000', change: '+23%', color: '#22c55e' },
    { label: '신규 회원', value: '5', change: '+8%', color: '#22c55e' },
    { label: '처리 대기', value: '7', change: '-12%', color: '#ef4444' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case '결제완료': return '#3b82f6';
      case '구매대행중': return '#f59e0b';
      case '배송중': return '#8b5cf6';
      case '배송완료': return '#22c55e';
      default: return '#71717a';
    }
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <span>🌍</span>
          <span>관리자</span>
        </div>

        <nav className="nav-menu">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`menu-item ${activeMenu === item.id ? 'active' : ''}`}
              onClick={() => setActiveMenu(item.id)}
            >
              <span className="menu-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <Link href="/" className="back-to-site">
          ← 사이트로 돌아가기
        </Link>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="admin-header">
          <h1>
            {menuItems.find((m) => m.id === activeMenu)?.icon}{' '}
            {menuItems.find((m) => m.id === activeMenu)?.label}
          </h1>
          <div className="header-right">
            <span className="admin-name">👤 관리자</span>
          </div>
        </header>

        {/* Dashboard Content */}
        {activeMenu === 'dashboard' && (
          <div className="dashboard-content">
            {/* Stats Grid */}
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-header">
                    <span className="stat-label">{stat.label}</span>
                    <span className="stat-change" style={{ color: stat.color }}>
                      {stat.change}
                    </span>
                  </div>
                  <div className="stat-value">{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="charts-section">
              <div className="chart-card">
                <h3>매출 현황</h3>
                <div className="chart-placeholder">
                  <div className="bar-chart">
                    {[65, 80, 45, 90, 70, 85, 60].map((height, i) => (
                      <div
                        key={i}
                        className="bar"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                  <div className="chart-labels">
                    <span>월</span>
                    <span>화</span>
                    <span>수</span>
                    <span>목</span>
                    <span>금</span>
                    <span>토</span>
                    <span>일</span>
                  </div>
                </div>
              </div>
              <div className="chart-card">
                <h3>카테고리별 판매</h3>
                <div className="category-stats">
                  <div className="category-item">
                    <span>스니커즈</span>
                    <div className="progress-bar">
                      <div className="progress" style={{ width: '75%' }} />
                    </div>
                    <span>35%</span>
                  </div>
                  <div className="category-item">
                    <span>명품가방</span>
                    <div className="progress-bar">
                      <div className="progress" style={{ width: '60%' }} />
                    </div>
                    <span>28%</span>
                  </div>
                  <div className="category-item">
                    <span>화장품</span>
                    <div className="progress-bar">
                      <div className="progress" style={{ width: '45%' }} />
                    </div>
                    <span>20%</span>
                  </div>
                  <div className="category-item">
                    <span>전자기기</span>
                    <div className="progress-bar">
                      <div className="progress" style={{ width: '30%' }} />
                    </div>
                    <span>17%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders & Users */}
            <div className="tables-section">
              <div className="table-card">
                <div className="table-header">
                  <h3>최근 주문</h3>
                  <button className="view-all-btn">전체보기 →</button>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>주문번호</th>
                      <th>고객</th>
                      <th>상품</th>
                      <th>금액</th>
                      <th>상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="order-id">{order.id}</td>
                        <td>{order.customer}</td>
                        <td>{order.product}</td>
                        <td>₩{order.amount.toLocaleString()}</td>
                        <td>
                          <span
                            className="status-badge"
                            style={{ backgroundColor: getStatusColor(order.status) }}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="table-card">
                <div className="table-header">
                  <h3>최근 가입 회원</h3>
                  <button className="view-all-btn">전체보기 →</button>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>이름</th>
                      <th>이메일</th>
                      <th>가입일</th>
                      <th>주문수</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.joinDate}</td>
                        <td>{user.orders}건</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Orders Management */}
        {activeMenu === 'orders' && (
          <div className="orders-management">
            <div className="filters">
              <select>
                <option>전체 상태</option>
                <option>결제완료</option>
                <option>구매대행중</option>
                <option>배송중</option>
                <option>배송완료</option>
              </select>
              <input type="date" />
              <input type="text" placeholder="검색..." />
            </div>
            <div className="table-card full">
              <table>
                <thead>
                  <tr>
                    <th>주문번호</th>
                    <th>고객</th>
                    <th>상품</th>
                    <th>금액</th>
                    <th>날짜</th>
                    <th>상태</th>
                    <th>액션</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="order-id">{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.product}</td>
                      <td>₩{order.amount.toLocaleString()}</td>
                      <td>{order.date}</td>
                      <td>
                        <span
                          className="status-badge"
                          style={{ backgroundColor: getStatusColor(order.status) }}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <button className="action-btn">상세</button>
                        <button className="action-btn">수정</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Products Management */}
        {activeMenu === 'products' && (
          <div className="products-management">
            <div className="page-actions">
              <button className="add-btn">+ 새 상품 등록</button>
            </div>
            <div className="table-card full">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>상품명</th>
                    <th>브랜드</th>
                    <th>가격</th>
                    <th>카테고리</th>
                    <th>재고</th>
                    <th>액션</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>나이키 에어맥스 97 실버불릿</td>
                    <td>Nike</td>
                    <td>₩189,000</td>
                    <td>스니커즈</td>
                    <td>15</td>
                    <td>
                      <button className="action-btn">수정</button>
                      <button className="action-btn delete">삭제</button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>샤넬 클래식 플랩백 미디움</td>
                    <td>Chanel</td>
                    <td>₩8,900,000</td>
                    <td>명품가방</td>
                    <td>3</td>
                    <td>
                      <button className="action-btn">수정</button>
                      <button className="action-btn delete">삭제</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Management */}
        {activeMenu === 'users' && (
          <div className="users-management">
            <div className="filters">
              <input type="text" placeholder="이름 또는 이메일 검색..." />
              <select>
                <option>전체 등급</option>
                <option>Silver</option>
                <option>Gold</option>
                <option>VIP</option>
              </select>
            </div>
            <div className="table-card full">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>이름</th>
                    <th>이메일</th>
                    <th>가입일</th>
                    <th>주문수</th>
                    <th>등급</th>
                    <th>액션</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.joinDate}</td>
                      <td>{user.orders}건</td>
                      <td>Silver</td>
                      <td>
                        <button className="action-btn">상세</button>
                        <button className="action-btn">수정</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeMenu === 'payments' && (
          <div className="payments-management">
            <h2>결제 관리</h2>
            <p className="coming-soon">토스페이먼츠 결제 내역이 여기에 표시됩니다.</p>
          </div>
        )}

        {activeMenu === 'settings' && (
          <div className="settings-section">
            <h2>설정</h2>
            <div className="settings-card">
              <h3>Firebase 설정</h3>
              <div className="form-group">
                <label>Firebase API Key</label>
                <input type="text" placeholder="Firebase API Key를 입력하세요" />
              </div>
              <div className="form-group">
                <label>Firebase Project ID</label>
                <input type="text" placeholder="Project ID를 입력하세요" />
              </div>
              <button className="save-btn">저장</button>
            </div>
            <div className="settings-card">
              <h3>토스페이먼츠 설정</h3>
              <div className="form-group">
                <label>Client Key</label>
                <input type="text" placeholder="Client Key를 입력하세요" />
              </div>
              <div className="form-group">
                <label>Secret Key</label>
                <input type="password" placeholder="Secret Key를 입력하세요" />
              </div>
              <button className="save-btn">저장</button>
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        .admin-container {
          display: flex;
          min-height: 100vh;
          background: #0a0a0a;
        }

        .sidebar {
          width: 250px;
          background: #1a1a1a;
          border-right: 1px solid #27272a;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #27272a;
        }

        .logo span:first-child {
          font-size: 1.5rem;
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1rem;
          background: transparent;
          border: none;
          border-radius: 8px;
          color: #a1a1aa;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s;
          text-align: left;
        }

        .menu-item:hover {
          background: #27272a;
          color: white;
        }

        .menu-item.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .menu-icon {
          font-size: 1.125rem;
        }

        .back-to-site {
          padding: 0.875rem 1rem;
          color: #71717a;
          text-decoration: none;
          font-size: 0.9rem;
          border-top: 1px solid #27272a;
          margin-top: 1rem;
          padding-top: 1.5rem;
        }

        .back-to-site:hover {
          color: white;
        }

        .main-content {
          flex: 1;
          margin-left: 250px;
          padding: 2rem;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .admin-header h1 {
          font-size: 1.75rem;
          font-weight: 700;
        }

        .admin-name {
          color: #a1a1aa;
        }

        /* Stats */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: #1a1a1a;
          border: 1px solid #27272a;
          border-radius: 12px;
          padding: 1.5rem;
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: #71717a;
          font-size: 0.9rem;
        }

        .stat-change {
          font-size: 0.85rem;
          font-weight: 600;
        }

        .stat-value {
          font-size: 1.75rem;
          font-weight: 700;
        }

        /* Charts */
        .charts-section {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .chart-card {
          background: #1a1a1a;
          border: 1px solid #27272a;
          border-radius: 12px;
          padding: 1.5rem;
        }

        .chart-card h3 {
          font-size: 1rem;
          margin-bottom: 1.5rem;
        }

        .bar-chart {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          height: 150px;
          padding: 0 1rem;
        }

        .bar {
          width: 30px;
          background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
          border-radius: 4px 4px 0 0;
          transition: height 0.3s;
        }

        .chart-labels {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 1rem 0;
          color: #71717a;
          font-size: 0.85rem;
        }

        .category-stats {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .category-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .category-item span:first-child {
          width: 80px;
          font-size: 0.9rem;
          color: #a1a1aa;
        }

        .category-item span:last-child {
          width: 40px;
          text-align: right;
          font-size: 0.85rem;
          color: #71717a;
        }

        .progress-bar {
          flex: 1;
          height: 8px;
          background: #27272a;
          border-radius: 4px;
          overflow: hidden;
        }

        .progress {
          height: 100%;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          border-radius: 4px;
        }

        /* Tables */
        .tables-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .table-card {
          background: #1a1a1a;
          border: 1px solid #27272a;
          border-radius: 12px;
          padding: 1.5rem;
          overflow: auto;
        }

        .table-card.full {
          grid-column: 1 / -1;
        }

        .table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .table-header h3 {
          font-size: 1rem;
        }

        .view-all-btn {
          background: none;
          border: none;
          color: #667eea;
          cursor: pointer;
          font-size: 0.9rem;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 0.75rem;
          text-align: left;
          border-bottom: 1px solid #27272a;
        }

        th {
          color: #71717a;
          font-weight: 600;
          font-size: 0.85rem;
        }

        td {
          font-size: 0.9rem;
        }

        .order-id {
          color: #667eea;
          font-weight: 600;
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
        }

        .action-btn {
          padding: 0.375rem 0.75rem;
          background: transparent;
          border: 1px solid #27272a;
          border-radius: 4px;
          color: #a1a1aa;
          cursor: pointer;
          font-size: 0.8rem;
          margin-right: 0.5rem;
        }

        .action-btn:hover {
          border-color: #667eea;
          color: white;
        }

        .action-btn.delete:hover {
          border-color: #ef4444;
          color: #ef4444;
        }

        /* Filters */
        .filters {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .filters select,
        .filters input {
          padding: 0.625rem 1rem;
          background: #1a1a1a;
          border: 1px solid #27272a;
          border-radius: 8px;
          color: white;
          font-size: 0.9rem;
        }

        .filters input[type="text"] {
          flex: 1;
        }

        .page-actions {
          margin-bottom: 1.5rem;
        }

        .add-btn {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        .coming-soon {
          color: #71717a;
          margin-top: 1rem;
        }

        /* Settings */
        .settings-section {
          max-width: 600px;
        }

        .settings-section h2 {
          margin-bottom: 2rem;
        }

        .settings-card {
          background: #1a1a1a;
          border: 1px solid #27272a;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .settings-card h3 {
          font-size: 1.125rem;
          margin-bottom: 1.5rem;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: #a1a1aa;
          font-size: 0.9rem;
        }

        .form-group input {
          width: 100%;
          padding: 0.75rem;
          background: #0a0a0a;
          border: 1px solid #27272a;
          border-radius: 8px;
          color: white;
          font-size: 0.95rem;
        }

        .save-btn {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 0.5rem;
        }

        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .charts-section {
            grid-template-columns: 1fr;
          }

          .tables-section {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .sidebar {
            display: none;
          }

          .main-content {
            margin-left: 0;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
