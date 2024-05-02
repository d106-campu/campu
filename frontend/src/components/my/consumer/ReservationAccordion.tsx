// import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import DummyImage from '@/assets/images/dummyCamping2.png';
import ReservationSection from '@/components/@common/Reservation/reservationSection';
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
    <div className="bg-MAIN_GREEN text-white mb-10 rounded-2xl">
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
      
      <div className='text-sm bg-white text-black pt-1 pb-3 rounded-br-2xl rounded-bl-2xl shadow-md'>
        {expanded && (
          <div>
            <div className="w-full flex justify-center">
              {/* 좌측 주소 + 사진 */}
              <div className='w-[45%] '>
                <h1 className='text-gray-400'>캠핑장 위치</h1>
                <p>{reservation.address}</p>
                <img 
                  src={DummyImage}
                  alt="캠핑장 사진"
                  className='w-[450px] h-[250px] object-cover object-center rounded-xl'
                />
              </div>
              {/* 구분선 */}
              <div className="w-[2.5%] border-r-[1px] mr-6" />

              {/* 우측 섹션 세부내용 */}
              <div className='w-[45%] h-auto pt-1'>
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
            <div className='w-full flex justify-around items-center mt-3 pt-2 pb-1 rounded-br-3xl rounded-bl-3xl border-t-2 border-custom-gray border-dashed'>
              <Button
                width='w-[300px]'
                text='지도 보기'
                textColor='text-black'
                fontWeight='none'
                backgroundColor='bg-[#E8EFCF]'
                hoverTextColor='text-MAIN_GREEN'
                hoverBackgroundColor='none'
              />
              <Button
                width='w-[300px]'
                text='리뷰 작성하기'
                textColor='text-black'
                fontWeight='none'
                backgroundColor='bg-yellow-100'
                hoverTextColor='text-MAIN_GREEN'
                hoverBackgroundColor='none'
              />
            </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default ReservationAccordion;