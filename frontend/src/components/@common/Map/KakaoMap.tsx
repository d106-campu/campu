import { IMapProps } from "@/types/map";
import { useEffect, useRef } from "react";
import MarkerImage from "@/assets/images/Marker.png";
import Star from "@/assets/images/Star.png";

type LocationsList = IMapProps[];

const KakaoMap = ({ locations }: { locations: LocationsList }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const overlayRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerRefs = useRef<any[]>([]);

  useEffect(() => {
    if (locations.length > 0) {
      initMap();
    } else {
      // locations이 비어 있을 때 기본 위치로 지도 설정
      const container = mapRef.current;
      if (!container) return;

      const options = {
        center: new window.kakao.maps.LatLng(
          36.1071305028147,
          128.4169500162442
        ),
        level: 5,
      };

      new window.kakao.maps.Map(container, options);
    }
  }, [locations]);

  const initMap = () => {
    const container = mapRef.current;
    if (!container) return;

    const options = {
      center: new window.kakao.maps.LatLng(locations[0].lat, locations[0].lng),
      level: 9,
    };

    const map = new window.kakao.maps.Map(container, options);

    markerRefs.current.forEach((marker) => marker.setMap(null));
    markerRefs.current = [];

    const markerImage = new window.kakao.maps.MarkerImage(
      MarkerImage,
      new window.kakao.maps.Size(40, 60)
    );

    locations.forEach((location) => {
      const markerPosition = new window.kakao.maps.LatLng(
        location.lat,
        location.lng
      );
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        map: map,
        image: markerImage,
      });

      const overlayContent = `
      <div style="background-color: #fff; padding: 10px; border-radius: 10px; position: relative; top: -100px;">
        <div>
          <div class="font-bold">${location.facltNm}</div>
          <div class="text-MAIN_RED font-bold flex text-[14px]"><img src=${Star} style="height: 20px; margin-right: 4px;" /> ${location.rate}</div>
        </div>
      </div>`;

      const overlayOptions = {
        content: overlayContent,
        map: null,
        position: marker.getPosition(),
      };

      // 커스텀 오버레이 생성
      const overlay = new window.kakao.maps.CustomOverlay(overlayOptions);

      // 마커 호버 이벤트
      window.kakao.maps.event.addListener(marker, "mouseover", function () {
        if (!overlay.getMap()) {
          overlay.setMap(map);
          overlayRef.current = overlay;
        }
      });

      window.kakao.maps.event.addListener(marker, "mouseout", function () {
        if (!overlay.getMap()) return;
        overlay.setMap(null); // 오버레이 닫기
      });

      markerRefs.current.push(marker);
    });
  };

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>;
};

export default KakaoMap;
