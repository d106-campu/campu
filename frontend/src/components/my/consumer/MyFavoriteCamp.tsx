import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { RootState } from '@/app/store';
import MyFavoriteCampItem from '@/components/my/consumer/MyFavoriteCampItem';
import { useMy } from '@/hooks/my/useMy';
import { IMyFavoritCampRes } from '@/types/my';

const MyFavoriteCamp = (): JSX.Element => {
  const initialCampsToShow = 4; // 초기에 보여줄 관심 캠핑장 카드 수
  const [visibleCamps, setVisibleCamps] = useState<IMyFavoritCampRes[]>([]); // 현재 화면에 보여줄 캠핑장 개수 상태 관리
  const { useFavoriteCampsList } = useMy();
  const { data, isLoading, isError } = useFavoriteCampsList({ pageable: { page: 1, size: 10 } });
  const nickname = useSelector((state: RootState) => state.auth.nickname);

  useEffect(() => {
    if (data?.content) {
      setVisibleCamps(data.content.slice(0, initialCampsToShow)); // 4개씩 잘라서 보여주기
    }
  }, [data]);

  if (isLoading) return <div>로딩 중... 잠시만 기다려주세요 😀</div>;
  if (isError) return <div>내가 찜한 캠핑장 목록에 접근하지 못했습니다. 😭</div>;
  if (!data?.content?.length) {
    console.error("내가 찜한 캠핑장 리스트가 비어있음 !");
    return (
      <>
        <div>
          <div className='flex flex-col pb-4'>
            <h1 className='text-lg font-bold'>내가 찜한 캠핑장 <span className='text-MAIN_GREEN font-thin pl-1'>{visibleCamps.length}</span></h1>
            <h1 className="text-sm text-gray-400">{nickname}님이 좋아요한 캠핑장입니다.</h1>
          </div>
          <div className="text-center">
            <h1 className="">아직 찜한 <span className="text-MAIN_GREEN">캠핑장</span>이 없어요 😃</h1>
            <h1 className="text-sm text-GRAY pt-2">원하는 캠핑장에 하트를 눌러보세요 !</h1>
          </div>
        </div>
      </>
    )
  }  

  // "더보기" 버튼 클릭 핸들러
  const handleShowMoreCamps = () => {
    if (data?.content) {
      setVisibleCamps(prev => [...prev, ...data.content.slice(prev.length, prev.length + 2)]);
    }
  };

  // "줄이기" 버튼 클릭 핸들러
  const handleShowLessCamps = () => {
    setVisibleCamps(prev => prev.slice(0, Math.max(initialCampsToShow, prev.length - 2)));
  };

  // "좋아요 취소" 시 리스트에서 정보 제거
  const removeCamp = (campId: number) => {
    const updatedCamps = visibleCamps.filter(camp => camp.campsiteId !== campId);
    setVisibleCamps(updatedCamps.slice(0, Math.min(visibleCamps.length, updatedCamps.length))); // 화면에 표시되는 캠핑장 목록도 업데이트
  };

  return (
    <div className="min-h-[calc(100vh-10rem)]">
      {/* 관심 캠핑장 헤더 */}
      <div className='flex flex-col pb-4'>
        <h1 className='text-lg font-bold'>내가 찜한 캠핑장 <span className='text-MAIN_GREEN font-thin pl-1'>{visibleCamps.length}</span></h1>
        <h1 className="text-sm text-gray-400">{nickname}님이 좋아요한 캠핑장입니다.</h1>
      </div>

      {/* 관심 캠핑장 카드 */}
      <div className='max-h-[550px] overflow-y-auto'>
        <div className='grid grid-cols-2 gap-4'>
          {visibleCamps.map(camp => (
            <MyFavoriteCampItem 
              key={camp.campsiteId}
              camp={camp}
              onRemove={removeCamp} // 캠프 제거 함수 전달
            />
          ))}
        </div>

        {/* 더보기, 줄이기 버튼 */}
        <div className='flex justify-center pt-2'>
          <div>
            {visibleCamps.length < data.content.length && (
              <button onClick={handleShowMoreCamps}>더보기</button>
            )}
          </div>
          <div>
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