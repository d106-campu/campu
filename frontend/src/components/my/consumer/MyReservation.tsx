import { useState, useEffect } from 'react';
import Button from '@/components/@common/Button/Button';
import ReservationAccordion from '@/components/my/consumer/ReservationAccordion';
import { IMyReservationAllRes } from '@/types/my';
import { useMy } from '@/hooks/my/useMy';

const MyReservation = (): JSX.Element => {
  const { useMyReservations } = useMy();
  const [selectedFilter, setSelectedFilter] = useState('전체'); // 날짜 선택 상태 관리
  const [expanded, setExpanded] = useState<Record<number, boolean>>({}); // 아코디언 토글 상태 관리
  const [reservations, setReservations] = useState<IMyReservationAllRes[]>([]); // 예약내역 데이터 상태 관리
  const [viewCount, setViewCount] = useState<number>(4); // 초기에 표시할 예약내역 수 관리
  const initialViewCount = 4; // 렌더링 시 아코디언 첫 개수
  const filters = ['1년', '6개월', '한달', '전체'];; // 날짜 관련 필터 목록
  const { data, isLoading, isError } = useMyReservations({
    pageable: { page: 0, size: 100 }, dateType: 'TOTAL', useType: 'BEFORE'
  });

  useEffect(() => {
    if (data?.reservationList?.content) {
      setReservations(data.reservationList.content);
    }
  }, [data]);

  // 더미데이터 로드 후 가장 최근순으로 정렬하기 위한 계산
  // useEffect(() => {
  //   const loadedReservations = GetReservations();
  //   const today = new Date();
  //   // @TODO : 백엔드로부터 받아올 때 최근순 정렬이 되어있지 않다면 사용
  //   loadedReservations.sort((a, b) => {
  //     const dateA = new Date(a.date.split(' ~ ')[0]);
  //     const dateB = new Date(b.date.split(' ~ ')[0]);
  //     return Math.abs(today.getTime() - dateA.getTime()) - Math.abs(today.getTime() - dateB.getTime());
  //   });
    
  //   setReservations(loadedReservations); 
  // }, []);

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

  // 로딩 중일 때 처리
  if (isLoading) {
    return <div>로딩 중... 잠시만 기다려주세요 😀</div>;
  }

  // 데이터 에러 발생 시 처리
  if (isError) {
    return <div>내 예약내역을 가져오지 못했습니다. 😭</div>;
  }

  // 내가 쓴 리뷰가 하나도 없을 때 처리
  if (reservations.length === 0) {
    // console.error("내 예약내역 리스트가 비어있음 !");
    return (
      <>
        <div>
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
          <div className="text-center">
            <h1 className="">아직 예약한 <span className="text-MAIN_GREEN">캠핑장</span>이 없어요 😃</h1>
            <h1 className="text-sm text-GRAY pt-2">캠핑장을 예약해보세요!</h1>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="min-h-[calc(100vh-10rem)]">
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
            className={`w-[7.5%] px-4 py-2 text-sm font-medium rounded-md shadow-lg ${filter === selectedFilter ? 'bg-MAIN_GREEN text-white' : 'bg-gray-100 text-black'}`}
          >
            {filter}
          </button>
        ))}
      </div>
      
      {/* 아코디언 */}
      <div className='max-h-[500px] overflow-y-auto'>
        <div className='w-[90%] mx-auto'>
          {reservations.slice(0, viewCount).map((reservation, index) => (
            <ReservationAccordion
              key={index}
              index={index}
              reservation={reservation}
              expanded={expanded[index]}
              toggleDetails={() => toggleDetails(index)}
            />
          ))}
        </div>
      </div>

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