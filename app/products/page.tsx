'use client';

import Link from 'next/link';
import Header from '@/components/Header';

// 샘플 상품 데이터
const products = [
  {
    id: 1,
    name: '나이키 에어맥스 97 실버불릿',
    brand: 'Nike',
    category: '스니커즈',
    price: 189000,
    originalPrice: 229000,
    image: '👟',
    country: '미국',
    badge: 'HOT',
  },
  {
    id: 2,
    name: '샤넬 클래식 플랩백 미디움',
    brand: 'Chanel',
    category: '명품가방',
    price: 8900000,
    originalPrice: 10500000,
    image: '👜',
    country: '프랑스',
    badge: 'LUXURY',
  },
  {
    id: 3,
    name: '라메르 크림 60ml',
    brand: 'La Mer',
    category: '화장품',
    price: 320000,
    originalPrice: 420000,
    image: '💄',
    country: '미국',
    badge: 'SALE',
  },
  {
    id: 4,
    name: '애플 아이폰 16 Pro Max 256GB',
    brand: 'Apple',
    category: '전자기기',
    price: 1590000,
    originalPrice: 1900000,
    image: '📱',
    country: '미국',
    badge: 'NEW',
  },
  {
    id: 5,
    name: '발렌시아가 트리플S 스니커즈',
    brand: 'Balenciaga',
    category: '스니커즈',
    price: 890000,
    originalPrice: 1100000,
    image: '👟',
    country: '이탈리아',
    badge: '',
  },
  {
    id: 6,
    name: '닌텐도 스위치 2 콘솔',
    brand: 'Nintendo',
    category: '게임/완구',
    price: 450000,
    originalPrice: 520000,
    image: '🎮',
    country: '일본',
    badge: 'HOT',
  },
  {
    id: 7,
    name: '구찌 GG 마몽 미니백',
    brand: 'Gucci',
    category: '명품가방',
    price: 1890000,
    originalPrice: 2300000,
    image: '👜',
    country: '이탈리아',
    badge: '',
  },
  {
    id: 8,
    name: '에스티로더 갈색병 에센스 100ml',
    brand: 'Estee Lauder',
    category: '화장품',
    price: 145000,
    originalPrice: 189000,
    image: '💄',
    country: '미국',
    badge: 'SALE',
  },
];

const categories = ['전체', '스니커즈', '명품가방', '화장품', '전자기기', '게임/완구', '의류'];

export default function ProductsPage() {
  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR');
  };

  const getDiscount = (original: number, current: number) => {
    return Math.round((1 - current / original) * 100);
  };

  return (
    <div className="page-container">
      <Header />

      <main className="products-main">
        {/* Hero Section */}
        <section className="products-hero">
          <h1>상품 소개</h1>
          <p>전 세계 인기 상품을 구매대행으로 만나보세요</p>
        </section>

        {/* Categories Filter */}
        <section className="filter-section">
          <div className="container">
            <div className="categories-filter">
              {categories.map((cat) => (
                <button key={cat} className="filter-btn">
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="products-section">
          <div className="container">
            <div className="products-grid">
              {products.map((product) => (
                <Link href={`/products/${product.id}`} key={product.id} className="product-card">
                  {product.badge && (
                    <span className={`badge badge-${product.badge.toLowerCase()}`}>
                      {product.badge}
                    </span>
                  )}
                  <div className="product-image">
                    <span>{product.image}</span>
                  </div>
                  <div className="product-info">
                    <span className="product-brand">{product.brand}</span>
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-meta">
                      <span className="country">🌍 {product.country}</span>
                      <span className="category">{product.category}</span>
                    </div>
                    <div className="product-price">
                      <span className="discount">
                        {getDiscount(product.originalPrice, product.price)}%
                      </span>
                      <span className="current-price">
                        ₩{formatPrice(product.price)}
                      </span>
                      <span className="original-price">
                        ₩{formatPrice(product.originalPrice)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>원하는 상품이 없으신가요?</h2>
              <p>직접 구매 요청을 하시면 전 세계 어디서든 찾아드립니다</p>
              <Link href="/#request" className="cta-btn">
                구매 요청하기
              </Link>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .page-container {
          min-height: 100vh;
          background: #0a0a0a;
        }

        .products-main {
          padding-top: 80px;
        }

        .products-hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 4rem 2rem;
          text-align: center;
        }

        .products-hero h1 {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .products-hero p {
          font-size: 1.125rem;
          opacity: 0.9;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .filter-section {
          padding: 2rem 0;
          border-bottom: 1px solid #27272a;
        }

        .categories-filter {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .filter-btn {
          padding: 0.625rem 1.25rem;
          background: #1a1a1a;
          border: 1px solid #27272a;
          border-radius: 25px;
          color: #a1a1aa;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s;
        }

        .filter-btn:first-child {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
        }

        .filter-btn:hover {
          border-color: #667eea;
          color: white;
        }

        .products-section {
          padding: 3rem 0;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .product-card {
          background: #1a1a1a;
          border: 1px solid #27272a;
          border-radius: 16px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s;
          position: relative;
        }

        .product-card:hover {
          border-color: #667eea;
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.2);
        }

        .badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          z-index: 1;
        }

        .badge-hot {
          background: #ef4444;
          color: white;
        }

        .badge-new {
          background: #22c55e;
          color: white;
        }

        .badge-sale {
          background: #f59e0b;
          color: white;
        }

        .badge-luxury {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .product-image {
          background: #0f0f0f;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-image span {
          font-size: 5rem;
        }

        .product-info {
          padding: 1.25rem;
        }

        .product-brand {
          font-size: 0.8rem;
          color: #667eea;
          font-weight: 600;
        }

        .product-name {
          font-size: 1rem;
          font-weight: 600;
          margin: 0.5rem 0;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-meta {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .country,
        .category {
          font-size: 0.8rem;
          color: #71717a;
        }

        .product-price {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .discount {
          color: #ef4444;
          font-weight: 700;
          font-size: 1rem;
        }

        .current-price {
          font-size: 1.125rem;
          font-weight: 700;
        }

        .original-price {
          font-size: 0.875rem;
          color: #71717a;
          text-decoration: line-through;
        }

        .cta-section {
          padding: 4rem 0;
          background: #0f0f0f;
        }

        .cta-content {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .cta-content h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .cta-content p {
          color: #a1a1aa;
          margin-bottom: 2rem;
        }

        .cta-btn {
          display: inline-block;
          padding: 1rem 2.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          border-radius: 50px;
          font-weight: 700;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .cta-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
        }

        @media (max-width: 1024px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .products-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
