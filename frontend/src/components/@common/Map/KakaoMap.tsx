import { IMapProps } from "@/types/map";
import { useEffect, useRef } from "react";

type LocationsList = IMapProps[];

const KakaoMap = ({ locations }: { locations: LocationsList }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerRefs = useRef<any[]>([]);

  console.log(locations);

  useEffect(() => {
    if (locations.length > 0) {
      initMap();
    }
  }, [locations]);

  const initMap = () => {
    const container = mapRef.current;
    if (!container) return;

    const options = {
      center: new window.kakao.maps.LatLng(locations[0].lat, locations[0].lng),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);

    markerRefs.current.forEach((marker) => marker.setMap(null));
    markerRefs.current = [];

    locations.forEach((location) => {
      const markerPosition = new window.kakao.maps.LatLng(
        location.lat,
        location.lng
      );
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        map: map,
      });

      const hoverContent = `
      <div class="p-2">
        <div class="font-bold">${location.facltNm}</div>
        <div class="text-sm font-bold text-MAIN_PINK">⭐${location.rate}</div>
      </div>`;

      const infoHover = new window.kakao.maps.InfoWindow({
        content: hoverContent,
      });

      window.kakao.maps.event.addListener(marker, "mouseover", function () {
        infoHover.open(map, marker);
      });

      window.kakao.maps.event.addListener(marker, "mouseout", function () {
        infoHover.close();
      });

      markerRefs.current.push(marker);
    });
  };

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>;
};

export default KakaoMap;
