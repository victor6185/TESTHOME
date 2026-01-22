'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <Link href="/" className="logo">
          글로벌구매대행
        </Link>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <Link href="/about" className="nav-link">회사 소개</Link>
          <Link href="/products" className="nav-link">상품 소개</Link>
          <Link href="/#request" className="nav-link">구매 요청</Link>
        </nav>

        <div className="auth-buttons">
          <Link href="/login" className="btn-login">로그인</Link>
          <Link href="/signup" className="btn-signup">회원가입</Link>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid #27272a;
        }

        .header-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 800;
          color: white;
          text-decoration: none;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav {
          display: flex;
          gap: 2rem;
        }

        .nav-link {
          color: #a1a1aa;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s;
        }

        .nav-link:hover {
          color: white;
        }

        .auth-buttons {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .btn-login {
          color: #a1a1aa;
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 1rem;
          transition: color 0.3s;
        }

        .btn-login:hover {
          color: white;
        }

        .btn-signup {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          font-weight: 600;
          padding: 0.5rem 1.5rem;
          border-radius: 25px;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .btn-signup:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .mobile-menu-btn {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px;
        }

        .mobile-menu-btn span {
          display: block;
          width: 25px;
          height: 2px;
          background: white;
          transition: all 0.3s;
        }

        @media (max-width: 768px) {
          .nav {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(10, 10, 10, 0.98);
            flex-direction: column;
            padding: 1rem 2rem;
            gap: 1rem;
            border-bottom: 1px solid #27272a;
          }

          .nav-open {
            display: flex;
          }

          .auth-buttons {
            display: none;
          }

          .mobile-menu-btn {
            display: flex;
          }
        }
      `}</style>
    </header>
  );
}
