import { createContext, useContext, useRef, ReactNode } from "react";

interface RefContextType {
  reviewRef: React.RefObject<HTMLDivElement>;
}

// Context 객체를 생성
const RefContext = createContext<RefContextType | null>(null);

// Context의 현재 값을 읽을 때 사용하는 사용자 정의 훅
export const useRefs = () => {
  // useContext를 사용하여 RefContext의 현재 값을 읽음
  const context = useContext(RefContext);
  if (!context) {
    throw new Error("useRefs는 반드시 RefProvider 안에서 사용되어야 합니다");
  }
  return context;
};

// Context 객체를 사용하여 value 속성을 하위 컴포넌트에게 전달(reviewRef를 Context를 통해 접근할 수 있게 해주는 역할)
export const RefProvider = ({ children }: { children: ReactNode }) => {
  const reviewRef = useRef<HTMLDivElement>(null);

  return (
    <RefContext.Provider value={{ reviewRef }}>{children}</RefContext.Provider>
  );
};
