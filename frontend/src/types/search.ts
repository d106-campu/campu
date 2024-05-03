export interface ICampingGround {
  id: number;
  facltNm: string;
  lineIntro: string;
  doNm: string;
  sigunguNm: string;
  addr1: string;
  addr2: string | null;
  price: number;
  rate: number;
  mapX: number;
  mapY: number;
  like: number;
  available: boolean;
  thumbnailImageUrl: string;
}
