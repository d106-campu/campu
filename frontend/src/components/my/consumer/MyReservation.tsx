import { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
// import {IoIosArrowUp } from "react-icons/io";

interface IReservation {
  campName: string;
  area: string;
  date: string;
  nights: number;
  details: string;
}

const MyReservation  = (): JSX.Element => {
  const [selectedFilter, setSelectedFilter] = useState('전체');

  const filters = ['오늘', '일주일', '한달', '1년', '전체'];

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    // @TODO: 여기서 필터에 따른 데이터 로드 로직을 추가 예정
  };

  // 더미 데이터
  const reservations: IReservation[] = [
    {
      campName: '가나다라 캠핑장',
      area: 'A구역(벚꽃 캠핑존) 10',
      date: '24.01.01',
      nights: 4,
      details: '예약 세부사항...'
    }
  ];

  return (
    <div>
      {/* 예약 내역 헤더 */}
      <div className='flex justify-between'>
        <h1 className='text-lg font-bold pb-5'>예약 내역</h1>
        <div className='flex'>
          <button className='p-2'>
            예약 현황
          </button>
          <button className='p-2'>
            이용 완료
          </button>
        </div>
      </div>

      {/* 날짜 선택 */}
      <div className="flex space-x-2 mb-4">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => handleFilterChange(filter)}
            className={`w-[10%] px-4 py-2 text-sm font-medium rounded-md ${filter === selectedFilter ? 'bg-MAIN_GREEN text-white' : 'bg-gray-100 text-black'}`}
          >
            {filter}
          </button>
        ))}
      </div>
      
      {/* 아코디언 */}
      <div>
        {reservations.map((reservation, index) => (
          <div key={index} className="mb-4 p-4 bg-MAIN_GREEN text-white rounded-tr-2xl rounded-tl-2xl">
            <div className="flex justify-between">
              <div className='flex justify-center items-center'>
                <h1 className='text-2xl font-bold'>{reservation.campName} </h1>
                <span>&nbsp;{reservation.area}</span>
              </div>
              <div>
                <h1 className='flex'>
                  {reservation.date}(월) · {reservation.nights}박
                  <button className="flex font-bold pl-5">
                    <p>더보기</p>
                    <IoIosArrowDown size="25" color="#FFFFFF" />
                  </button>
                </h1>
              </div>
            </div>
            <div className="mt-2">
              {/* <p>{reservation.details}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyReservation ;