import { useState, useEffect } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Button from '@/components/@common/Button/Button';
import DummyImage from '@/assets/images/dummyCamping2.png';
import ReservationSection from '@/components/@common/Reservation/reservationSection';
import GetReservations from '@/components/my/consumer/MyReservationItem';

interface IDetailProps {
  titleLeft: string;
  contentLeft: string;
  titleRight: string;
  contentRight: string;
}

interface IReservationProps {
  campName: string;
  area: string;
  date: string;
  nights: number;
  details: IDetailProps[];
  people: number;
  environment: string;
  price: string;
  address: string;
}

const MyReservation = ({
  campName,
  area,
  date,
  nights,
  details,
  people,
  environment,
  price,
  address
}: IReservationProps): JSX.Element => {
  const [selectedFilter, setSelectedFilter] = useState('전체'); // 날짜 선택 상태 관리
  const [expanded, setExpanded] = useState<Record<number, boolean>>({}); // 아코디언 토글 상태 관리
  const [reservations, setReservations] = useState<IReservationProps[]>([
    { campName, area, date, nights, details, people, environment, price, address }
  ]); // 컨슈머컨테이너에서 받은 props로 예약 상태 관리
  const [viewCount, setViewCount] = useState<number>(4); // 초기에 표시할 예약내역 수 관리
  const initialViewCount = 4; // 렌더링 시 아코디언 첫 개수
  const filters = ['오늘', '일주일', '한달', '1년', '전체']; // 날짜 관련 필터 목록

  // 더미데이터 로드 후 가장 최근순으로 정렬하기 위한 계산
  useEffect(() => {
    const loadedReservations = GetReservations();
    const today = new Date();
    // @TODO : 백엔드로부터 받아올 때 최근순 정렬이 되어있지 않다면 사용
    loadedReservations.sort((a, b) => {
      const dateA = new Date(a.date.split(' ~ ')[0]);
      const dateB = new Date(b.date.split(' ~ ')[0]);
      return Math.abs(today.getTime() - dateA.getTime()) - Math.abs(today.getTime() - dateB.getTime());
    });
    
    setReservations(loadedReservations); 
  }, []);

  // 날짜 선택에 따른 필터 체인지
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    // @TODO : 여기서 필터에 따른 데이터 로드 로직을 추가 예정
  };

  // 아코디언 "더보기" 버튼 토글
  const toggleDetails = (index: number) => {
    setExpanded(prev => ({ ...prev, [index]: !prev[index] }));
  };

  // '과거 내역 더보기'를 통해 과거 예약 내역에 더 접근할 수 있도록 하기
  const showMoreReservations = () => {
    setViewCount(prev => Math.min(prev + 4, reservations.length));
  };

  // '이전으로' 버튼으로 다시 돌아가기
  const showLessReservations = () => {
    setViewCount(prev => Math.max(prev - 4, initialViewCount));
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
      <div className="flex space-x-2 pb-10">
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
      {reservations.slice(0, viewCount).map((reservation, index) => (
        <div key={index} className="bg-MAIN_GREEN text-white mb-10 rounded-tl-3xl rounded-tr-3xl rounded-br-3xl rounded-bl-3xl shadow-2xl">
          {/* 헤더 */}
          <div className="flex justify-between items-center px-5 pt-1">
            <div className='flex justify-center items-center py-2'>
              {/* 캠핑장 이름, 구역 */}
              <h1 className='text-xl font-bold'>{reservation.campName}</h1>
              {!expanded[index] && <span className='pl-2 text-sm'>&nbsp;{reservation.area}</span>}
            </div>
            <div className='flex py-2 items-center'>
              {/* 날짜 + 더보기 버튼 */}
              {!expanded[index] && <span className='text-sm'>{reservation.date} · {reservation.nights}박</span>}
              <button className="flex pl-5" onClick={() => toggleDetails(index)}>
                {expanded[index] ? <IoIosArrowUp size="20" /> : <IoIosArrowDown size="20" />}
                {expanded[index] ? <span></span> : <span className="pl-1 text-sm outline-none">더보기</span>}
              </button>
            </div>
          </div>
            
          {/* 내용 */}
          <div className='text-sm bg-white text-black pt-2 pb-3 rounded-br-3xl rounded-bl-3xl shadow-2xl'>
            {expanded[index] && (
              <div className="w-full flex justify-center">
                {/* 좌측 사진 + 주소 */}
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

                {/* 우측 예약 세부 사항 */}
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
            )}
            {/* 지도 보기 + 리뷰 작성하기 */}
            {expanded[index] && (
              <div className='w-full flex justify-around items-center mt-3 pt-3 rounded-br-3xl rounded-bl-3xl border-t-2 border-custom-gray border-dashed'>
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
            )}
          </div>
        </div>
      ))}

      {/* 내역 더보기 토글 버튼 */}
      <div className='flex justify-center my-4'>
        {viewCount > initialViewCount && (
          <Button
            text='이전으로'
            textColor='text-black'
            backgroundColor='none'
            hoverTextColor='text-MAIN_GREEN'
            hoverBackgroundColor='none'
            onClick={showLessReservations}
          />
        )}
        {viewCount < reservations.length && (
          <Button
            text='과거 내역 더보기'
            textColor='text-black'
            backgroundColor='none'
            hoverTextColor='text-MAIN_GREEN'
            hoverBackgroundColor='none'
            onClick={showMoreReservations}
          />
        )}
      </div>
    </div>
  );
};

export default MyReservation;