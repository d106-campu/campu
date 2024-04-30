import { IMapProps } from "@/types/map";
import { useEffect, useRef } from "react";

const KakaoMap: React.FC<IMapProps> = ({ lat, lng }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (lat !== undefined && lng !== undefined) {
      initMap(lat, lng);
    }
  }, [lat, lng]);

  const initMap = (latitude: number, longitude: number) => {
    const container = mapRef.current;
    if (!container) return;

    // 첫 위치
    const options = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);
    const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
      map: map,
    });

    markerRef.current = marker;
    map.setCenter(markerPosition);
  };
  return <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>;
};

export default KakaoMap;
