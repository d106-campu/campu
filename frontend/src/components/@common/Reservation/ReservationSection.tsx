import { PropsWithChildren } from "react";
import { IDetailProps } from "@/types/my";
  
const ReservationSection = ({
  titleLeft,
  contentLeft,
  titleRight,
  contentRight,
}: PropsWithChildren<IDetailProps>): JSX.Element => {
  // "가격" 정보를 표시하는 경우에 동적으로 다른 스타일 적용
  const priceStyle = titleLeft === "가격" ? "text-red-500 font-bold" : "font-bold";
  const startDateStyle = titleLeft === "입실 날짜" ? "text-MAIN_GREEN font-thin" : "";
  const infoStyle = titleLeft === "기타정보" ? "text-gray-700 font-thin" : "font-bold";
  const siteNameStyle = titleLeft === "사이트" ? "text-MAIN_GREEN font-thin" : "";

  const endDateStyle = titleRight === "퇴실 날짜" ? "text-MAIN_GREEN font-thin" : "font-bold";
  const statusStyle = titleRight === "인원" ? "text-red-500 font-thin" : "font-bold";
  
  // 숫자 형식의 가격 데이터를 로컬 문자열 형식으로 변환
  const formattedContentLeft = titleLeft === "가격" ? `${Number(contentLeft).toLocaleString('ko-KR')}원` : contentLeft;
  
  return (
    <>
      <div className='w-full'>
        <div className="w-full flex justify-between pb-5">
          <div className="flex flex-col items-start">
            <h1 className="text-gray-400">{titleLeft}</h1>
            <p className={`${priceStyle} ${startDateStyle} ${infoStyle} ${siteNameStyle}`}>{formattedContentLeft}</p>
          </div>
          <div className="w-[50%] flex flex-col items-start">
            <h1 className="text-gray-400">{titleRight}</h1>
            <p className={`${statusStyle} ${endDateStyle}`}>{contentRight}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReservationSection;
