'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';

export default function SignupPage() {
  const router = useRouter();
  const { signUp, signInWithGoogle, signInWithKakao, signInWithNaver } = useAuth();

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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!formData.agreeTerms || !formData.agreePrivacy) {
      setError('필수 약관에 동의해주세요.');
      return;
    }

    setLoading(true);

    try {
      await signUp(formData.email, formData.password, formData.name, formData.phone);
      alert('회원가입이 완료되었습니다!');
      router.push('/');
    } catch (err: unknown) {
      console.error('회원가입 오류:', err);
      if (err && typeof err === 'object' && 'code' in err) {
        const firebaseError = err as { code: string };
        if (firebaseError.code === 'auth/email-already-in-use') {
          setError('이미 사용 중인 이메일입니다.');
        } else if (firebaseError.code === 'auth/weak-password') {
          setError('비밀번호는 6자 이상이어야 합니다.');
        } else if (firebaseError.code === 'auth/invalid-email') {
          setError('올바른 이메일 형식이 아닙니다.');
        } else {
          setError('회원가입 중 오류가 발생했습니다.');
        }
      } else {
        setError('회원가입 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError('');

    try {
      await signInWithGoogle();
      router.push('/');
    } catch (err) {
      console.error('Google 회원가입 오류:', err);
      setError('Google 로그인 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleKakaoSignup = async () => {
    setLoading(true);
    setError('');

    try {
      await signInWithKakao();
      router.push('/');
    } catch (err) {
      console.error('카카오 회원가입 오류:', err);
      setError('카카오 로그인 중 오류가 발생했습니다. 카카오 앱 키를 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleNaverSignup = async () => {
    setLoading(true);
    setError('');

    try {
      await signInWithNaver();
      router.push('/');
    } catch (err) {
      console.error('네이버 회원가입 오류:', err);
      setError('네이버 로그인 중 오류가 발생했습니다. 네이버 앱 설정을 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Header />

      <main className="signup-main">
        <div className="signup-card">
          <h1>회원가입</h1>
          <p className="subtitle">글로벌구매대행과 함께하세요</p>

          {error && <div className="error-message">{error}</div>}

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
                placeholder="6자 이상 입력해주세요"
                value={formData.password}
                onChange={handleChange}
                minLength={6}
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

            <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? '처리 중...' : '회원가입'}
            </button>
          </form>

          <div className="divider">
            <span>또는</span>
          </div>

          <div className="social-buttons">
            <button
              className="social-btn kakao"
              onClick={handleKakaoSignup}
              disabled={loading}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M9 0.5C4.029 0.5 0 3.729 0 7.708C0 10.241 1.598 12.465 4.064 13.692L3.034 17.119C2.966 17.352 3.228 17.541 3.437 17.406L7.548 14.742C8.025 14.815 8.509 14.854 9 14.854C13.971 14.854 18 11.687 18 7.708C18 3.729 13.971 0.5 9 0.5Z"
                  fill="#191919"
                />
              </svg>
              카카오로 시작하기
            </button>

            <button
              className="social-btn naver"
              onClick={handleNaverSignup}
              disabled={loading}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M12.207 9.567L5.553 0H0V18H5.793V8.433L12.447 18H18V0H12.207V9.567Z"
                  fill="white"
                />
              </svg>
              네이버로 시작하기
            </button>

            <button
              className="social-btn google"
              onClick={handleGoogleSignup}
              disabled={loading}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
                  fill="#4285F4"
                />
                <path
                  d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
                  fill="#34A853"
                />
                <path
                  d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                  fill="#FBBC05"
                />
                <path
                  d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
                  fill="#EA4335"
                />
              </svg>
              Google로 시작하기
            </button>
          </div>

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

        .error-message {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
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

        .signup-btn:hover:not(:disabled) {
          transform: scale(1.02);
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
        }

        .signup-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .divider {
          display: flex;
          align-items: center;
          margin: 1.5rem 0;
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

        .social-buttons {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .social-btn {
          width: 100%;
          padding: 0.875rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .social-btn.kakao {
          background: #FEE500;
          color: #191919;
          border: none;
        }

        .social-btn.kakao:hover:not(:disabled) {
          background: #e6cf00;
        }

        .social-btn.naver {
          background: #03C75A;
          color: white;
          border: none;
        }

        .social-btn.naver:hover:not(:disabled) {
          background: #02b351;
        }

        .social-btn.google {
          background: white;
          color: #333;
          border: 1px solid #ddd;
        }

        .social-btn.google:hover:not(:disabled) {
          background: #f5f5f5;
        }

        .social-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
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
