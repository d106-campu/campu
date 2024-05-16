import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
  dateStringToDate,
  dateToDateString,
  formatSimpleDate,
} from "@/utils/formatDateTime";
import { useRefs } from "@/context/RefContext";
import CampingPhotos from "@/components/reservation/CampingPhotos";
import CampSiteLayout from "@/components/reservation//CampSiteLayout";
import ReadOnlyCalendar from "@/components/@common/Calendar/ReadOnlyCalendar";
import LikeButton from "@/components/@common/Like/LikeButton";
import { copyToClipboard } from "@/utils/copyToClipboard";
import formatPhoneNumber from "@/utils/formatPhoneNumber";
import phoneIcon from "@/assets/svg/phone.svg";
import reviewIcon from "@/assets/svg/review.svg";
import mapIcon from "@/assets/svg/map.svg";
import { FaArrowRotateRight } from "react-icons/fa6";
import MapModal from "@/components/@common/Map/MapModal";
import { useState } from "react";
import { ICampsiteLocation } from "@/types/reservation";
import {
  setEndDate,
  setStartDate,
} from "@/features/reservation/campingDateSlice";
import Modal from "../@common/Modal/Modal";
import Calendar from "../@common/Calendar/Calendar";
import CalendarSubmit from "../@common/Calendar/CalendarSubmit";

interface ICampSiteIntro {
  id: number;
  facltNm: string; // 캠핑장명
  tel: string; // 캠핑장 연락처
  lineIntro: string; // 한 줄 소개
  intro: string; // 긴 글 소개
  addr1: string; // 주소
  addr2: string | null; // 상세 주소
  indutyList: string[]; // 캠핑장 유형
  themeList: string[]; // 캠핑장 테마
  score: number; // 별점
  like: boolean; // 좋아요 여부
  homepage: string | null; // 홈페이지 주소
  thumbnailImageUrl: string; // 썸네일 이미지
  mapImageUrl: string | null; // 배치도 이미지
  campsiteImageUrlList: string[]; // 캠핑장 메인 이미지
  campsiteLocation: ICampsiteLocation; // 캠핑장 위치
  totalReview: number;
}

const CampSiteIntro = ({ data }: { data: ICampSiteIntro }) => {
  const [mapModal, setMapModal] = useState<boolean>(false); // 지도 모달 상태관리
  const { startDate, endDate } = useSelector(
    (state: RootState) => state.campingDate
  );

  const { reviewRef } = useRefs();
  const scrollToReviews = () => {
    reviewRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleMapModal = () => setMapModal(!mapModal);

  // 모달 상태관리
  const [scheduleModal, setScheduleModal] = useState<boolean>(false);
  const toggleScheduleModal = () => {
    setScheduleModal(!scheduleModal); // 모달 토글
    setLocalStartDate(dateStringToDate(startDate)); // 저장 안하고 닫으면 초기화
    setLocalEndDate(dateStringToDate(endDate));
  };

  const dispatch = useDispatch();

  // 스토어에서 가져온 문자열 날짜를 Date 객체로 변환
  const initialStartDate = dateStringToDate(startDate);
  const initialEndDate = dateStringToDate(endDate);

  // 달력에서 선택한 일정
  const [localStartDate, setLocalStartDate] = useState<Date | null>(
    initialStartDate
  );
  const [localEndDate, setLocalEndDate] = useState<Date | null>(initialEndDate);

  // 일정 초기화
  const resetCalendar = () => {
    setLocalStartDate(dateStringToDate(startDate));
    setLocalEndDate(dateStringToDate(endDate));
  };

  // 일정 스토어에 저장
  const calendarSubmit = () => {
    // Date 객체를 'yyyy-MM-dd' 형식의 문자열로 변환
    const formattedStartDate = dateToDateString(localStartDate);
    const formattedEndDate = dateToDateString(localEndDate);

    if (formattedStartDate !== null && formattedEndDate !== null) {
      // 변환된 문자열을 Redux 스토어에 저장
      dispatch(setStartDate(formattedStartDate));
      dispatch(setEndDate(formattedEndDate));
    }
  };

  return (
    <>
      <CampingPhotos
        id={data.id}
        main={data.thumbnailImageUrl}
        photos={data.campsiteImageUrlList}
        like={data.like}
      />
      {/* 캠핑장 유형 */}
      <div className="pt-7">
        {data.indutyList.map((induty, index) => (
          <span key={index} className="text-UNIMPORTANT_TEXT_01">
            {induty}
            {index < data.indutyList.length - 1 && (
              <span className="text-UNIMPORTANT_TEXT_01 p-1">·</span>
            )}
          </span>
        ))}
        {/* 캠핑장 이름 */}
        <div className="flex justify-between items-end">
          <h1 className="font-bold text-3xl">{data.facltNm}</h1>
          {/* 좋아요 */}
          <LikeButton like={data.like} campsiteId={data.id} />
        </div>

        {/* 캠핑장 필수 정보 */}
        <div className="p-2 text-sm">
          <div className="flex pt-1">
            <img src={mapIcon} className="w-5" />
            <p className="text-UNIMPORTANT_TEXT_01 pl-2">{data.addr1}</p>
            <button
              onClick={toggleMapModal}
              className="pl-2 text-MAIN_GREEN font-bold"
            >
              지도로 확인하기
            </button>
            {mapModal && (
              <MapModal
                lat={data.campsiteLocation.mapY}
                lng={data.campsiteLocation.mapX}
                facltNm={data.facltNm}
                addr1={data.addr1}
                rate={data.score}
                level={5}
                toggleModal={toggleMapModal}
              />
            )}
          </div>
          <div className="flex py-2">
            <img src={phoneIcon} className="w-4" />
            <p className="text-UNIMPORTANT_TEXT_01 pl-3">
              {formatPhoneNumber(data.tel)}
            </p>
            <button
              onClick={() => copyToClipboard(formatPhoneNumber(data.tel))}
              className="pl-2 text-MAIN_GREEN font-bold"
            >
              복사하기
            </button>
          </div>
          <div className="flex">
            <img src={reviewIcon} className="w-5" />
            <p className="text-UNIMPORTANT_TEXT_01 pl-2">
              방문자 리뷰 <span className="font-bold">{data.totalReview}</span>
              개
            </p>
            <button
              onClick={scrollToReviews}
              className="pl-2 text-MAIN_GREEN font-bold"
            >
              둘러보기
            </button>
          </div>
        </div>

        {/* 캠핑장 소개 */}
        <div className="pt-10">
          <h3 className="text-xl font-bold">캠핑장 소개</h3>
          <div className="px-2 pt-1 text-sm text-UNIMPORTANT_TEXT_01">
            <p className="font-bold pb-1">🌸🌳 {data.lineIntro} 🌳🌸</p>
            <p className="pl-1 pb-2">{data.intro}</p>
            {data.themeList &&
              data.themeList.map((theme, index) => (
                <span
                  key={index}
                  className="font-medium text-MAIN_GREEN pl-1 pr-3"
                >
                  #{theme}
                </span>
              ))}
          </div>
        </div>

        {!data.mapImageUrl && (
          <h3 className="text-xl font-bold pt-10">내 일정 확인하기</h3>
        )}
        <div className="pt-10 flex justify-center">
          {/* 캠핑존 배치도 */}
          {data.mapImageUrl && (
            <CampSiteLayout
              layout={data.mapImageUrl}
              campsite_name={data.facltNm}
            />
          )}

          {/* 캘린더 */}
          <div
            onClick={toggleScheduleModal}
            className={`${
              data.mapImageUrl ? "w-[50%] h-[420px]" : "w-[80%] h-[420px]"
            } cursor-pointer`}
          >
            <div className="flex justify-around items-stretch border-2 rounded-xl border-[#C9C9C9] text-BLACK text-center font-bold w-[75%] mx-auto">
              <div className="flex-1 my-auto py-1 rounded-xl">
                <p className="text-sm text-MAIN_GREEN">입실일</p>
                {formatSimpleDate(startDate) || (
                  <p className="text-sm">날짜를 선택해주세요</p>
                )}
              </div>
              <div className="border-l-2 border-[#C9C9C9] mx-2" />
              <div className="flex-1 my-auto py-1 rounded-xl">
                <p className="text-sm text-MAIN_GREEN">퇴실일</p>
                {formatSimpleDate(endDate) || (
                  <p className="text-sm">날짜를 선택해주세요</p>
                )}
              </div>
            </div>
            <ReadOnlyCalendar />
          </div>

          {/* 모달 - 일정 변경 */}
          {scheduleModal && (
            <Modal
              width="w-[55%]"
              onClose={toggleScheduleModal}
              title="일정 선택"
            >
              <div>
                <div className="w-[70%] h-[375px] mx-auto">
                  <Calendar
                    startDate={localStartDate}
                    endDate={localEndDate}
                    setStartDate={setLocalStartDate}
                    setEndDate={setLocalEndDate}
                  />
                </div>
                <button
                  onClick={resetCalendar}
                  className="flex items-center gap-2 cursor-pointer p-2"
                >
                  <FaArrowRotateRight color="C9C9C9" />
                  <span className="text-GRAY">일정 초기화</span>
                </button>
                <CalendarSubmit
                  startDate={localStartDate}
                  endDate={localEndDate}
                  onClick={() => {
                    toggleScheduleModal();
                    calendarSubmit();
                  }}
                />
              </div>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};
export default CampSiteIntro;
