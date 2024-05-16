// owner.ts로 옮긴 후에 지워주세용~

// 캠핑장 방 목록 조회
export interface IOwnerRoomListReq {
  campsiteId: number;
}

// 캠핑장 방 목록 응답 목록
export interface IOwnerRoomList {
  roomId: number;
  imageUrl: string;
  induty: string;
  roomName: string;
  baseNo: number;
  maxNo: number;
  price: number;
  extraPrice: number;
  toilet: boolean;
}

// 캠핑장 방 목록 응답
export interface IOwnerRoomListRes {
  roomList: IOwnerRoomList[];
}

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

// 캠핑장 방 수정 요청
export interface IRoomUpdateReq {
  roomId: number;
  file?: File;
  updateRequestDto: {
    induty: string;
    roomName: string;
    price: number;
    baseNo: number;
    maxNo: number;
    extraPrice: number;
    toilet: boolean;
  };
}

// 캠핑장 방 수정 응답
export interface IRoomUpdateRes {
  result: string;
}

// 캠핑장 방 삭제 요청
export interface IRoomDeleteReq {
  roomId: number;
}

// 캠핑장 방 삭제 응답
export interface IRoomDeleteRes {
  result: string;
}