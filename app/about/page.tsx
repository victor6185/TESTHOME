'use client';

import Header from '@/components/Header';

export default function AboutPage() {
  return (
    <div className="page-container">
      <Header />

      <main className="about-main">
        {/* Hero Section */}
        <section className="about-hero">
          <h1>회사 소개</h1>
          <p>전 세계 상품을 고객에게 안전하게 전달합니다</p>
        </section>

        {/* Company Info */}
        <section className="company-info">
          <div className="container">
            <div className="info-grid">
              <div className="info-content">
                <h2>글로벌구매대행이란?</h2>
                <p>
                  글로벌구매대행은 2020년 설립 이후, 해외 직구의 복잡함을 해소하고
                  고객에게 최고의 해외 쇼핑 경험을 제공하기 위해 노력해왔습니다.
                </p>
                <p>
                  미국, 일본, 유럽 등 전 세계 30개국 이상의 상품을 빠르고 안전하게
                  대신 구매하여 배송해드리는 전문 구매대행 서비스입니다.
                </p>
                <p>
                  숙련된 전문가들이 상품 검수부터 배송까지 모든 과정을 꼼꼼하게
                  관리하여 정품 보장과 안전한 거래를 약속드립니다.
                </p>
              </div>
              <div className="info-image">
                <div className="image-placeholder">
                  <span>🌍</span>
                  <p>Global Shipping</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mission-section">
          <div className="container">
            <h2>미션 & 비전</h2>
            <div className="mission-grid">
              <div className="mission-card">
                <div className="mission-icon">🎯</div>
                <h3>미션</h3>
                <p>
                  전 세계 모든 상품을 언어와 거리의 장벽 없이
                  누구나 쉽게 구매할 수 있도록 돕습니다.
                </p>
              </div>
              <div className="mission-card">
                <div className="mission-icon">🚀</div>
                <h3>비전</h3>
                <p>
                  아시아 최고의 글로벌 구매대행 플랫폼으로 성장하여
                  더 많은 고객에게 세계를 연결합니다.
                </p>
              </div>
              <div className="mission-card">
                <div className="mission-icon">💎</div>
                <h3>핵심 가치</h3>
                <p>
                  신뢰, 투명성, 고객 만족을 최우선으로
                  정직한 서비스를 제공합니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">15,000+</span>
                <span className="stat-label">누적 구매 건수</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">98.7%</span>
                <span className="stat-label">고객 만족도</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">30+</span>
                <span className="stat-label">서비스 국가</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5년+</span>
                <span className="stat-label">업력</span>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="team-section">
          <div className="container">
            <h2>전문가 팀</h2>
            <div className="team-grid">
              <div className="team-card">
                <div className="team-avatar">👨‍💼</div>
                <h3>구매팀</h3>
                <p>각 국가별 전문 바이어가 최적의 가격과 정품을 확보합니다</p>
              </div>
              <div className="team-card">
                <div className="team-avatar">👩‍🔬</div>
                <h3>검수팀</h3>
                <p>철저한 품질 검수로 불량품 없는 안전한 상품을 보장합니다</p>
              </div>
              <div className="team-card">
                <div className="team-avatar">👨‍💻</div>
                <h3>고객지원팀</h3>
                <p>24시간 실시간 상담으로 모든 문의에 신속히 답변드립니다</p>
              </div>
              <div className="team-card">
                <div className="team-avatar">📦</div>
                <h3>물류팀</h3>
                <p>안전한 포장과 빠른 배송으로 상품을 전달합니다</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="contact-section">
          <div className="container">
            <h2>문의하기</h2>
            <div className="contact-grid">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <span>support@globalpurchase.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>02-1234-5678</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">💬</span>
                <span>카카오톡: @글로벌구매</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>서울특별시 강남구 테헤란로 123</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .page-container {
          min-height: 100vh;
          background: #0a0a0a;
        }

        .about-main {
          padding-top: 80px;
        }

        .about-hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 6rem 2rem;
          text-align: center;
        }

        .about-hero h1 {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .about-hero p {
          font-size: 1.25rem;
          opacity: 0.9;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .company-info {
          padding: 6rem 0;
        }

        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .info-content h2 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          color: #667eea;
        }

        .info-content p {
          color: #a1a1aa;
          line-height: 1.8;
          margin-bottom: 1rem;
        }

        .image-placeholder {
          background: #1a1a1a;
          border: 1px solid #27272a;
          border-radius: 16px;
          height: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .image-placeholder span {
          font-size: 5rem;
          margin-bottom: 1rem;
        }

        .image-placeholder p {
          color: #a1a1aa;
        }

        .mission-section {
          padding: 6rem 0;
          background: #0f0f0f;
        }

        .mission-section h2 {
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 3rem;
        }

        .mission-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .mission-card {
          background: #1a1a1a;
          border: 1px solid #27272a;
          border-radius: 16px;
          padding: 2.5rem;
          text-align: center;
          transition: all 0.3s;
        }

        .mission-card:hover {
          border-color: #667eea;
          transform: translateY(-5px);
        }

        .mission-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .mission-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .mission-card p {
          color: #a1a1aa;
          line-height: 1.6;
        }

        .stats-section {
          padding: 4rem 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          text-align: center;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
        }

        .stat-number {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 1rem;
          opacity: 0.9;
        }

        .team-section {
          padding: 6rem 0;
        }

        .team-section h2 {
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 3rem;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .team-card {
          background: #1a1a1a;
          border: 1px solid #27272a;
          border-radius: 16px;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s;
        }

        .team-card:hover {
          border-color: #667eea;
        }

        .team-avatar {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .team-card h3 {
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
        }

        .team-card p {
          color: #a1a1aa;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .contact-section {
          padding: 6rem 0;
          background: #0f0f0f;
        }

        .contact-section h2 {
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 3rem;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: #1a1a1a;
          padding: 1.25rem 1.5rem;
          border-radius: 12px;
          border: 1px solid #27272a;
        }

        .contact-icon {
          font-size: 1.5rem;
        }

        .contact-item span:last-child {
          color: #a1a1aa;
        }

        @media (max-width: 1024px) {
          .team-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .about-hero h1 {
            font-size: 2rem;
          }

          .info-grid {
            grid-template-columns: 1fr;
          }

          .mission-grid {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .team-grid {
            grid-template-columns: 1fr;
          }

          .contact-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
