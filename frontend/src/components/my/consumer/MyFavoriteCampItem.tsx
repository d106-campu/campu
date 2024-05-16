import { useState } from 'react';
import { FaStar, FaHeart } from "react-icons/fa6";
import { IMyFavoritCampRes } from '@/types/my'
import Modal from '@/components/@common/Modal/Modal';
import { useMy } from '@/hooks/my/useMy';
import Toast from '@/components/@common/Toast/Toast';
import { FaArrowRightToBracket } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

interface MyFavoriteCampItemProps {
  camp: IMyFavoritCampRes;
  onRemove: (campId: number) => void;
  refetchCamps: () => void;
}

const MyFavoriteCampItem = ({
  camp,
  onRemove,
  refetchCamps,
}:MyFavoriteCampItemProps) => {
  const navigate = useNavigate();
  // 좋아요 상태 관리, 처음에는 항상 좋아요 상태(true)
  const [isLiked, setIsLiked] = useState<boolean>(true);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false); // 좋아요 취소 확인 모달 상태 관리
  const { useDeleteLike } = useMy();

  const handleToggleLike = () => {
    if (isLiked) {
      setShowConfirmModal(true);  // 좋아요 상태일 때 모달 표시
    } else {
      setIsLiked(!isLiked);  // 좋아요 상태가 아니면 바로 토글
    }
  };

  const confirmUnLike = () => {
    useDeleteLike.mutate(camp.campsiteId, {
      onSuccess: () => {
        console.log("취소합니다 누름@")
        setIsLiked(false); // 좋아요 상태를 비활성화로 변경
        onRemove(camp.campsiteId);
        setShowConfirmModal(false);
        refetchCamps();
        Toast.success('성공적으로 찜을 취소했습니다.')
      },
      onError: (error) => {
        console.error('좋아요 취소 실패함!!', error)
        Toast.error('일시적 오류로 찜을 취소하지 못했습니다.')
      }
    });
  };

  return (
    <div className="flex justify-center">
      <div key={camp.campsiteId} className="relative px-2 py-2 w-full shadow-lg rounded-xl transition-transform duration-500 transform hover:scale-105">
        <img
          src={camp.thumbnailImageUrl}
          alt={camp.campsiteName}
          className="w-full h-[150px] rounded-md object-cover object-center"
        />
        <button
          onClick={handleToggleLike}
          className={`absolute top-5 right-5 ${isLiked ? 'text-red-500' : 'text-gray-300'}`}
          aria-label="좋아요 토글"
        >
          <FaHeart size={20} />
        </button>
        {/* 좋아요 취소 시 모달 호출 */}
        {showConfirmModal && (
          <Modal
            width="w-1/3"
            title={camp.campsiteName}
            hasIcon={false}
            onClose={() => setShowConfirmModal(false)}
          >
            <div className="text-center p-1">
              <p>이 캠핑장에 대한 관심을 <span className='text-red-400'>취소</span>하시겠어요?</p>
              <div className="mt-4 flex justify-around">
                <button
                  className="bg-SUB_GREEN_02 hover:bg-SUB_GREEN_01 text-gray-700 hover:text-MAIN_GREEN px-4 py-2 rounded-lg outline-none"
                  onClick={confirmUnLike}
                >
                  <span>취소합니다</span>
                </button>
                <button
                  className="bg-SUB_GREEN_02 hover:bg-SUB_GREEN_01 text-gray-700 hover:text-MAIN_GREEN px-4 py-2 rounded-lg outline-none"
                  onClick={() => setShowConfirmModal(false)}
                >
                  <span>아니요</span>
                </button>
              </div>
            </div>
          </Modal>
        )}

        <div className="w-full pt-2 px-1">
          {/* 캠핑장 이름 + 별점 */}
          <div className="w-full flex justify-between">
            <div className='flex'>
              <h1 className="font-bold">{camp.campsiteName}</h1>
              <button
                className='pl-2'
                onClick={() =>
                  navigate(`/camps/${camp.campsiteId}`)
                }
              >
                <FaArrowRightToBracket />
              </button>
            </div>
            <div className="flex items-center">
              <FaStar className="text-yellow-500 mx-1" />
              <p>{camp.score}</p>
            </div>
          </div>
          {/* 소개+주소 /// 가격 */}
          <div className="w-full flex justify-between">
            <div className="w-[50%]">
              <p className="text-sm overflow-hidden whitespace-nowrap overflow-ellipsis">
                {camp.lineIntro}
              </p>
              <p className="text-sm text-gray-400">{camp.address}</p>
            </div>
            <div className="w-[50%] flex justify-end">
              <p className="text-xl text-orange-700 font-extrabold">
                {camp.minPrice} ~
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFavoriteCampItem;
