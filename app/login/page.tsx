'use client';

import Link from 'next/link';
import { useState } from 'react';
import Header from '@/components/Header';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('로그인 데이터:', formData);
    alert('로그인 기능은 백엔드 연동 후 사용 가능합니다.');
  };

  return (
    <div className="page-container">
      <Header />

      <main className="login-main">
        <div className="login-card">
          <h1>로그인</h1>
          <p className="subtitle">다시 만나서 반갑습니다!</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>이메일</label>
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>비밀번호</label>
              <input
                type="password"
                name="password"
                placeholder="비밀번호를 입력해주세요"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="options-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span>로그인 유지</span>
              </label>
              <Link href="/forgot-password" className="forgot-link">
                비밀번호 찾기
              </Link>
            </div>

            <button type="submit" className="login-btn">
              로그인
            </button>
          </form>

          <div className="divider">
            <span>또는</span>
          </div>

          <div className="social-login">
            <button className="social-btn kakao">
              카카오로 시작하기
            </button>
            <button className="social-btn naver">
              네이버로 시작하기
            </button>
            <button className="social-btn google">
              Google로 시작하기
            </button>
          </div>

          <div className="signup-link">
            아직 계정이 없으신가요? <Link href="/signup">회원가입</Link>
          </div>
        </div>
      </main>

      <style jsx>{`
        .page-container {
          min-height: 100vh;
          background: #0a0a0a;
        }

        .login-main {
          padding-top: 100px;
          padding-bottom: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }

        .login-card {
          background: #1a1a1a;
          border: 1px solid #27272a;
          border-radius: 16px;
          padding: 3rem;
          width: 100%;
          max-width: 420px;
          margin: 0 1rem;
        }

        h1 {
          font-size: 2rem;
          font-weight: 800;
          text-align: center;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          text-align: center;
          color: #a1a1aa;
          margin-bottom: 2rem;
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
          transition: border-color 0.3s;
        }

        .form-group input:focus {
          outline: none;
          border-color: #667eea;
        }

        .options-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          color: #a1a1aa;
          font-size: 0.9rem;
        }

        .checkbox-label input[type="checkbox"] {
          width: 16px;
          height: 16px;
          cursor: pointer;
          accent-color: #667eea;
        }

        .forgot-link {
          color: #667eea;
          text-decoration: none;
          font-size: 0.9rem;
        }

        .forgot-link:hover {
          text-decoration: underline;
        }

        .login-btn {
          width: 100%;
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

        .login-btn:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
        }

        .divider {
          display: flex;
          align-items: center;
          margin: 2rem 0;
          color: #52525b;
        }

        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #27272a;
        }

        .divider span {
          padding: 0 1rem;
          font-size: 0.875rem;
        }

        .social-login {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .social-btn {
          width: 100%;
          padding: 0.875rem;
          border: 1px solid #27272a;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .social-btn.kakao {
          background: #FEE500;
          color: #191919;
          border: none;
        }

        .social-btn.kakao:hover {
          background: #e6cf00;
        }

        .social-btn.naver {
          background: #03C75A;
          color: white;
          border: none;
        }

        .social-btn.naver:hover {
          background: #02b351;
        }

        .social-btn.google {
          background: white;
          color: #333;
          border: 1px solid #ddd;
        }

        .social-btn.google:hover {
          background: #f5f5f5;
        }

        .signup-link {
          text-align: center;
          margin-top: 2rem;
          color: #a1a1aa;
        }

        .signup-link a {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
        }

        .signup-link a:hover {
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
