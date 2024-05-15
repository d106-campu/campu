import RatingForm from "@/components/reservation/reviewList/writeReview/RatingForm";
import UploadPhotos from "@/components/reservation/reviewList/writeReview/UploadPhotos";
import Textarea from "@/components/@common/Textarea/Textarea";
import { MAX_REVIEW_LENGTH } from "@/constants/constants";
import { useState } from "react";
import Button from "@/components/@common/Button/Button";
import Toast from "@/components/@common/Toast/Toast";
import { useReview } from "@/hooks/review/useReview";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ISubText {
  text: string;
  type: "success" | "info" | "error";
}

interface IReviewFormProps {
  reservationId: number;
  campsiteId: number;
}

const ReviewForm = ({ reservationId, campsiteId }: IReviewFormProps) => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<File[]>([]); // 리뷰 사진
  const [score, setScore] = useState<number>(0); // 리뷰 점수
  const [content, setContent] = useState<string>(""); // 리뷰 내용
  const [subText, setSubText] = useState<ISubText>({ text: "", type: "info" });

  const { usePostReview } = useReview();
  const { mutate: postReview } = usePostReview();

  const handleScriptChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    // 입력 길이가 maxLength를 초과하지 않도록 체크
    if (value.length <= MAX_REVIEW_LENGTH) {
      setContent(value);
      setSubText({ text: "", type: "info" });
    } else {
      // maxLength를 초과하려고 할 때 메시지 설정
      setSubText({
        text: `최대 ${MAX_REVIEW_LENGTH}자까지 입력 가능합니다.`,
        type: "error",
      });
    }
  };

  const handleSubmitReview = () => {
    if (photos.length === 0) {
      Toast.error("이미지를 선택하지 않았습니다.");
      return;
    }
    if (content.length < 10) {
      Toast.error("내용은 10자 이상 작성해야 합니다.");
      return;
    }

    const goToReviewList = () => {
      navigate(`/camps/${campsiteId}/reviews`);
    };

    // API 호출
    postReview(
      { reservationId, content, score, files: photos },
      {
        onSuccess: () => {
          Toast.success("리뷰가 성공적으로 등록되었습니다.");
          goToReviewList();
        },
        onError: (err) => {
          if (axios.isAxiosError(err)) {
            const res = err.response;
            if (!photos) {
              Toast.error("사진 첨부는 필수 입니다");
            }
            if (res && res.status === 401) {
              Toast.error("리뷰 작성의 권한이 없습니다😥");
              return;
            }

            if (res && res.status === 404) {
              Toast.error("존재하지 않는 예약입니다😥");
              return;
            }

            // @TODO: 에러 메시지에 따라 에러문구 분리
            if (res && res.status === 409) {
              if (res.data.message === "Already Existed Review") {
                Toast.error("이미 리뷰를 작성한 예약입니다.");
                return;
              }
              if (res.data.code === "Not end reservation") {
                Toast.error(
                  "예약이 완료되지 않았습니다😥 캠핑장 방문 후에 리뷰를 작성해주세요"
                );
                return;
              }
            }
          }
          Toast.error(`리뷰 등록에 실패했습니다. 다시 시도해주세요.`);
        },
      }
    );
  };

  return (
    <>
      <UploadPhotos photos={photos} setPhotos={setPhotos} />
      <RatingForm score={score} setScore={setScore} />
      <div className="ml-16 w-[765px]">
        <h3 className="font-semibold pt-5 pb-1">리뷰</h3>
        <Textarea
          className="whitespace-pre text-BLACK"
          value={content}
          onChange={handleScriptChange}
          placeholder="캠핑장 리뷰를 작성해주세요 😊"
          maxLength={MAX_REVIEW_LENGTH}
          subText={subText}
        />

        <div className="flex justify-end py-7 text-sm">
          <Button
            onClick={handleSubmitReview}
            text="리뷰 작성하기"
            width="w-64"
          />
        </div>
      </div>
    </>
  );
};

export default ReviewForm;
