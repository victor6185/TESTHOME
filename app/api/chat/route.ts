import { GoogleGenAI } from '@google/genai';

export async function POST(req: Request) {
  const { messages, apiKey } = await req.json();

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'API 키가 필요합니다. 설정 버튼을 클릭하여 Gemini API 키를 입력해주세요.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    // 시스템 프롬프트와 대화 내역 구성
    const systemPrompt = `당신은 글로벌 구매대행 서비스의 친절한 AI 상담원입니다.

주요 역할:
- 해외 상품 구매대행 서비스 안내
- 배송 및 수수료 관련 질문 답변
- 구매 절차 설명
- 고객 문의 응대

서비스 정보:
- 수수료: 상품가격의 10%
- 배송기간: 평균 7일 (미국/일본 3-5일, 유럽 5-7일)
- 지원국가: 미국, 일본, 중국, 유럽, 호주 등 30개국 이상
- 결제방법: 신용카드, 계좌이체, 카카오페이

항상 친절하고 전문적으로 응대하며, 한국어로 답변해주세요. 답변은 간결하게 해주세요.`;

    // 대화 내역을 텍스트로 변환
    const conversationHistory = messages
      .map((m: { role: string; content: string }) =>
        `${m.role === 'user' ? '사용자' : 'AI'}: ${m.content}`
      )
      .join('\n');

    const fullPrompt = `${systemPrompt}\n\n대화 내역:\n${conversationHistory}\n\nAI:`;

    // 스트리밍 응답 생성
    const response = await ai.models.generateContentStream({
      model: 'gemini-2.0-flash',
      contents: fullPrompt,
    });

    // ReadableStream 생성
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const text = chunk.text;
            if (text) {
              controller.enqueue(new TextEncoder().encode(text));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error: unknown) {
    console.error('Chat API Error:', error);

    let errorMessage = 'API 호출 중 오류가 발생했습니다.';
    if (error && typeof error === 'object' && 'message' in error) {
      const msg = (error as { message: string }).message;
      if (msg.includes('API key') || msg.includes('API_KEY')) {
        errorMessage = 'API 키가 유효하지 않습니다. 올바른 Gemini API 키를 입력해주세요.';
      } else if (msg.includes('quota')) {
        errorMessage = 'API 사용량 한도를 초과했습니다. 잠시 후 다시 시도해주세요.';
      } else {
        errorMessage = msg;
      }
    }

    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
