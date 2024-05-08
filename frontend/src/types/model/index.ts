// 전역에서 공통으로 사용하는 타입 정의

// 공통 응답 객체 타입
export interface APIResponse<T> {
    result: 'ok' | 'fail';
    data: T;
  }