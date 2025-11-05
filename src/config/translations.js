export const translations = {
  ko: {
    // Survey questions
    questions: {
      1: {
        question: 'Q1. 그대는 현재 어느 분야에서 수련 중인가?',
        description: '소속 학부/직업',
        options: [
          '🧠 경영경제학부, 법학부 등',
          '🛠️ 전산전자공학부, 기계제어공학부, AI융합학부 등',
          '🎨 커뮤니케이션학부, 콘텐츠융합디자인학부 등',
          '🌍 국제어문학부, 상담심리사회복지학부, 생명과학부 등',
          '🐣 글로벌리더십학부 등 1학년',
          '🗺️ 타 대학 학생',
          '💼 직장인',
          '🚶 기타'
        ]
      },
      2: {
        question: 'Q2. 평소 AI를 얼마나 자주 사용하는가?',
        description: '',
        options: [
          '숨 쉬듯이 사용한다 (하루 5회 이상)',
          '매일 꾸준히 사용한다 (하루 1~4회)',
          '자주 사용한다 (주 3~5회)',
          '가끔 사용한다 (주 1~2회)',
          '생각날 때만 사용한다 (월 1~3회)',
          '거의 사용하지 않는다'
        ]
      },
      3: {
        question: 'Q3. AI를 주로 어떤 용도로 사용하는가?',
        description: '중복 선택 가능',
        options: [
          '📄 보고서 작성 및 문서 요약',
          '💡 새로운 아이디어 탐색',
          '🖼️ 이미지나 영상 제작',
          '📊 데이터 정리 또는 엑셀 작업',
          '💻 코드 설계 및 프로그래밍',
          '🔍 단순 정보 검색 (구글/네이버 대신)',
          '💬 기타 (대화, 재미 등)'
        ]
      },
      4: {
        question: 'Q4. 새로운 AI 활용법이나 도구는 주로 어디서 얻는가?',
        description: '중복 선택 가능',
        options: [
          '📺 유튜브',
          '📝 블로그 / 아티클',
          '💰 유료 온라인 강의 (인프런, 패스트 캠퍼스 등)',
          '🏛️ 학교 수업 또는 국비 지원',
          '👥 주변 지인의 조언',
          '⚔️ 일단 부딪혀보며 익힌다',
          '😥 딱히 배우지 않는다'
        ]
      },
      5: {
        question: 'Q5. [핵심] AI를 \'제대로\' 배우고 활용하려 할 때 가장 큰 방해물은 무엇인가?',
        description: '',
        options: [
          '🌊 정보들이 여기저기 흩어져 있어 체계가 잡히지 않는다.',
          '🏃 AI 기술이 너무 빨리 변해서 뭘 배워야 할지 따라가기 벅차다.',
          '🤯 너무 기술자(개발자) 중심이거나 용어가 어려워 이해가 안 된다.',
          '🤔 배워도 내 실제 업무(전공)에 어떻게 써야 할지 감이 오지 않는다.',
          '💸 제대로 배우려니 수강료가 부담된다.'
        ]
      },
      6: {
        question: 'Q6. 잘못된 정보를 보고 실망했던 경험이 있다면 골라보라.',
        description: '중복 선택 가능',
        options: [
          '안 되는 기능이나 낡은 UI를 알려줬다.',
          '너무 뻔한 기초이거나, 반대로 지식이 부족해 너무 어려웠다.',
          '광고성 내용이 절반이라 신뢰가 가지 않았다.',
          '내 직무/전공에서 바로 쓸 수 있는 실전 팁이 없었다.'
        ]
      },
      7: {
        question: 'Q7. [핵심] 둘 중 그대에게 더 절실한 \'AI 가이드북\'은 무엇인가?',
        description: '',
        options: [
          '🅰️ "ChatGPT 고급 사용법 완벽 가이드"',
          '🅱️ "내 직무만을 위한 AI 활용 보고서 작성법"'
        ]
      },
      8: {
        question: 'Q8. 만약 매월 일정 구독료를 내고, 아래 혜택을 모두 누릴 수 있는 AI 학습 플랫폼이 있다면 가입할 의향이 있는가?',
        description: '[제공 혜택] 1. 내 직무(분야)에 딱 맞는 체계적인 실전 코스 2. 매주 업데이트되는 최신 동향 및 AI 팁 요약 3. 결과물이 달라지는 AI 질문 모음집 4. 현직 고수(전문가)에게 직접 묻는 비밀 Q&A',
        options: [
          '🤩 네, 당장 입문합니다.',
          '🤔 긍정적으로 고려해봅니다.',
          '😥 잘 모르겠습니다 / 무료 팁만 보겠습니다.',
          '🙅 아니요, 필요 없습니다.'
        ]
      },
      9: {
        question: 'Q9. (Q8에서 \'긍정\' 이상 응답 시) 월 얼마의 구독료가 적당하다고 생각하는가?',
        description: '',
        options: [
          '무료 팁만 보겠습니다.',
          '월 4,900원 (커피 1잔)',
          '월 9,900원 (커피 2잔)',
          '월 19,900원 (치킨 1마리)',
          '월 29,900원 (표준)',
          '월 49,900원 이상'
        ]
      }
    },
    // UI Text
    ui: {
      loading: '설문조사를 불러오는 중...',
      error: '설문조사를 불러오는 중 오류가 발생했습니다.',
      checkSupabase: 'Supabase 설정을 확인해주세요.',
      retry: '다시 시도',
      submitTips: '💡 AI 꿀팁 제출하기',
      submitResults: '제출하고 결과 보기',
      aiTipsTitle: 'AI 꿀팁 공유 (선택사항)',
      tipNameLabel: 'Q10. 꿀팁 이름',
      tipNamePlaceholder: '예: 논문 요약 프롬프트',
      targetUsersLabel: 'Q11. 누구에게 추천?',
      targetUsersPlaceholder: '예: 대학원생, 연구원',
      aiToolLabel: 'Q12. 사용하는 AI 도구',
      aiToolPlaceholder: '예: ChatGPT-4, Claude',
      tipDescriptionLabel: 'Q13. 꿀팁 설명',
      tipDescriptionPlaceholder: '꿀팁을 자세히 설명해주세요...',
      submitButton: '제출하기',
      languageToggle: '🌐 English'
    }
  },
  en: {
    // Survey questions
    questions: {
      1: {
        question: 'Q1. Which field are you currently training in?',
        description: 'Department/Occupation',
        options: [
          '🧠 Business & Economics, Law, etc.',
          '🛠️ Computer Science & Engineering, Mechanical & Control Engineering, AI Convergence, etc.',
          '🎨 Communication, Content Convergence Design, etc.',
          '🌍 International Studies, Counseling Psychology & Social Welfare, Life Sciences, etc.',
          '🐣 Global Leadership (1st Year)',
          '🗺️ Student from Another University',
          '💼 Working Professional',
          '🚶 Other'
        ]
      },
      2: {
        question: 'Q2. How often do you use AI?',
        description: '',
        options: [
          'Use it like breathing (5+ times daily)',
          'Use it consistently every day (1-4 times daily)',
          'Use it frequently (3-5 times weekly)',
          'Use it occasionally (1-2 times weekly)',
          'Use it when I remember (1-3 times monthly)',
          'Rarely use it'
        ]
      },
      3: {
        question: 'Q3. What do you primarily use AI for?',
        description: 'Multiple selections possible',
        options: [
          '📄 Report writing & document summarization',
          '💡 Exploring new ideas',
          '🖼️ Image or video creation',
          '📊 Data organization or Excel work',
          '💻 Code design & programming',
          '🔍 Simple information search (instead of Google/Naver)',
          '💬 Other (conversation, fun, etc.)'
        ]
      },
      4: {
        question: 'Q4. Where do you mainly learn new AI techniques or tools?',
        description: 'Multiple selections possible',
        options: [
          '📺 YouTube',
          '📝 Blogs / Articles',
          '💰 Paid online courses (Inflearn, Fast Campus, etc.)',
          '🏛️ School classes or government support',
          '👥 Advice from people around me',
          '⚔️ Learn by doing',
          '😥 Don\'t really learn'
        ]
      },
      5: {
        question: 'Q5. [Key] What is the biggest obstacle when trying to learn and use AI properly?',
        description: '',
        options: [
          '🌊 Information is scattered everywhere, making it hard to organize.',
          '🏃 AI technology changes too fast to keep up with what to learn.',
          '🤯 Too technical/developer-focused or terminology is too difficult.',
          '🤔 Even after learning, I don\'t know how to apply it to my work/major.',
          '💸 Course fees are burdensome for proper learning.'
        ]
      },
      6: {
        question: 'Q6. If you\'ve been disappointed by incorrect information, select which applies.',
        description: 'Multiple selections possible',
        options: [
          'Showed non-working features or outdated UI.',
          'Too basic, or conversely, too difficult due to lack of knowledge.',
          'Half was advertising content, not trustworthy.',
          'No practical tips applicable to my job/major.'
        ]
      },
      7: {
        question: 'Q7. [Key] Which \'AI Guidebook\' is more essential for you?',
        description: '',
        options: [
          '🅰️ "Complete Guide to Advanced ChatGPT Usage"',
          '🅱️ "AI-Powered Report Writing for Your Specific Job"'
        ]
      },
      8: {
        question: 'Q8. Would you subscribe to an AI learning platform with the following benefits for a monthly fee?',
        description: '[Benefits] 1. Systematic practical course tailored to your field 2. Weekly updated trends & AI tips 3. AI prompt collection for better results 4. Direct Q&A with experts',
        options: [
          '🤩 Yes, I\'ll join immediately.',
          '🤔 I\'ll consider it positively.',
          '😥 Not sure / Only want free tips.',
          '🙅 No, I don\'t need it.'
        ]
      },
      9: {
        question: 'Q9. (If positive response to Q8) What monthly fee seems appropriate?',
        description: '',
        options: [
          'Only want free tips.',
          '₩4,900/month (1 coffee)',
          '₩9,900/month (2 coffees)',
          '₩19,900/month (1 chicken)',
          '₩29,900/month (standard)',
          '₩49,900+/month'
        ]
      }
    },
    // UI Text
    ui: {
      loading: 'Loading survey...',
      error: 'An error occurred while loading the survey.',
      checkSupabase: 'Please check Supabase settings.',
      retry: 'Try Again',
      submitTips: '💡 Submit AI Tips',
      submitResults: 'Submit and View Results',
      aiTipsTitle: 'Share AI Tips (Optional)',
      tipNameLabel: 'Q10. Tip Name',
      tipNamePlaceholder: 'e.g., Paper Summary Prompt',
      targetUsersLabel: 'Q11. Who to recommend to?',
      targetUsersPlaceholder: 'e.g., Graduate students, researchers',
      aiToolLabel: 'Q12. AI Tool Used',
      aiToolPlaceholder: 'e.g., ChatGPT-4, Claude',
      tipDescriptionLabel: 'Q13. Tip Description',
      tipDescriptionPlaceholder: 'Please describe your tip in detail...',
      submitButton: 'Submit',
      languageToggle: '🌐 한국어'
    }
  }
};