'use client';

import Link from 'next/link';
import { useState } from 'react';
import Header from '@/components/Header';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false,
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
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!formData.agreeTerms || !formData.agreePrivacy) {
      alert('필수 약관에 동의해주세요.');
      return;
    }
    console.log('회원가입 데이터:', formData);
    alert('회원가입이 완료되었습니다!');
  };

  return (
    <div className="page-container">
      <Header />

      <main className="signup-main">
        <div className="signup-card">
          <h1>회원가입</h1>
          <p className="subtitle">글로벌구매대행과 함께하세요</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>이름</label>
              <input
                type="text"
                name="name"
                placeholder="홍길동"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

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
                placeholder="8자 이상 입력해주세요"
                value={formData.password}
                onChange={handleChange}
                minLength={8}
                required
              />
            </div>

            <div className="form-group">
              <label>비밀번호 확인</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="비밀번호를 다시 입력해주세요"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>연락처</label>
              <input
                type="tel"
                name="phone"
                placeholder="010-1234-5678"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="agreement-section">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                />
                <span>[필수] 이용약관에 동의합니다</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreePrivacy"
                  checked={formData.agreePrivacy}
                  onChange={handleChange}
                />
                <span>[필수] 개인정보 처리방침에 동의합니다</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeMarketing"
                  checked={formData.agreeMarketing}
                  onChange={handleChange}
                />
                <span>[선택] 마케팅 정보 수신에 동의합니다</span>
              </label>
            </div>

            <button type="submit" className="signup-btn">
              회원가입
            </button>
          </form>

          <div className="login-link">
            이미 계정이 있으신가요? <Link href="/login">로그인</Link>
          </div>
        </div>
      </main>

      <style jsx>{`
        .page-container {
          min-height: 100vh;
          background: #0a0a0a;
        }

        .signup-main {
          padding-top: 100px;
          padding-bottom: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }

        .signup-card {
          background: #1a1a1a;
          border: 1px solid #27272a;
          border-radius: 16px;
          padding: 3rem;
          width: 100%;
          max-width: 450px;
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

        .agreement-section {
          margin: 1.5rem 0;
          padding: 1rem;
          background: #0a0a0a;
          border-radius: 8px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          cursor: pointer;
          color: #a1a1aa;
          font-size: 0.9rem;
        }

        .checkbox-label:last-child {
          margin-bottom: 0;
        }

        .checkbox-label input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #667eea;
        }

        .signup-btn {
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

        .signup-btn:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
        }

        .login-link {
          text-align: center;
          margin-top: 1.5rem;
          color: #a1a1aa;
        }

        .login-link a {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
        }

        .login-link a:hover {
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .signup-card {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
