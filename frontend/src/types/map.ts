declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

export interface IMapProps {
  facltNm?: string;
  rate?: number;
  lat?: number | null;
  lng?: number | null;
  level?: number;
}
