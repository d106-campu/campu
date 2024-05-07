// import { useState } from 'react';
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "@/app/store";
// import { formatDate, formatSimpleDate } from "@/utils/formatDateTime";
// import { diffDays } from "@/utils/diffDays";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import DummyImage from '@/assets/images/dummyCamping2.png';
import { FiMapPin } from "react-icons/fi";
import ReservationSection from '@/components/@common/Reservation/ReservationSection';
import Button from '@/components/@common/Button/Button'
import { IReservationProps } from '@/types/myReservation';

interface IReservationAccordionProps {
  reservation: IReservationProps;
  expanded: boolean;
  toggleDetails: (index: number) => void;
  index: number;
}

const ReservationAccordion = ({
  reservation,
  expanded,
  toggleDetails,
  index
}: IReservationAccordionProps): JSX.Element => {
  return ( 
    <div className={`bg-MAIN_GREEN text-white mb-10 rounded-2xl ${expanded ? '' : ' shadow-xl'}`}>
      {/* 헤더 */}
      <div className="flex justify-between items-center px-5 py-1">
        <div className='flex justify-center items-center py-1'>
          {/* 캠핑장 이름, 구역 */}
          <h1 className='text-lg font-bold'>{reservation.campName}</h1>
          {!expanded && <span className='pl-2 text-sm'>&nbsp;{reservation.area}</span>}
        </div>
        <div className='flex py-2 items-center'>
          {/* 날짜 + 더보기 */}
          {!expanded && <span className='text-sm'>{reservation.date} · {reservation.nights}박</span>}
          <button className="flex pl-5" onClick={() => toggleDetails(index)}>
            {expanded ? <IoIosArrowUp size="20" /> : <IoIosArrowDown size="20" />}
            {expanded ? <span></span> : <span className="pl-1 text-sm outline-none">더보기</span>}
          </button>
        </div>
      </div>
      
      <div className='text-sm bg-white text-black pt-1 pb-3 rounded-b-xl '>
        {expanded && (
          <div className="">
            <div className="w-full flex justify-center rounded-2xl  shadow-md">
              {/* 좌측 주소 + 사진 */}
              <div className='w-[45%] pb-4 p-2'>
                <h3 className="flex items-center gap-1 text-gray-400">
                  <FiMapPin />
                  캠핑장 위치
                </h3>
                <p className="pb-[12px] font-bold text-BLACK">{reservation.address}</p>
                <img 
                  src={DummyImage}
                  alt="캠핑장 사진"
                  className='w-full h-52 object-cover object-center rounded-xl'
                />
              </div>
              {/* 구분선 */}
              <div className="w-[2.5%] border-r-[1px] mr-6" />

              {/* 우측 섹션 세부내용 */}
              <div className='w-[45%] h-auto p-4'>
                {reservation.details.map((detail, idx) => (
                  <ReservationSection
                    key={idx}
                    titleLeft={detail.titleLeft}
                    contentLeft={detail.contentLeft}
                    titleRight={detail.titleRight}
                    contentRight={detail.contentRight}
                  />
                ))}
              </div>
            </div>

            {/* "지도 보기"와 "리뷰 작성하기" 버튼 추가 */}
            <div className='w-full flex p-4 justify-around items-center bg-white rounded-2xl shadow-lg border-t-2 border-custom-gray border-dashed'>
              <Button
                width='w-[300px]'
                text='지도 보기'
                textColor="text-[#3A2929]"
                fontWeight='none'
                backgroundColor='bg-[#E3F0E5]'
                hoverTextColor='text-MAIN_GREEN'
                hoverBackgroundColor="hover:bg-HOVER_LIGHT_GREEN"
              />
              <Button
                width='w-[300px]'
                text='리뷰 작성하기'
                textColor="text-[#3A2929]"
                fontWeight='none'
                backgroundColor='bg-SUB_YELLOW'
                hoverTextColor='text-MAIN_GREEN'
                hoverBackgroundColor="hover:bg-HOVER_YELLOW"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationAccordion;