import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import DummyImage from '@/assets/images/dummyCamping2.png';
import ReservationSection from '@/components/@common/Reservation/reservationSection';

interface IReservationProps {
  campName: string;
  area: string;
  date: string;
  nights: number;
  details: string;
  people: number;
  environment: string;
  price: string;
  address: string;
}

const MyReservation  = (): JSX.Element => {
  const [selectedFilter, setSelectedFilter] = useState('전체'); // 날짜 선택 상태 관리
  const [expanded, setExpanded] = useState<Record<number, boolean>>({}); // 아코디언 토글 상태 관리
  const [viewCount, setViewCount] = useState<number>(5); // 초기에 표시할 예약내역 수 관리
  const filters = ['오늘', '일주일', '한달', '1년', '전체']; // 날짜 관련 필터 목록

  // 날짜 선택에 따른 필터 체인지 함수
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    // @TODO : 여기서 필터에 따른 데이터 로드 로직을 추가 예정
  };

  // 아코디언 "더보기" 버튼 토글
  const toggleDetails = (index: number) => {
    setExpanded(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const reservationDetails = (reservation: IReservationProps) => {
    return [
      {
        titleLeft: "날짜",
        contentLeft: `${reservation.date} ${reservation.nights}박`,
        titleRight: "",
        contentRight: "",
      },
      {
        titleLeft: "인원",
        contentLeft: `성인 ${reservation.people}`,
        titleRight: "입실 · 퇴실 시간",
        contentRight: "14:00 - 11:00",
      },
      {
        titleLeft: "사이트",
        contentLeft: reservation.area,
        titleRight: "주변 환경",
        contentRight: reservation.environment
      },
      {
        titleLeft: "기타정보",
        contentLeft: reservation.details,
        titleRight: "",
        contentRight: "",
      },
      {
        titleLeft: "가격",
        contentLeft: reservation.price,
        titleRight: "",
        contentRight: "",
      }
    ];
  };

  // 더미 데이터
  const reservations: IReservationProps[] = [
    {
      campName: '아주예쁜 캠핑장',
      area: 'A구역(벚꽃 캠핑존) 10',
      date: '24.01.01 (월) ~ 24.01.05 (금)',
      nights: 4,
      details: '파쇄석 · 개별 바베큐장 · 텐트옆 주차',
      people: 3,
      environment: '숲 · 호수',
      price: '150,000원',
      address: '경상북도 칠곡군 가산면 금화리 산49-1 아주예쁜 캠핑장'
    }
    // @TODO : 백엔드측과 연결할 때 맞추어 변경할 예정
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  .slice(0, viewCount); // 아코디언 최대 5개 표시

  // 더보기를 통해 과거 예약 내역에 더 접근할 수 있도록 하기
  const showMoreReservations = () => {
    setViewCount(prev => prev + 5); // 5개 더 불러오기
  };

  return (
    <div>
      {/* 예약 내역 헤더 */}
      <div className='flex justify-between'>
        <h1 className='text-lg font-bold pb-5'>예약 내역</h1>
        <div className='flex'>
          <button className='p-2 hover:text-MAIN_GREEN'>
            예약 현황
          </button>
          <button className='p-2 hover:text-MAIN_GREEN'>
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
            className={`w-[10%] px-4 py-2 text-sm font-medium rounded-md shadow-lg ${filter === selectedFilter ? 'bg-MAIN_GREEN text-white' : 'bg-gray-100 text-black'}`}
          >
            {filter}
          </button>
        ))}
      </div>
      
      {/* 아코디언 */}
      {reservations.map((reservation, index) => (
        <div key={index} className="mb-4 p-4 bg-white text-black rounded-2xl shadow-2xl">
          {/* 헤더 */}
          <div className="flex justify-between px-3.5">
            <div className='flex justify-center items-center py-2'>
              {/* 캠핑장 이름, 구역 */}
              <h1 className='text-2xl font-bold'>{reservation.campName}</h1>
              {!expanded[index] && <span>&nbsp;{reservation.area}</span>}
            </div>
            <div className='flex py-2 items-center'>
              {/* 날짜와 더보기 버튼 */}
              {!expanded[index] && <span>{reservation.date} · {reservation.nights}박</span>}
              <button className="flex font-bold pl-5" onClick={() => toggleDetails(index)}>
                {expanded[index] ? <IoIosArrowUp size="25" /> : <IoIosArrowDown size="25" />}
                <span className="pl-1">더보기</span>
              </button>
            </div>
          </div>
            
          {/* 내용 */}
          <div className='pt-2 text-sm'>
            {expanded[index] && (
              <div className="w-full flex justify-center">
                {/* 좌측 사진 + 주소 */}
                <div className='w-[45%]'>
                  <h1 className='text-gray-400'>캠핑장 위치</h1>
                  <p>{reservation.address}</p>
                  <img 
                    src={DummyImage}
                    alt="캠핑장 사진"
                    className='w-[400px] h-[250px] object-cover object-center rounded-xl'
                  />
                </div>

                {/* 구분선 */}
                <div className="w-[3.5%] border-r-[1px] mr-6" />

                {/* 우측 예약 세부 내용 */}
                <div className='w-[45%]'>
                  {reservationDetails(reservation).map((detail, index) => (
                    <ReservationSection
                      key={index}
                      {...detail}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 더보기 버튼 */}
          {reservations.length >= 5 && (
            <button onClick={showMoreReservations} className="mt-4 p-2 bg-MAIN_GREEN text-white rounded-md">
              <h1>과거 내역 더보기</h1>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyReservation;