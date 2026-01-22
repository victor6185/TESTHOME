'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User as FirebaseUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { createUser, getUser, User } from '@/lib/firestore';

// Kakao SDK 타입 정의
declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Auth: {
        login: (options: {
          success: (authObj: { access_token: string }) => void;
          fail: (err: Error) => void;
        }) => void;
        logout: () => void;
      };
      API: {
        request: (options: {
          url: string;
          success: (res: KakaoUserResponse) => void;
          fail: (err: Error) => void;
        }) => void;
      };
    };
    naver: {
      LoginWithNaverId: new (options: NaverLoginOptions) => NaverLoginInstance;
    };
  }
}

interface KakaoUserResponse {
  id: number;
  kakao_account: {
    email?: string;
    profile?: {
      nickname?: string;
      profile_image_url?: string;
    };
  };
}

interface NaverLoginOptions {
  clientId: string;
  callbackUrl: string;
  isPopup: boolean;
  loginButton: { color: string; type: number; height: number };
  callbackHandle: boolean;
}

interface NaverLoginInstance {
  init: () => void;
  getLoginStatus: (callback: (status: boolean) => void) => void;
  user: {
    email: string;
    name: string;
    id: string;
    profile_image: string;
  };
}

interface AuthContextType {
  firebaseUser: FirebaseUser | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, phone?: string) => Promise<void>;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithKakao: () => Promise<void>;
  signInWithNaver: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 카카오 앱 키 (환경변수로 관리)
const KAKAO_APP_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY || '';
// 네이버 클라이언트 ID (환경변수로 관리)
const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID || '';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser);

      if (firebaseUser) {
        const userData = await getUser(firebaseUser.uid);
        setUser(userData);
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    // Kakao SDK 초기화
    if (typeof window !== 'undefined' && KAKAO_APP_KEY) {
      const script = document.createElement('script');
      script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js';
      script.async = true;
      script.onload = () => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init(KAKAO_APP_KEY);
        }
      };
      document.head.appendChild(script);
    }

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const userData = await getUser(result.user.uid);
    setUser(userData);
  };

  const signUp = async (email: string, password: string, name: string, phone?: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(result.user, { displayName: name });

    await createUser({
      uid: result.user.uid,
      email: email,
      name: name,
      phone: phone,
      grade: 'Silver',
    });

    const userData = await getUser(result.user.uid);
    setUser(userData);
  };

  const logout = async () => {
    // Kakao 로그아웃
    if (typeof window !== 'undefined' && window.Kakao?.Auth) {
      try {
        window.Kakao.Auth.logout();
      } catch (e) {
        console.log('Kakao logout:', e);
      }
    }

    await signOut(auth);
    setUser(null);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    let userData = await getUser(result.user.uid);

    if (!userData) {
      await createUser({
        uid: result.user.uid,
        email: result.user.email || '',
        name: result.user.displayName || '사용자',
        grade: 'Silver',
      });
      userData = await getUser(result.user.uid);
    }

    setUser(userData);
  };

  const signInWithKakao = async () => {
    return new Promise<void>((resolve, reject) => {
      if (typeof window === 'undefined' || !window.Kakao) {
        reject(new Error('Kakao SDK가 로드되지 않았습니다.'));
        return;
      }

      window.Kakao.Auth.login({
        success: () => {
          // 사용자 정보 요청
          window.Kakao.API.request({
            url: '/v2/user/me',
            success: async (res: KakaoUserResponse) => {
              try {
                const kakaoId = res.id.toString();
                const email = res.kakao_account?.email || `kakao_${kakaoId}@kakao.oauth`;
                const name = res.kakao_account?.profile?.nickname || '카카오 사용자';
                const password = `kakao_${kakaoId}_secure_password`;

                // Firebase에 로그인 시도
                try {
                  await signInWithEmailAndPassword(auth, email, password);
                } catch {
                  // 계정이 없으면 생성
                  const result = await createUserWithEmailAndPassword(auth, email, password);
                  await updateProfile(result.user, { displayName: name });
                  await createUser({
                    uid: result.user.uid,
                    email: email,
                    name: name,
                    grade: 'Silver',
                  });
                }

                const currentUser = auth.currentUser;
                if (currentUser) {
                  const userData = await getUser(currentUser.uid);
                  setUser(userData);
                }

                resolve();
              } catch (error) {
                reject(error);
              }
            },
            fail: (err: Error) => {
              reject(err);
            },
          });
        },
        fail: (err: Error) => {
          reject(err);
        },
      });
    });
  };

  const signInWithNaver = async () => {
    return new Promise<void>((resolve, reject) => {
      if (typeof window === 'undefined') {
        reject(new Error('브라우저 환경에서만 사용 가능합니다.'));
        return;
      }

      // 네이버 로그인은 팝업 방식으로 처리
      const CALLBACK_URL = `${window.location.origin}/api/auth/naver/callback`;
      const STATE = Math.random().toString(36).substring(7);

      // 네이버 OAuth URL
      const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(CALLBACK_URL)}&state=${STATE}`;

      // 팝업 열기
      const popup = window.open(
        naverAuthUrl,
        'naverLogin',
        'width=500,height=600,scrollbars=yes'
      );

      // 팝업 메시지 수신
      const messageHandler = async (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;

        if (event.data.type === 'NAVER_LOGIN_SUCCESS') {
          window.removeEventListener('message', messageHandler);
          popup?.close();

          const { naverId, email, name } = event.data;
          const userEmail = email || `naver_${naverId}@naver.oauth`;
          const password = `naver_${naverId}_secure_password`;

          try {
            // Firebase에 로그인 시도
            try {
              await signInWithEmailAndPassword(auth, userEmail, password);
            } catch {
              // 계정이 없으면 생성
              const result = await createUserWithEmailAndPassword(auth, userEmail, password);
              await updateProfile(result.user, { displayName: name || '네이버 사용자' });
              await createUser({
                uid: result.user.uid,
                email: userEmail,
                name: name || '네이버 사용자',
                grade: 'Silver',
              });
            }

            const currentUser = auth.currentUser;
            if (currentUser) {
              const userData = await getUser(currentUser.uid);
              setUser(userData);
            }

            resolve();
          } catch (error) {
            reject(error);
          }
        } else if (event.data.type === 'NAVER_LOGIN_FAIL') {
          window.removeEventListener('message', messageHandler);
          popup?.close();
          reject(new Error(event.data.error || '네이버 로그인에 실패했습니다.'));
        }
      };

      window.addEventListener('message', messageHandler);

      // 팝업 닫힘 감지
      const checkPopupClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkPopupClosed);
          window.removeEventListener('message', messageHandler);
        }
      }, 1000);
    });
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const value = {
    firebaseUser,
    user,
    loading,
    signIn,
    signUp,
    logout,
    signInWithGoogle,
    signInWithKakao,
    signInWithNaver,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
