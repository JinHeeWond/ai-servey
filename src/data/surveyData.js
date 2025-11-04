export const surveys = [
  {
    id: 1,
    question: "가장 자주 사용하는 AI 도구는 무엇인가요?",
    description: "일상 또는 업무에서 가장 많이 활용하는 AI 도구를 선택해주세요",
    active: true,
    options: [
      { id: 1, text: "ChatGPT / Claude", votes: 0 },
      { id: 2, text: "Midjourney / DALL-E", votes: 0 },
      { id: 3, text: "GitHub Copilot", votes: 0 },
      { id: 4, text: "Notion AI", votes: 0 },
      { id: 5, text: "기타", votes: 0 }
    ]
  },
  {
    id: 2,
    question: "AI가 가장 큰 변화를 가져올 분야는?",
    description: "향후 5년 내 AI의 영향력이 가장 클 것으로 예상되는 분야",
    active: true,
    options: [
      { id: 1, text: "교육", votes: 0 },
      { id: 2, text: "의료 및 헬스케어", votes: 0 },
      { id: 3, text: "예술 및 창작", votes: 0 },
      { id: 4, text: "비즈니스 및 생산성", votes: 0 },
      { id: 5, text: "과학 연구", votes: 0 }
    ]
  },
  {
    id: 3,
    question: "AI 활용의 가장 큰 장벽은?",
    description: "AI를 더 활용하지 못하는 이유가 무엇인가요?",
    active: true,
    options: [
      { id: 1, text: "사용 방법을 잘 모름", votes: 0 },
      { id: 2, text: "비용 부담", votes: 0 },
      { id: 3, text: "개인정보 우려", votes: 0 },
      { id: 4, text: "결과의 신뢰성 문제", votes: 0 },
      { id: 5, text: "장벽 없음", votes: 0 }
    ]
  }
];
