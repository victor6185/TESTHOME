'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [tempApiKey, setTempApiKey] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // localStorage에서 API 키 불러오기
  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setTempApiKey(savedKey);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const saveApiKey = () => {
    if (tempApiKey.trim()) {
      localStorage.setItem('gemini_api_key', tempApiKey.trim());
      setApiKey(tempApiKey.trim());
      setShowSettings(false);
      setError('');
    }
  };

  const clearApiKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    setTempApiKey('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!apiKey) {
      setError('API 키를 먼저 설정해주세요.');
      setShowSettings(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          apiKey,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '응답 오류가 발생했습니다.');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
      };
      setMessages((prev) => [...prev, assistantMessage]);

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        assistantContent += chunk;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessage.id
              ? { ...m, content: assistantContent }
              : m
          )
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* 플로팅 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
          </svg>
        )}
      </button>

      {/* 챗봇 창 */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '24px',
            width: '380px',
            height: '520px',
            backgroundColor: '#1a1a1a',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 999,
            border: '1px solid #27272a',
          }}
        >
          {/* 헤더 */}
          <div
            style={{
              padding: '16px 20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: '20px' }}>🤖</span>
              </div>
              <div>
                <div style={{ fontWeight: '600', fontSize: '16px' }}>AI 상담원</div>
                <div style={{ fontSize: '12px', opacity: 0.9 }}>
                  {apiKey ? '🟢 연결됨' : '🔴 API 키 필요'}
                </div>
              </div>
            </div>
            {/* 설정 버튼 */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: 'rgba(255,255,255,0.2)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s',
              }}
              title="API 키 설정"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
              </svg>
            </button>
          </div>

          {/* 설정 패널 */}
          {showSettings && (
            <div
              style={{
                padding: '16px',
                backgroundColor: '#0f0f0f',
                borderBottom: '1px solid #27272a',
              }}
            >
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff', marginBottom: '8px' }}>
                  🔑 Gemini API 키 설정
                </div>
                <div style={{ fontSize: '12px', color: '#a1a1aa', marginBottom: '12px', lineHeight: '1.5' }}>
                  1. <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" style={{ color: '#667eea', textDecoration: 'underline' }}>Google AI Studio</a> 접속<br />
                  2. "Create API Key" 클릭<br />
                  3. 생성된 키를 아래에 붙여넣기
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="password"
                  value={tempApiKey}
                  onChange={(e) => setTempApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  style={{
                    flex: 1,
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #27272a',
                    backgroundColor: '#1a1a1a',
                    color: 'white',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
                <button
                  onClick={saveApiKey}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  저장
                </button>
              </div>
              {apiKey && (
                <button
                  onClick={clearApiKey}
                  style={{
                    marginTop: '8px',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: '1px solid #ef4444',
                    backgroundColor: 'transparent',
                    color: '#ef4444',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  키 삭제
                </button>
              )}
            </div>
          )}

          {/* 에러 메시지 */}
          {error && (
            <div
              style={{
                padding: '10px 16px',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderBottom: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#ef4444',
                fontSize: '13px',
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* 메시지 영역 */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {messages.length === 0 && (
              <div
                style={{
                  textAlign: 'center',
                  color: '#a1a1aa',
                  marginTop: '30px',
                }}
              >
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>👋</div>
                <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                  안녕하세요! 구매대행 관련<br />
                  무엇이든 물어보세요.
                  {!apiKey && (
                    <div style={{ marginTop: '16px', color: '#667eea' }}>
                      ⬆️ 먼저 우측 상단 🔑 버튼을<br />
                      클릭하여 API 키를 설정해주세요.
                    </div>
                  )}
                </div>
              </div>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '12px 16px',
                    borderRadius:
                      m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    backgroundColor: m.role === 'user' ? '#667eea' : '#27272a',
                    color: 'white',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: '16px 16px 16px 4px',
                    backgroundColor: '#27272a',
                    color: '#a1a1aa',
                    fontSize: '14px',
                  }}
                >
                  <span className="typing-dots">●●●</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 입력 영역 */}
          <form
            onSubmit={handleSubmit}
            style={{
              padding: '16px',
              borderTop: '1px solid #27272a',
              display: 'flex',
              gap: '8px',
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={apiKey ? '메시지를 입력하세요...' : 'API 키를 먼저 설정해주세요'}
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '24px',
                border: '1px solid #27272a',
                backgroundColor: '#0a0a0a',
                color: 'white',
                fontSize: '14px',
                outline: 'none',
              }}
              disabled={isLoading || !apiKey}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim() || !apiKey}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: 'none',
                background:
                  input.trim() && apiKey
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : '#27272a',
                cursor: input.trim() && apiKey ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s ease',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      )}

      <style jsx global>{`
        @keyframes dots {
          0%, 20% { opacity: 0.2; }
          40% { opacity: 1; }
          100% { opacity: 0.2; }
        }
        .typing-dots {
          display: inline-flex;
          gap: 2px;
        }
        .typing-dots::before,
        .typing-dots::after,
        .typing-dots {
          animation: dots 1.4s infinite;
        }
      `}</style>
    </>
  );
}
