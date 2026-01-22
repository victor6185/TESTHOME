'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { getProducts, seedProducts, Product } from '@/lib/firestore';

// 폴백용 샘플 상품 데이터
const fallbackProducts = [
  {
    id: '1',
    name: '나이키 에어맥스 97 실버불릿',
    brand: 'Nike',
    category: '스니커즈',
    price: 189000,
    originalPrice: 229000,
    image: '👟',
    country: '미국',
    badge: 'HOT',
    description: '',
    specs: [],
  },
  {
    id: '2',
    name: '샤넬 클래식 플랩백 미디움',
    brand: 'Chanel',
    category: '명품가방',
    price: 8900000,
    originalPrice: 10500000,
    image: '👜',
    country: '프랑스',
    badge: 'LUXURY',
    description: '',
    specs: [],
  },
  {
    id: '3',
    name: '라메르 크림 60ml',
    brand: 'La Mer',
    category: '화장품',
    price: 320000,
    originalPrice: 420000,
    image: '💄',
    country: '미국',
    badge: 'SALE',
    description: '',
    specs: [],
  },
  {
    id: '4',
    name: '애플 아이폰 16 Pro Max 256GB',
    brand: 'Apple',
    category: '전자기기',
    price: 1590000,
    originalPrice: 1900000,
    image: '📱',
    country: '미국',
    badge: 'NEW',
    description: '',
    specs: [],
  },
  {
    id: '99',
    name: '테스트 상품 (결제 테스트용)',
    brand: 'TEST',
    category: '테스트',
    price: 100,
    originalPrice: 1000,
    image: '🧪',
    country: '한국',
    badge: 'TEST',
    description: '토스페이먼츠 결제 테스트를 위한 100원 상품입니다.',
    specs: ['결제 테스트용', '100원', '환불 가능', '테스트 전용'],
  },
];

const categories = ['전체', '스니커즈', '명품가방', '화장품', '전자기기', '게임/완구', '테스트'];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      if (data.length === 0) {
        // Firestore가 비어있으면 폴백 데이터 사용
        setProducts(fallbackProducts);
      } else {
        setProducts(data);
      }
    } catch (error) {
      console.error('상품 로드 실패:', error);
      // 에러 시 폴백 데이터 사용
      setProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  };

  const handleSeedProducts = async () => {
    if (seeding) return;
    setSeeding(true);
    try {
      await seedProducts();
      await loadProducts();
      alert('상품 데이터가 Firestore에 추가되었습니다!');
    } catch (error) {
      console.error('시딩 실패:', error);
      alert('상품 데이터 추가 중 오류가 발생했습니다.');
    } finally {
      setSeeding(false);
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR');
  };

  const getDiscount = (original: number, current: number) => {
    return Math.round((1 - current / original) * 100);
  };

  const filteredProducts = selectedCategory === '전체'
    ? products
    : products.filter(p => p.category === selectedCategory);

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
                <button
                  key={cat}
                  className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="products-section">
          <div className="container">
            {loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>상품을 불러오는 중...</p>
              </div>
            ) : (
              <>
                {products.length === 0 && (
                  <div className="empty-state">
                    <p>등록된 상품이 없습니다.</p>
                    <button
                      onClick={handleSeedProducts}
                      className="seed-btn"
                      disabled={seeding}
                    >
                      {seeding ? '추가 중...' : '샘플 상품 추가하기'}
                    </button>
                  </div>
                )}
                <div className="products-grid">
                  {filteredProducts.map((product) => (
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
              </>
            )}
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

        .filter-btn.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
        }

        .filter-btn:hover:not(.active) {
          border-color: #667eea;
          color: white;
        }

        .loading-state {
          text-align: center;
          padding: 4rem;
        }

        .spinner {
          width: 48px;
          height: 48px;
          border: 4px solid #27272a;
          border-top-color: #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .loading-state p {
          color: #a1a1aa;
        }

        .empty-state {
          text-align: center;
          padding: 4rem;
        }

        .empty-state p {
          color: #a1a1aa;
          margin-bottom: 1.5rem;
        }

        .seed-btn {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .seed-btn:hover:not(:disabled) {
          transform: scale(1.05);
        }

        .seed-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
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

        .badge-test {
          background: #71717a;
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
