declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

export interface IMapProps {
  lat?: number | undefined;
  lng?: number | undefined;
  updateCounter?: number;
}
