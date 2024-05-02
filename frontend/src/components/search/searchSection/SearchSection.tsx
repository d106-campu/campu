import SearchBar from "@/components/home/SearchBar";
import { ICampingGround } from "@/types/search";
import SearchCampingItem from "./SearchCampingItem";

const SearchSection = () => {
  return (
    <>
      <div className="w-full">
        <SearchBar />
      </div>
      <div>
        {dummy.map((camping: ICampingGround) => (
          <SearchCampingItem key={camping.id} camping={camping} />
        ))}
      </div>
    </>
  );
};

export default SearchSection;

const dummy: ICampingGround[] = [
  {
    id: 1,
    facltNm: "캠프유캠푸 캠핑장",
    lineIntro: "이국적인 캐러밴과 알찬 부대시설",
    doNm: "강원도",
    sigunguNm: "춘천시",
    addr1: "강원도 춘천시 남면 가옹개길 52-9",
    addr2: null,
    price: 150000,
    rate: 4.8,
    mapX: 37.1,
    mapY: 127.5,
    like: 12,
    available: true,
    thumbnailImageUrl:
      "https://gocamping.or.kr/upload/camp/10/thumb/thumb_720_1869epdMHtUyrinZWKFHDWty.jpg",
  },
  {
    id: 2,
    facltNm: "최먼지의 캠핑장",
    lineIntro: "마당에 종류별로 귀여운 고양이가 많이 사는 인기 글램핑",
    doNm: "강원도",
    sigunguNm: "춘천시",
    addr1: "강원도 춘천시 남면 가옹개길 53-1",
    addr2: null,
    price: 120000,
    rate: 5.0,
    mapX: 37.8,
    mapY: 127.6,
    like: 12,
    available: false,
    thumbnailImageUrl:
      "https://gocamping.or.kr/upload/camp/10/thumb/thumb_720_1869epdMHtUyrinZWKFHDWty.jpg",
  },
];
