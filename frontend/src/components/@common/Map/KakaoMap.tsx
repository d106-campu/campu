import { IMapProps } from "@/types/map";
import { useEffect, useRef } from "react";
import MarkerImage from "@/assets/images/Marker.png";
import Star from "@/assets/images/Star.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleMarker } from "@/features/search/markersSlice";
import { RootState } from "@/app/store";

interface KakaoMapProps {
  locations: IMapProps[];
  mapX: number | null;
  mapY: number | null;
}

const KakaoMap = ({ locations, mapX, mapY }: KakaoMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const overlayRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerRefs = useRef<any[]>([]);
  const dispatch = useDispatch();

  // @TODO: 추후 지우기 (스토어 저장된 마커 확인)
  const markers = useSelector((state: RootState) => state.markers.facltNm);
  console.log(markers);

  useEffect(() => {
    if (locations?.length > 0) {
      initMap();
    } else {
      // locations이 비어 있을 때 기본 위치로 지도 설정
      const container = mapRef.current;
      if (!container) return;

      const options = {
        center: new window.kakao.maps.LatLng(37.5642135, 127.0016985),
        level: 12,
      };

      new window.kakao.maps.Map(container, options);
    }
  }, [locations]);

  const initMap = () => {
    const container = mapRef.current;
    if (!container) return;

    const options = {
      center: new window.kakao.maps.LatLng(mapY, mapX),
      level: locations[0].level || 5,
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
          <div class="text-MAIN_RED font-bold flex text-[14px]"><img src=${Star} style="height: 20px; margin-right: 4px;" /> ${location.rate?.toFixed(
        1
      )}</div>
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

      // 마커 클릭 이벤트 처리
      window.kakao.maps.event.addListener(marker, "click", function () {
        dispatch(toggleMarker(location.facltNm!));
      });

      markerRefs.current.push(marker);
    });
  };

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>;
};

export default KakaoMap;
