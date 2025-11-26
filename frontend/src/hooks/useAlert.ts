import { useCallback } from 'react';

export const useAlert = () => {
  const showAlert = useCallback((message: string) => {
    window.alert(message);
  }, []);

  return showAlert;
};

/**
 * useAlert 커스텀 훅 장점
 * 1. 추상화 : 알림 로직을 추상화하여 구현 세부사항을 숨긴다. 컴포넌트는 "어떻게" 알림이 표시되는지 몰라도 되고, 그냥 showAlert 함수를 호출하면 된다.
 * 2. 유지보수성 : 나중에 window.alert를 더 나은 방식으로 교체하고 싶을 때, 한 곳만 수정하면 된다.
 * 3. 테스트 용이성 : 테스트시 window.alert를 모킹(mocking)하기 쉽다. 직접 window.alert를 사용하면 매번 window.alert를 모킹해야 하지만, 훅으로 분리하면 훅 자체를 모킹하면 된다.
 * 4. 일관성 : 프로젝트 전체에서 알림을 표시하는 방식이 통일된다. 어떤 곳에서는 alert(), 어떤 곳에서는 window.alert(), 어떤 곳에서는 커스텀 방식을 사용하는 혼란을 방지한다.
 * 5. 확장성 : 미래에 기능을 추가하기 쉽다.
 * 6. 메모이제이션 : useCallback으로 감싸서 함수가 매번 재생성되지 않도록 한다. 이것은 성능 최적화에 도움이 된다. 만약 이 함수를 다른 컴포넌트에 prop으로 전달한다면, 불필요한 리렌더링을 방지할 수 있다.
 * 요약: 지금은 단순해 보이지만, 변경에 유연하고 유지보수가 쉬운 코드 구조를 만드는 것이 핵심입니다. 이것이 바로 "좋은 아키텍처"의 시작점입니다! 🎯
 */
