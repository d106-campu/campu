import { useState } from 'react';
import MyFavoriteCampItem from '@/components/my/consumer/MyFavoriteCampItem';
import { myCampingDummyList } from '@/components/my/consumer/MyFavoriteDummy';
import { IMyFavoritCampProps } from '@/types/myFavorite';

const MyFavoriteCamp = (): JSX.Element => {
  const initialCampsToShow = 4; // 초기에 보여줄 관심 캠핑장 카드 수
  const [visibleCamps, setVisibleCamps] = useState<IMyFavoritCampProps[]>(myCampingDummyList.slice(0, initialCampsToShow)); // 현재 화면에 보여줄 캠핑장 개수 상태 관리
  const [allCamps, setAllCamps] = useState<IMyFavoritCampProps[]>(myCampingDummyList); // 캠핑장 데이터 상태 관리

  // "더보기" 버튼 클릭 핸들러
  const handleShowMoreCamps = () => {
    setVisibleCamps(prev => [...prev, ...myCampingDummyList.slice(prev.length, prev.length + 2)]);
  };

  // "줄이기" 버튼 클릭 핸들러
  const handleShowLessCamps = () => {
    setVisibleCamps(prev => prev.slice(0, Math.max(initialCampsToShow, prev.length - 2)));
  };

  // "좋아요 취소" 시 리스트에서 정보 제거
  const removeCamp = (campId: number) => {
    const updatedCamps = allCamps.filter(camp => camp.id !== campId);
    setAllCamps(updatedCamps);
    setVisibleCamps(updatedCamps.slice(0, Math.min(visibleCamps.length, updatedCamps.length))); // 화면에 표시되는 캠핑장 목록도 업데이트
  };

  return (
    <div>
      {/* 관심 캠핑장 헤더 */}
      <div className='flex flex-col pb-4'>
        <h1 className='text-lg font-bold'>내가 찜한 캠핑장 <span className='text-MAIN_GREEN font-thin pl-1'>{allCamps.length}</span></h1>
        <h1 className="text-sm text-gray-400">"유저 닉네임"님이 좋아요한 캠핑장입니다.</h1>
      </div>

      {/* 관심 캠핑장 카드 */}
      <div className='max-h-[550px] overflow-y-auto'>
        <div className='grid grid-cols-2 gap-4 px-2 pb-2'>
          {visibleCamps.map(camp => (
            <MyFavoriteCampItem 
              key={camp.id}
              camp={camp}
              onRemove={removeCamp} // 캠프 제거 함수 전달
            />
          ))}
        </div>

        {/* 더보기, 줄이기 버튼 */}
        <div className='flex justify-center pt-6'>
          <div className='px-2'>
            {visibleCamps.length < allCamps.length && (
              <button onClick={handleShowMoreCamps}>더보기</button>
            )}
          </div>
          <div className='px-2'>
            {visibleCamps.length > initialCampsToShow && (
              <button onClick={handleShowLessCamps}>줄이기</button> 
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyFavoriteCamp;