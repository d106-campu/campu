import Rating from "@/components/@common/Review/Rating";

interface IRatingFormProps {
  score: number;
  setScore: (rate: number) => void;
}

const RatingForm = ({ score, setScore }: IRatingFormProps) => {
  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRate = parseFloat(event.target.value);
    if (newRate >= 0 && newRate <= 5) {
      setScore(newRate);
    } else {
      // 범위를 벗어난 값이 입력될 경우, 최대/최소 값으로 조정
      setScore(newRate < 0 ? 0 : 5);
    }
  };

  return (
    <div className="ml-16 w-[900px] text-BLACK">
      <h3 className="font-semibold pt-5 pb-1">
        점수&nbsp;
        <span className="text-[#a7a7a7] font-light text-sm">(5점 만점)</span>
      </h3>
      <div className="flex items-center space-x-3 p-1">
        <div className="py-1 border border-gray-300 rounded-md focus:outline-none">
          <input
            type="number"
            min="0"
            max="5"
            step="0.5"
            value={score}
            onChange={handleRatingChange}
            className="form-input text-center border-none focus:outline-none px-1 w-16"
          />
        </div>
        <Rating rating={score} size={25} gap={"gap-1"} />
      </div>
    </div>
  );
};

export default RatingForm;
