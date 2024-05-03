import { IMyFreeAlertList } from '@/types/myFreeAlert';
import photo1 from "@/assets/images/dummy/camping_spot_2.png";
import photo2 from "@/assets/images/dummy/camping_spot_3.png";
import photo3 from "@/assets/images/dummy/camping_spot_4.jpg";

// 더미데이터 5개
const DummyAlerts: IMyFreeAlertList = {
  totalMyAlerts: 6,
  alerts: [
    {
      campsiteName: "캠프유캠핑 캠핑장",
      address: "경상북도 칠곡군 가산면 금화리 산49-1 캠핑핑 캠핑장",
      area: "A구역(벚꽃 캠핑존) 10",
      date: "24.05.10 (금) ~ 24.05.14 (화)",
      people: 3,
      price: 150000,
      images: [photo1]
    },
    {
      campsiteName: "아귀찮아아 캠핑장",
      address: "부산광역시 남구 신선로 294",
      area: "A구역(벚꽃 캠핑존) 10",
      date: "24.05.10 (금) ~ 24.05.14 (화)",
      people: 2,
      price: 115000,
      images: [photo2]
    },
    {
      campsiteName: "이름짓는거 캠핑장",
      address: "경상북도 칠곡군 가산면 금화리 산49-1 캠핑핑 캠핑장",
      area: "A구역(벚꽃 캠핑존) 10",
      date: "24.05.10 (금) ~ 24.05.14 (화)",
      people: 4,
      price: 100000,
      images: [photo3]
    },
    {
      campsiteName: "생각이안나 캠핑장",
      address: "경상북도 칠곡군 가산면 금화리 산49-1 캠핑핑 캠핑장",
      area: "A구역(벚꽃 캠핑존) 10",
      date: "24.05.10 (금) ~ 24.05.14 (화)",
      people: 2,
      price: 120000,
      images: [photo1]
    },
    {
      campsiteName: "크크크크킄 캠핑장",
      address: "경상북도 칠곡군 가산면 금화리 산49-1 캠핑핑 캠핑장",
      area: "A구역(벚꽃 캠핑존) 10",
      date: "24.05.10 (금) ~ 24.05.14 (화)",
      people: 1,
      price: 85000,
      images: [photo2]
    },
    {
      campsiteName: "히히히히힣 캠핑장",
      address: "경상북도 칠곡군 가산면 금화리 산49-1 캠핑핑 캠핑장",
      area: "A구역(벚꽃 캠핑존) 10",
      date: "24.05.10 (금) ~ 24.05.14 (화)",
      people: 2,
      price: 85000,
      images: [photo2]
    },
    // 추가 리뷰 데이터...
  ]
};

export default DummyAlerts;