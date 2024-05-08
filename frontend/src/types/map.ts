declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

export interface IMapProps {
  facltNm?: string;
  rate?: number;
  lat?: number | undefined;
  lng?: number | undefined;
  level?: number;
}
