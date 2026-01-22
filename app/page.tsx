'use client';

import ChatBot from '@/components/ChatBot';
import NewsSection from '@/components/NewsSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <ChatBot />
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            세계 최고의 상품을<br />빠르고 안전하게
          </h1>
          <p className="hero-description">
            미국, 일본, 유럽의 인기 브랜드부터 한정판까지<br />
            전문가가 직접 구매하고 검수하여 배송해드립니다
          </p>
          <button className="cta-button">지금 시작하기</button>
          <div className="quick-features">
            <span>✓ 합리적인 수수료</span>
            <span>✓ 빠른 배송</span>
            <span>✓ 전문 검수</span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">15,000+</div>
              <div className="stat-label">누적 구매 건수</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">98.7%</div>
              <div className="stat-label">고객 만족도</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">7일</div>
              <div className="stat-label">평균 배송 기간</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">고객 지원</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">왜 저희를 선택해야 할까요?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>합리적인 수수료</h3>
              <p>상품가의 10%만! 투명한 가격 정책</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>안전한 거래</h3>
              <p>에스크로 시스템으로 안심 결제</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>빠른 배송</h3>
              <p>특급 배송 옵션 제공 (3-5일)</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👨‍💼</div>
              <h3>전문 상담</h3>
              <p>AI + 전문가 1:1 상담 가능</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3>글로벌 커버리지</h3>
              <p>30개국 이상 구매대행 가능</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>품질 검수</h3>
              <p>전문가의 꼼꼼한 상품 검수</p>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <NewsSection />

      {/* Popular Categories */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">인기 카테고리</h2>
          <div className="categories-grid">
            <div className="category-card">
              <div className="category-icon">👟</div>
              <h3>스니커즈</h3>
              <p>한정판 운동화</p>
            </div>
            <div className="category-card">
              <div className="category-icon">💄</div>
              <h3>화장품</h3>
              <p>해외 뷰티템</p>
            </div>
            <div className="category-card">
              <div className="category-icon">👜</div>
              <h3>명품 가방</h3>
              <p>디자이너 브랜드</p>
            </div>
            <div className="category-card">
              <div className="category-icon">📱</div>
              <h3>전자기기</h3>
              <p>최신 가젯</p>
            </div>
            <div className="category-card">
              <div className="category-icon">👔</div>
              <h3>의류</h3>
              <p>패션 아이템</p>
            </div>
            <div className="category-card">
              <div className="category-icon">🎮</div>
              <h3>게임/완구</h3>
              <p>콜렉터 아이템</p>
            </div>
          </div>
        </div>
      </section>

      {/* Purchase Request Form */}
      <section className="form-section">
        <div className="container">
          <h2 className="section-title">구매 요청하기</h2>
          <form className="purchase-form">
            <div className="form-grid">
              <div className="form-group">
                <label>이름</label>
                <input type="text" placeholder="홍길동" required />
              </div>
              <div className="form-group">
                <label>연락처</label>
                <input type="tel" placeholder="010-1234-5678" required />
              </div>
              <div className="form-group">
                <label>이메일</label>
                <input type="email" placeholder="example@email.com" required />
              </div>
              <div className="form-group">
                <label>원하는 상품</label>
                <input type="text" placeholder="상품명을 입력하세요" required />
              </div>
              <div className="form-group full-width">
                <label>상품 URL</label>
                <input type="url" placeholder="https://..." />
              </div>
              <div className="form-group">
                <label>수량</label>
                <input type="number" min="1" defaultValue="1" />
              </div>
              <div className="form-group">
                <label>예산</label>
                <input type="text" placeholder="예: 50만원" />
              </div>
              <div className="form-group">
                <label>구매 국가</label>
                <select>
                  <option value="">선택하세요</option>
                  <option value="미국">미국</option>
                  <option value="일본">일본</option>
                  <option value="유럽">유럽</option>
                  <option value="중국">중국</option>
                  <option value="기타">기타</option>
                </select>
              </div>
              <div className="form-group">
                <label>배송 방법</label>
                <select>
                  <option value="특급">특급 배송 (3-5일)</option>
                  <option value="일반">일반 배송 (7-10일)</option>
                  <option value="선박">선박 배송 (20-30일)</option>
                </select>
              </div>
              <div className="form-group full-width">
                <label>상세 요청사항</label>
                <textarea rows={4} placeholder="추가 요청사항을 입력하세요"></textarea>
              </div>
            </div>
            <button type="submit" className="submit-button">
              구매 요청 제출하기
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-section">
              <h3>회사 소개</h3>
              <p>
                전 세계 상품을 빠르고 안전하게<br />
                구매대행하는 전문 서비스입니다
              </p>
            </div>
            <div className="footer-section">
              <h3>서비스</h3>
              <ul>
                <li><a href="#guide">이용 가이드</a></li>
                <li><a href="#products">인기 상품</a></li>
                <li><a href="#request">구매 요청</a></li>
                <li><a href="#tracking">배송 조회</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>고객 지원</h3>
              <ul>
                <li><a href="#faq">자주 묻는 질문</a></li>
                <li><a href="#guide">이용 가이드</a></li>
                <li><a href="#refund">환불 정책</a></li>
                <li><a href="#inquiry">1:1 문의</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>연락처</h3>
              <ul>
                <li>📧 support@example.com</li>
                <li>📞 02-1234-5678</li>
                <li>💬 카카오톡: @글로벌구매</li>
                <li>⏰ 24시간 연중무휴</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 글로벌구매대행. All rights reserved.</p>
            <div className="footer-links">
              <a href="#terms">이용약관</a>
              <a href="#privacy">개인정보처리방침</a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .hero-content {
          max-width: 800px;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .hero-description {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .cta-button {
          background: white;
          color: #667eea;
          padding: 1rem 3rem;
          font-size: 1.125rem;
          font-weight: 700;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .cta-button:hover {
          transform: scale(1.05);
        }

        .quick-features {
          display: flex;
          gap: 2rem;
          justify-content: center;
          margin-top: 2rem;
          font-size: 1rem;
          opacity: 0.9;
        }

        .stats-section {
          padding: 4rem 2rem;
          background: #0a0a0a;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .stat-card {
          background: #1a1a1a;
          padding: 2rem;
          border-radius: 12px;
          text-align: center;
          border: 1px solid #27272a;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          color: #3b82f6;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: #a1a1aa;
          font-size: 1rem;
        }

        .features-section,
        .categories-section {
          padding: 6rem 2rem;
          background: #0a0a0a;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 800;
          text-align: center;
          margin-bottom: 3rem;
        }

        .features-grid,
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .feature-card,
        .category-card {
          background: #1a1a1a;
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid #27272a;
          transition: all 0.3s;
          text-align: center;
        }

        .feature-card:hover,
        .category-card:hover {
          background: #252525;
          border-color: #3b82f6;
          transform: translateY(-5px);
        }

        .feature-icon,
        .category-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .feature-card h3,
        .category-card h3 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }

        .feature-card p,
        .category-card p {
          color: #a1a1aa;
          line-height: 1.6;
        }

        .form-section {
          padding: 6rem 2rem;
          background: #0a0a0a;
        }

        .purchase-form {
          max-width: 800px;
          margin: 0 auto;
          background: #1a1a1a;
          padding: 3rem;
          border-radius: 16px;
          border: 1px solid #27272a;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #e5e5e5;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 0.75rem;
          background: #0a0a0a;
          border: 1px solid #27272a;
          border-radius: 8px;
          color: white;
          font-size: 1rem;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #3b82f6;
        }

        .submit-button {
          width: 100%;
          padding: 1rem;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.125rem;
          font-weight: 700;
          cursor: pointer;
          margin-top: 1.5rem;
          transition: background 0.3s;
        }

        .submit-button:hover {
          background: #2563eb;
        }

        .footer {
          background: #1a1a1a;
          padding: 4rem 2rem 2rem;
          border-top: 1px solid #27272a;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .footer-section h3 {
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }

        .footer-section p {
          color: #a1a1aa;
          line-height: 1.6;
        }

        .footer-section ul {
          list-style: none;
        }

        .footer-section ul li {
          margin-bottom: 0.5rem;
        }

        .footer-section a {
          color: #a1a1aa;
          text-decoration: none;
          transition: color 0.3s;
        }

        .footer-section a:hover {
          color: white;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          border-top: 1px solid #27272a;
          color: #a1a1aa;
        }

        .footer-links {
          display: flex;
          gap: 2rem;
        }

        .footer-links a {
          color: #a1a1aa;
          text-decoration: none;
        }

        .footer-links a:hover {
          color: white;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .hero-description {
            font-size: 1rem;
          }

          .quick-features {
            flex-direction: column;
            gap: 0.5rem;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
