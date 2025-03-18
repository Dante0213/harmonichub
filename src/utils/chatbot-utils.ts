
// 기본 챗봇 응답 생성
export const generateBotResponse = (userMessage: string): string => {
  const lowerMsg = userMessage.toLowerCase();
  
  if (lowerMsg.includes('안녕') || lowerMsg.includes('hello')) {
    return "안녕하세요! 하모닉허브입니다. 어떻게 도와드릴까요?";
  } else if (lowerMsg.includes('레슨') || lowerMsg.includes('lesson')) {
    return "레슨에 관심이 있으신가요? 선생님 탭에서 다양한 선생님들을 만나보세요!";
  } else if (lowerMsg.includes('비용') || lowerMsg.includes('가격') || lowerMsg.includes('price')) {
    return "레슨 비용은 선생님마다 다르게 책정되어 있습니다. 각 선생님의 프로필에서 확인하실 수 있습니다.";
  } else if (lowerMsg.includes('문의') || lowerMsg.includes('contact')) {
    return "추가 문의사항은 support@harmonichub.com으로 이메일 주시거나 02-123-4567로 전화주세요.";
  } else {
    return "죄송합니다. 말씀하신 내용을 정확히 이해하지 못했습니다. 도움이 필요하시면 '레슨', '비용', '문의'에 대해 물어보세요.";
  }
};
