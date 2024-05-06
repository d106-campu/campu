import RatingForm from "@/components/reservation/reviewList/writeReview/RatingForm";
import UploadPhotos from "@/components/reservation/reviewList/writeReview/UploadPhotos";
import Textarea from "@/components/@common/Textarea/Textarea";
import { MAX_REVIEW_LENGTH } from "@/constants/constants";
import { useState } from "react";
import Button from "@/components/@common/Button/Button";

interface ISubText {
  text: string;
  type: "success" | "info" | "error";
}

const ReviewForm = () => {
  const [photos, setPhotos] = useState<string[]>([]); // 리뷰 사진
  const [rate, setRate] = useState<number>(0); // 리뷰 점수
  const [content, setContent] = useState<string>(""); // 리뷰 내용
  const [subText, setSubText] = useState<ISubText>({ text: "", type: "info" });

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

  return (
    <>
      <UploadPhotos photos={photos} setPhotos={setPhotos} />
      <RatingForm rate={rate} setRate={setRate} />
      <div className="ml-16">
        <h3 className="font-semibold pt-5 pb-1">리뷰</h3>
        <Textarea
          className="whitespace-pre"
          // disabled={!isEdit}
          value={content}
          onChange={handleScriptChange}
          placeholder="캠핑장 리뷰를 작성해주세요 😊"
          maxLength={MAX_REVIEW_LENGTH}
          subText={subText}
        />

        {/* @TODO: post버튼 */}
        <div className="flex justify-end py-7 text-sm">
          <Button
            text="리뷰 작성하기"
            width="w-64"
            disabled={photos.length < 1 || content.length < 3}
          />
        </div>
      </div>
    </>
  );
};

export default ReviewForm;
