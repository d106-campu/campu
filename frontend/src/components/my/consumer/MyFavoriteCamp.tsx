import { useState, useEffect } from "react";
import MyFavoriteCampItem from "@/components/my/consumer/MyFavoriteCampItem";
import { useMy } from "@/hooks/my/useMy";
import { IMyFavoritCampRes } from "@/types/my";
import { FaRegFaceSmileWink } from "react-icons/fa6";
import Lottie from "react-lottie";
import {
  heartOptions,
  loadingOptions,
  warningOptions,
} from "@/assets/lotties/lottieOptions";

interface MyFavoriteCampProps {
  nickname: string;
}

const MyFavoriteCamp = ({ nickname }: MyFavoriteCampProps): JSX.Element => {
  const initialCampsToShow = 4; // 초기에 보여줄 관심 캠핑장 카드 수
  const [visibleCamps, setVisibleCamps] = useState<IMyFavoritCampRes[]>([]); // 현재 화면에 보여줄 캠핑장 개수 상태 관리
  const { useFavoriteCampsList } = useMy();
  const { data, isLoading, isError, refetch } = useFavoriteCampsList({
    pageable: { page: 0, size: 100 },
  });

  useEffect(() => {
    if (data?.campsiteList?.content) {
      setVisibleCamps(data.campsiteList.content.slice(0, initialCampsToShow)); // 4개씩 잘라서 보여주기
    }
  }, [data]);

  if (!data?.campsiteList?.content?.length) {
    return (
      <>
        <div className="min-h-[calc(100vh-10rem)]">
          <div className="flex flex-col pb-4">
            <h1 className="text-lg font-bold">
              내가 찜한 캠핑장{" "}
              <span className="text-MAIN_GREEN font-thin pl-1">
                {visibleCamps.length}
              </span>
            </h1>
          </div>

          {/* 빈자리 알림이 없을 때 처리 */}
          <div className="flex flex-col justify-center items-center h-[530px]">
            <div>
              <Lottie options={heartOptions} height={300} width={300} />
            </div>
            <div className="text-center text-sm text-GRAY">
              <h3 className="text-base text-BLACK">
                아직 찜한 <span className="text-MAIN_GREEN">캠핑장</span>이
                없어요 😥
              </h3>
              <p className="pt-2">마음에 드는 캠핑장에 하트를 눌러보세요 !</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // "더보기" 버튼 클릭 핸들러
  const handleShowMoreCamps = () => {
    if (data?.campsiteList.content) {
      setVisibleCamps((prev) => [
        ...prev,
        ...data.campsiteList.content.slice(prev.length, prev.length + 2),
      ]);
    }
  };

  // "줄이기" 버튼 클릭 핸들러
  const handleShowLessCamps = () => {
    setVisibleCamps((prev) =>
      prev.slice(0, Math.max(initialCampsToShow, prev.length - 2))
    );
  };

  // "좋아요 취소" 시 리스트에서 정보 제거
  const removeCamp = (campId: number) => {
    const updatedCamps = visibleCamps.filter(
      (camp) => camp.campsiteId !== campId
    );
    setVisibleCamps(
      updatedCamps.slice(0, Math.min(visibleCamps.length, updatedCamps.length))
    ); // 화면에 표시되는 캠핑장 목록도 업데이트
  };

  return (
    <div className="min-h-[calc(100vh-10rem)]">
      {/* 관심 캠핑장 헤더 */}
      <div className="flex flex-col pb-4">
        <h1 className="text-lg font-bold">
          내가 찜한 캠핑장{" "}
          <span className="text-MAIN_GREEN font-thin pl-1">
            {visibleCamps.length}
          </span>
        </h1>
        {data.campsiteList.content.length > 0 && (
          <>
            <h1 className="text-sm text-gray-400 flex items-center gap-1">
              {nickname}님이 찜한 캠핑장입니다
              <FaRegFaceSmileWink />
            </h1>
          </>
        )}
      </div>

      {/* 로딩중 처리 */}
      {isLoading && (
        <>
          <div className="flex flex-col justify-center items-center h-[350px]">
            <div>
              <Lottie options={loadingOptions} height={200} width={300} />
            </div>
            <div className="text-center text-sm text-GRAY">
              <h3 className="text-base font-bold text-[#A0A0A0]">로딩 중...</h3>
              <p>잠시만 기다려주세요 😀</p>
            </div>
          </div>
        </>
      )}

      {/* 데이터 에러 발생 시 처리 */}
      {isError && (
        <>
          <div className="flex flex-col justify-center items-center h-[350px]">
            <div>
              <Lottie options={warningOptions} height={180} width={250} />
            </div>
            <div className="text-center text-sm text-GRAY">
              <h3 className="text-lg text-BLACK font-bold">
                다시 시도해주세요
              </h3>
              <p className="pt-2">찜한 캠핑장을 가져오지 못했습니다. 😭</p>
              <p className="">불편을 드려 죄송합니다.</p>
            </div>
          </div>
        </>
      )}

      {/* 관심 캠핑장 카드 */}
      <div className="max-h-[550px] w-[90%] mx-auto overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          {visibleCamps.map((camp) => (
            <MyFavoriteCampItem
              key={camp.campsiteId}
              camp={camp}
              onRemove={removeCamp} // 캠프 제거 함수 전달
              refetchCamps={refetch}
            />
          ))}
        </div>
        {/* 더보기, 줄이기 버튼 */}
        <div className="flex justify-center pt-2">
          <div>
            {visibleCamps.length < data.campsiteList.content.length && (
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
};

export default MyFavoriteCamp;
