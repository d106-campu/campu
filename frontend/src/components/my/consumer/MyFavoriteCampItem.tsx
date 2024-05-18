import { useState } from "react";
import { FaStar, FaHeart } from "react-icons/fa6";
import { IMyFavoritCampRes } from "@/types/my";
import Modal from "@/components/@common/Modal/Modal";
import { useMy } from "@/hooks/my/useMy";
import Toast from "@/components/@common/Toast/Toast";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import { heartOptions } from "@/assets/lotties/lottieOptions";
import Button from "@/components/@common/Button/Button";
import { RiArrowRightSLine } from "react-icons/ri";

interface MyFavoriteCampItemProps {
  camp: IMyFavoritCampRes;
  onRemove: (campId: number) => void;
  refetchCamps: () => void;
}

const MyFavoriteCampItem = ({
  camp,
  onRemove,
  refetchCamps,
}: MyFavoriteCampItemProps) => {
  const navigate = useNavigate();
  // 좋아요 상태 관리, 처음에는 항상 좋아요 상태(true)
  const [isLiked, setIsLiked] = useState<boolean>(true);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false); // 좋아요 취소 확인 모달 상태 관리
  const { useDeleteLike } = useMy();

  const handleToggleLike = () => {
    if (isLiked) {
      setShowConfirmModal(true); // 좋아요 상태일 때 모달 표시
    } else {
      setIsLiked(!isLiked); // 좋아요 상태가 아니면 바로 토글
    }
  };

  const confirmUnLike = () => {
    useDeleteLike.mutate(camp.campsiteId, {
      onSuccess: () => {
        setIsLiked(false); // 좋아요 상태를 비활성화로 변경
        onRemove(camp.campsiteId);
        setShowConfirmModal(false);
        refetchCamps();
        Toast.success("성공적으로 찜을 취소했습니다.");
      },
      onError: (error) => {
        console.error("좋아요 취소 실패함!!", error);
        Toast.error("일시적 오류로 찜을 취소하지 못했습니다.");
      },
    });
  };

  return (
    <>
      <div className="flex justify-center w-[98%] mx-auto">
        <div
          key={camp.campsiteId}
          className="relative  w-full shadow-lg rounded-xl"
        >
          <img
            src={camp.thumbnailImageUrl}
            alt={camp.campsiteName}
            className="w-full h-[135px] rounded-t-xl object-cover object-center"
          />
          <button
            onClick={handleToggleLike}
            className={`absolute top-5 right-5 ${
              isLiked ? "text-[#FF777E]" : "text-[#e9e9e9]"
            }`}
            aria-label="좋아요 토글"
          >
            <FaHeart size={20} />
          </button>

          <div
            onClick={() => navigate(`/camps/${camp.campsiteId}`)}
            className="w-full pt-2 text-BLACK cursor-pointer px-3 py-2"
          >
            {/* 캠핑장 이름 + 별점 */}
            <div className="w-full flex justify-between">
              <button className="flex items-center gap-1">
                <h1 className="font-bold">{camp.campsiteName}</h1>
                <RiArrowRightSLine />
              </button>

              <div className="flex items-center text-sm text-SUB_BLACK">
                <FaStar className="text-MAIN_YELLOW mx-1" />
                <p>{camp.score.toFixed(1)}</p>
              </div>
            </div>
            {/* 소개+주소 /// 가격 */}
            <div className="w-full flex justify-between items-end">
              <div className="w-[70%] text-xs">
                <p className="line-clamp-1 text-SUB_BLACK">
                  {camp.lineIntro || `${camp.campsiteName}입니다.`}
                </p>
                <p className="text-gray-400 line-clamp-1">{camp.address}</p>
              </div>

              <div className="">
                <p className="text-MAIN_RED text-sm font-bold">
                  {camp.minPrice} ~
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 좋아요 취소 시 모달 호출 */}
      {showConfirmModal && (
        <Modal
          width="w-[35%]"
          hasIcon={false}
          onClose={() => setShowConfirmModal(false)}
        >
          <div className="flex flex-col items-center text-center text-BLACK">
            <div>
              <Lottie options={heartOptions} height={125} width={150} />
            </div>
            <h3 className="text-xl font-bold pt-5">좋아요 취소</h3>
            <div className="text-sm pt-2">
              <p>좋아요 취소 시 찜한 캠핑장에서 삭제됩니다.</p>
              <p>정말 좋아요를 취소하시겠습니까?</p>
            </div>
          </div>
          <div className="flex justify-evenly pt-5">
            <Button
              text="아니요"
              backgroundColor="bg-GRAY"
              hoverBackgroundColor="hover:bg-[#acacac]"
              onClick={(event) => {
                event.stopPropagation(); // 이벤트 전파 중단
                setShowConfirmModal(false);
              }}
            />
            <Button
              text="취소할게요"
              backgroundColor="bg-MAIN_PINK"
              hoverBackgroundColor="hover:bg-MAIN_RED"
              onClick={confirmUnLike}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default MyFavoriteCampItem;
