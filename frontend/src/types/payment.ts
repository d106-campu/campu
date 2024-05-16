// 결제 준비 Request
export interface IPaymentPrepareReq {
  roomId: number;
  headCnt: number;
  price: number;
  startDate: string;
  endDate: string;
}

// 결제 준비 Response
export interface IPaymentPrepareRes {
  preparePayment: IPaymentPrepare;
}

// 결제 정보
export interface IPaymentPrepare {
  reservationId: number;
  pg: string; // "${PG사 코드}.${상점 ID}"
  payMethod: string; // 결제 방법
  merchantUid: string; // 주문 고유번호 (개별 결제 요청을 구분하기 위해 사용되는 문자열로 항상 고유한 값이어야 함; 결제 완료 이후 결제 기록 조회나 위변조 대사 작업 시 사용되기 때문에 고객사 DB에 별도로 저장해야 함)
  name: string; // 상품명
  amount: number; // 가격
  buyerEmail: string; // 구매자 이메일
  buyerName: string; // 구매자 이름
  buyerTel: string; // 구매자 전화번호
  buyerAddr: string; // 구매자 주소
  buyerPostcode: string; // 구매자 우편번호
}

// 결제 완료 Request
export interface IPaymentCompleteReq {
  reservationId: string;
  impUid: string;
  merchantUid: string;
}

// 결제 완료 Response
export interface IPaymentCompleteRes {
  completePayment: IPaymentComplete;
}

// 결제 완료 정보
export interface IPaymentComplete {
  impUid: string;
  reservationId: number;
  room: IRoom;
  headCnt: number;
  startDate: string;
  endDate: string;
  status: string;
  price: number;
  amount: number;
}

export interface IRoom {
  id: number;
  name: string;
  campsite: ICampsite;
}

export interface ICampsite {
  id: number;
  facltNm: string;
  addr1: string;
  addr2: string;
  thumbnailImageUrl: string;
}
