import { FaStar } from "react-icons/fa6";
import ReviewItem from "./ReviewItem";

// 더미데이터
const data = {
  checkIn: "14:00",
  checkOut: "11:00",
  mannerTime: "23:00 - 07:00",
  rating: 4.5,
  totalReview: 10,
};

const InfoDetail = () => {
  return (
    <>
      {/* 기본 정보 */}
      <div className="pt-10">
        <h3 className="text-xl font-bold">기본 정보</h3>
        <div className="px-2 pt-1 text-sm text-UNIMPORTANT_TEXT_01">
          <p>
            입실 · 퇴실 시간 : {data.checkIn} - {data.checkOut}
          </p>
          <p className="py-1">매너타임 : {data.mannerTime}</p>
        </div>
      </div>

      {/* 시설 및 레저 */}

      {/* 방문자 리뷰 */}
      <div className="pt-10">
        <h3 className="text-xl font-bold">방문자 리뷰</h3>
        <div className="flex justify-between pt-1">
          <div className="flex items-center text-BLACK font-bold">
            <FaStar size={18} className="text-yellow-500 mx-1" />
            <p className="pr-2">{data.rating}</p>
            <p className="text-[#919191] text-sm">
              {data.totalReview}명의 평가
            </p>
          </div>
          <p className="text-MAIN_GREEN font-bold">리뷰 보기</p>
        </div>
        <ReviewItem />
      </div>
    </>
  );
};
export default InfoDetail;
