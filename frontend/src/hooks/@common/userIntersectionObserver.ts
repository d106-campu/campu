import { InfiniteQueryObserverResult } from "@tanstack/react-query"; // 무한 쿼리의 결과 타입
import { useCallback, useEffect, useState } from "react";

interface IUserIntersectionObserverProps {
  threshold?: number; // 타겟 요소의 어느 부분이 화면에 보이는지의 비율 (threshold 값에 도달하면, 인터섹션 옵저버의 콜백 함수가 호출)
  hasNextPage: boolean | undefined; // 다음 페이지 존재 여부
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>; // 다음 페이지의 데이터를 불러오는 함수
}

const userIntersectionObserver = ({
  threshold = 0.1, // 타겟 요소의 10%가 보이면 콜백이 실행
  hasNextPage,
  fetchNextPage,
}: IUserIntersectionObserverProps) => {
  // 스크롤 최하단 div 요소에 setTarget을 ref로 넣어 사용
  const [target, setTarget] = useState<HTMLDivElement | null | undefined>(null); // 관찰 대상

  const observerCallback: IntersectionObserverCallback = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        //target이 화면에 관찰되고, 다음 페이지가 있다면 다음 페이지를 호출
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
    },
    [hasNextPage, fetchNextPage] // 의존성 배열에 두 상태를 포함하여 변경 시 콜백 함수 재생성
  );

  useEffect(() => {
    // target이 설정되지 않은 경우 return
    if (!target) return;

    // intersection observer 인스턴스 생성
    const observer = new IntersectionObserver(observerCallback, {
      threshold,
    });

    // 타겟 관찰 시작
    observer.observe(target);

    // 관찰 중단
    return () => observer.unobserve(target);
  }, [threshold, target]);

  return { setTarget };
};
export default userIntersectionObserver;
