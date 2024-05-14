import { useState, useEffect } from 'react';
import Button from '@/components/@common/Button/Button';
import ReservationAccordion from '@/components/my/consumer/ReservationAccordion';
import { IMyReservationAllRes } from '@/types/my';
import { useMy } from '@/hooks/my/useMy';
import MapModal from '@/components/@common/Map/MapModal';

const MyReservation = (): JSX.Element => {
  const { useMyReservations } = useMy();
  const [selectedFilter, setSelectedFilter] = useState<'MONTH' | 'MONTH6' | 'YEAR' | 'TOTAL'>('TOTAL'); // 날짜 선택 상태 관리
  const [useType, setUseType] = useState<'BEFORE' | 'AFTER'>('BEFORE'); // 이용완료 or 이용완료 선택 상태 관리
  const [expanded, setExpanded] = useState<Record<number, boolean>>({}); // 아코디언 토글 상태 관리
  const [reservations, setReservations] = useState<IMyReservationAllRes[]>([]); // 예약내역 데이터 상태 관리
  const [viewCount, setViewCount] = useState<number>(4); // 초기에 표시할 예약내역 수 관리
  const initialViewCount = 4; // 렌더링 시 아코디언 첫 개수
  const filters = ['YEAR', 'MONTH6', 'MONTH', 'TOTAL'] as const; // 날짜 관련 필터 목록
  const { data, isLoading, isError, refetch } = useMyReservations({
    pageable: { page: 0, size: 100 }, dateType: selectedFilter, useType: useType,
  });
  const [mapModalOpen, setMapModalOpen] = useState<boolean>(false); // 맵 모달 상태 관리
  const [mapLocation, setMapLocation] = useState({ lat: 0, lng: 0, facltNm: '', addr1: '', level: 5 }); // 전달할 위도와 경도 상태 관리

  // 예약 내역 조회 API 연결
  useEffect(() => {
    if (data?.reservationList?.content) {
      const allReservations = data.reservationList.content;
      setReservations(allReservations);
      setExpanded({});
      setViewCount(initialViewCount);
    } else {
      setReservations([]); // 예약내역 0개로 받아오면 빈 배열로 설정
    }
  }, [data, selectedFilter, useType]);

  // 받아오는 날짜 필터 한글로 변환
  const filterLabels: Record<typeof filters[number], string> = {
    YEAR: '1년',
    MONTH6: '6개월',
    MONTH: '1개월',
    TOTAL: '전체'
  };
  
  // 날짜 선택에 따른 필터 체인지
  const handleDateTypeChange = (filter: 'MONTH' | 'MONTH6' | 'YEAR' | 'TOTAL') => {
    console.log("보내는 DateType 확인 :", filter)
    setSelectedFilter(filter);
    refetch();
  };
  
  // 예약 현황 또는 이용 완료에 대한 선택 타입
  const handleUseTypeChange = (type: 'BEFORE' | 'AFTER') => {
    console.log("선택한 useType 확인 :", type)
    setUseType(type);
    refetch();
  };
  
  // 아코디언 "더보기" 버튼 토글
  const toggleDetails = (index: number) => {
    setExpanded(prev => ({ ...prev, [index]: !prev[index] }));
  };
  
  // '더보기'를 통해 과거 예약 내역에 더 접근할 수 있도록 하기
  const showMoreReservations = () => {
    setViewCount(prev => Math.min(prev + 4, data?.reservationList?.content?.length || 0));
  };
  
  // '줄이기' 버튼으로 다시 돌아가기
  const showLessReservations = () => {
    setViewCount(prev => Math.max(prev - 4, initialViewCount));
  };
  
  // 지도 모달 열기
  const openMapModal = (lat: number, lng: number, facltNm: string, addr1: string, level: number) => {
    setMapLocation({ lat, lng, facltNm, addr1, level });
    setMapModalOpen(true);
  };

  // 지도 모달 닫기
  const closeMapModal = () => {
    setMapModalOpen(false);
  }

  // 로딩 중일 때 처리
  if (isLoading) {
    return <div>로딩 중... 잠시만 기다려주세요 😀</div>;
  }
  
  // 데이터 에러 발생 시 처리
  if (isError) {
    return <div>내 예약내역을 가져오지 못했습니다. 😭</div>;
  }

  // 내 예약내역이 하나도 없을 때 처리
  if (data?.reservationList?.content.length === 0) {
    // console.error("내 예약내역 리스트가 비어있음 !");
    return (
      <>
        <div>
        <div className='flex justify-between'>
          <h1 className='text-lg font-bold pb-5'>예약 내역</h1>
          <div className='flex'>
            <button
              className='p-2 hover:text-MAIN_GREEN'
            >
              예약 현황
            </button>
            <button
              className='p-2 hover:text-MAIN_GREEN'
            >
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
        <div className='flex'>
          <h1 className='text-lg font-bold pb-5'>예약 내역</h1>
          <span className="text-MAIN_GREEN font-thin pl-2 text-lg">{reservations.length || 0}</span>
        </div>
        <div className='flex'>
          <button
            className={`p-2 ${useType === 'BEFORE' ? 'text-MAIN_GREEN font-bold' : ''}`}
            onClick={() => handleUseTypeChange('BEFORE')}
          >
            예약 현황
          </button>
          <button
            className={`p-2 ${useType === 'AFTER' ? 'text-MAIN_GREEN font-bold' : ''}`}
            onClick={() => handleUseTypeChange('AFTER')}
          >
            이용 완료
          </button>
        </div>
      </div>

      {/* 날짜 선택 */}
      <div className="flex space-x-2 pb-10">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => handleDateTypeChange(filter as 'MONTH' | 'MONTH6' | 'YEAR' | 'TOTAL')}
            className={`w-[7.5%] px-4 py-2 text-sm font-medium rounded-md shadow-lg ${filter === selectedFilter ? 'bg-MAIN_GREEN text-white' : 'bg-gray-100 text-black'}`}
          >
            {filterLabels[filter]}
          </button>
        ))}
      </div>
      
      {/* 아코디언 */}
      <div className='max-h-[500px] overflow-y-auto'>
        <div className='w-[90%] mx-auto'>
          {data?.reservationList?.content.slice(0, viewCount).map((reservation, index) => (
            <ReservationAccordion
              key={index}
              index={index}
              reservation={reservation}
              expanded={expanded[index]}
              toggleDetails={() => toggleDetails(index)}
              openMapModal={openMapModal}
            />
          ))}
        </div>
      </div>

      {/* 지도 보기 렌더링 */}
      {mapModalOpen && (
        <MapModal
          lat={mapLocation.lat}
          lng={mapLocation.lng}
          facltNm={mapLocation.facltNm}
          // rate={mapLocation.rate}
          addr1={mapLocation.addr1}
          level={5}
          toggleModal={closeMapModal}
        />
      )}

      {/* 내역 더보기 토글 버튼 */}
      <div className='flex justify-center my-4'>
        {viewCount > initialViewCount && (
          <Button
            text='줄이기'
            textColor='text-black'
            backgroundColor='none'
            hoverTextColor='text-MAIN_GREEN'
            hoverBackgroundColor='none'
            onClick={showLessReservations}
          />
        )}
        {viewCount < (data?.reservationList?.content.length || 0) && (
          <Button
            text='더보기'
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