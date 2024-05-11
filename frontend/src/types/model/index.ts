// 공통 응답 객체 타입
export interface APIResponse<T> {
  result: "ok" | "fail"; // 요청 성공 여부, 'ok' 또는 'fail'
  data: T; // 성공 시 요청에 대한 응답 데이터
  code?: string; // 실패 시 백에서 보내는 에러 코드
  message?: string; // 실패 시 백에서 보내는 에러 메시지
}

// 페이지 정보 타입
export interface IPageable {
  pageNumber: number;
  pageSize: number;
  sort: ISort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface ISort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
