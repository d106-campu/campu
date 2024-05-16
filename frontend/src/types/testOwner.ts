// owner.ts로 옮긴 후에 지워주세용~

// 캠핑장 방 등록 요청
export interface IRoomCreateReq {
  campsiteId: number;
  induty: string;
  roomName: string;
  price: number;
  baseNo: number;
  maxNo: number;
  extraPrice: number;
  toilet: boolean;
}

// 캠핑장 방 등록 응답
export interface IRoomCreateRes {
  result: string;
}