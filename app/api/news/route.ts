import { NextResponse } from 'next/server';

interface NewsItem {
  title: string;
  link: string;
  thumbnail: string;
  description: string;
  pubDate: string;
}

// 구매대행 관련 키워드
const RELATED_KEYWORDS = [
  '구매대행', '해외직구', '직구', '해외쇼핑', '수입',
  '명품', '브랜드', '패션', '뷰티', '화장품',
  '스니커즈', '운동화', '한정판', '나이키', '아디다스',
  '애플', '아이폰', '갤럭시', '전자제품', 'IT',
  '쇼핑', '할인', '블랙프라이데이', '세일',
  '관세', '통관', '배송', '물류',
  '아마존', '이베이', '알리', '타오바오',
  '미국', '일본', '중국', '유럽', '독일', '영국', '프랑스',
  '환율', '달러', '엔화', '위안',
  '럭셔리', '샤넬', '구찌', '루이비통', '에르메스',
  '소비', '트렌드', '인기', '핫딜'
];

function isRelatedNews(title: string, description: string): boolean {
  const text = (title + ' ' + description).toLowerCase();
  return RELATED_KEYWORDS.some(keyword => text.includes(keyword.toLowerCase()));
}

export async function GET() {
  try {
    const response = await fetch('https://www.yonhapnewstv.co.kr/browse/feed/', {
      next: { revalidate: 3600 }, // 1시간마다 캐시 갱신
    });

    if (!response.ok) {
      throw new Error('RSS 피드를 가져올 수 없습니다.');
    }

    const xml = await response.text();

    // XML 파싱
    const items: NewsItem[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xml)) !== null && items.length < 6) {
      const itemXml = match[1];

      // 제목 추출
      const titleMatch = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
      const title = titleMatch ? titleMatch[1] : '';

      // 링크 추출
      const linkMatch = itemXml.match(/<link>(.*?)<\/link>/);
      const link = linkMatch ? linkMatch[1] : '';

      // 썸네일 추출
      const enclosureMatch = itemXml.match(/<enclosure url="(.*?)"/);
      const thumbnail = enclosureMatch ? enclosureMatch[1] : '';

      // 설명 추출
      const descMatch = itemXml.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/s);
      let description = descMatch ? descMatch[1] : '';

      // 구매대행 관련 기사인지 확인
      if (!isRelatedNews(title, description)) {
        continue; // 관련 없는 기사는 스킵
      }

      // 설명 길이 제한
      if (description.length > 100) {
        description = description.substring(0, 100) + '...';
      }

      // 날짜 추출
      const pubDateMatch = itemXml.match(/<pubDate>(.*?)<\/pubDate>/);
      const pubDate = pubDateMatch ? pubDateMatch[1] : '';

      if (title && link && thumbnail) {
        items.push({ title, link, thumbnail, description, pubDate });
      }
    }

    return NextResponse.json({
      items,
      timestamp: new Date().toISOString(),
      hasNews: items.length > 0
    });
  } catch (error) {
    console.error('News API Error:', error);
    return NextResponse.json(
      { error: '뉴스를 가져오는 중 오류가 발생했습니다.', items: [], hasNews: false },
      { status: 500 }
    );
  }
}
