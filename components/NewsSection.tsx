'use client';

import { useState, useEffect } from 'react';

interface NewsItem {
  title: string;
  link: string;
  thumbnail: string;
  description: string;
  pubDate: string;
}

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news');
      const data = await response.json();
      if (data.items && data.hasNews) {
        setNews(data.items);
        setLastUpdate(new Date().toLocaleTimeString('ko-KR'));
      } else {
        setNews([]); // 관련 뉴스가 없으면 빈 배열
      }
    } catch (error) {
      console.error('뉴스 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();

    // 1시간마다 새로고침
    const interval = setInterval(fetchNews, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('ko-KR', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <section style={{
        padding: '60px 20px',
        backgroundColor: '#0f0f0f',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ color: '#a1a1aa' }}>뉴스를 불러오는 중...</div>
        </div>
      </section>
    );
  }

  // 관련 뉴스가 없으면 섹션을 표시하지 않음
  if (news.length === 0) {
    return null;
  }

  return (
    <section style={{
      padding: '60px 20px',
      backgroundColor: '#0f0f0f',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* 헤더 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
        }}>
          <div>
            <h2 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '8px',
            }}>
              📰 최신 뉴스
            </h2>
            <p style={{ color: '#a1a1aa', fontSize: '14px' }}>
              해외직구 & 트렌드 소식
            </p>
          </div>
          <div style={{
            fontSize: '12px',
            color: '#71717a',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#22c55e',
              animation: 'pulse 2s infinite',
            }} />
            마지막 업데이트: {lastUpdate}
          </div>
        </div>

        {/* 뉴스 그리드 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '24px',
        }}>
          {news.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                backgroundColor: '#1a1a1a',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #27272a',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* 썸네일 */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '180px',
                overflow: 'hidden',
              }}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                  }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x180?text=No+Image';
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: 'rgba(102, 126, 234, 0.9)',
                  color: 'white',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: '600',
                }}>
                  NEW
                </div>
              </div>

              {/* 콘텐츠 */}
              <div style={{ padding: '16px' }}>
                <h3 style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#ffffff',
                  marginBottom: '8px',
                  lineHeight: '1.4',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '13px',
                  color: '#a1a1aa',
                  lineHeight: '1.5',
                  marginBottom: '12px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {item.description}
                </p>
                <div style={{
                  fontSize: '12px',
                  color: '#71717a',
                }}>
                  {formatDate(item.pubDate)}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* 더보기 링크 */}
        <div style={{
          textAlign: 'center',
          marginTop: '32px',
        }}>
          <a
            href="https://www.yonhapnewstv.co.kr"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#667eea',
              fontSize: '14px',
              textDecoration: 'none',
              padding: '10px 20px',
              border: '1px solid #667eea',
              borderRadius: '8px',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#667eea';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#667eea';
            }}
          >
            연합뉴스TV에서 더보기 →
          </a>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
