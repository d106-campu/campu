import { useState, useEffect } from "react";
import Lottie from "react-lottie";
import {
  noImageOptions,
  writeOptions,
  loadingOptions,
  warningOptions,
} from "@/assets/lotties/lottieOptions";
import Rating from "@/components/@common/Review/Rating";
import { IMyReivewMyReservationRes } from "@/types/my";
import { useMy } from "@/hooks/my/useMy";
import Toast from "@/components/@common/Toast/Toast";
import { useNavigate } from "react-router-dom";
import { RiArrowRightSLine, RiDeleteBin5Fill } from "react-icons/ri";
import { formatSimpleReviewTime } from "@/utils/formatDateTime";

const MyReview = (): JSX.Element => {
  const navigate = useNavigate();
  const { useMyReviews, useDeleteReview } = useMy();
  const [selectedFilter, setSelectedFilter] = useState<
    "TOTAL" | "YEAR" | "MONTH6" | "MONTH"
  >("TOTAL"); // 날짜 선택 상태 관리
  const [reviews, setReviews] = useState<IMyReivewMyReservationRes[]>([]); // 리뷰 데이터 상태 관리
  const [viewCount, setViewCount] = useState<number>(2); // 처음 보여줄 리뷰 개수 관리
  // const filters = ['YEAR', 'MONTH6', 'MONTH', 'TOTAL']; // 날짜 관련 필터 목록

  // console.log("선택한 필터 확인 : ", selectedFilter)
  const { data, isLoading, isError, refetch } = useMyReviews({
    pageable: { page: 0, size: 100 },
    dateType: selectedFilter,
  });

  // 내가쓴리뷰 데이터 API 조회
  useEffect(() => {
    if (data?.reviewList?.content) {
      setReviews(data.reviewList.content);
    }
  }, [data]);

  const dateFilterLabels: {
    [key in "TOTAL" | "YEAR" | "MONTH6" | "MONTH"]: string;
  } = {
    TOTAL: "전체",
    YEAR: "1년",
    MONTH6: "6개월",
    MONTH: "한달",
  };

  // 날짜 선택에 따른 필터 체인지
  const handleFilterChange = (
    filter: "TOTAL" | "YEAR" | "MONTH6" | "MONTH"
  ) => {
    // console.log("선택한 필터 :", filter);
    setSelectedFilter(filter);
    refetch(); // 필터 변경할때마다 다시 리스트 불러오기
  };

  // 내가 쓴 리뷰 삭제
  const handleDeleteReview = (reviewId: number) => {
    useDeleteReview.mutate(reviewId, {
      onSuccess: () => {
        setReviews((prev) =>
          prev.filter((review) => review.review.reviewId !== reviewId)
        );
        Toast.success("리뷰를 삭제했습니다.");
      },
      onError: (error) => {
        console.error("삭제 실패 :", error);
        Toast.success("일시적 오류로 삭제를 실패했습니다.");
      },
    });
  };

  // 과거 리뷰 더보기 버튼
  const showMoreReviews = () => {
    setViewCount((prev) => Math.min(prev + 2, reviews.length));
  };

  // 이전으로 버튼
  const showLessReviews = () => {
    const newCount = Math.max(viewCount - 2, 2);
    setViewCount(newCount);
  };

  return (
    <div className="min-h-[calc(100vh-10rem)]">
      {/* 헤더 */}
      <div className="flex">
        <h1 className="text-lg font-bold pb-5">내가 쓴 리뷰</h1>
        <h1 className="text-lg text-MAIN_GREEN pl-2 flex">{reviews.length}</h1>
      </div>

      {/* 날짜 선택 */}
      <div className="flex space-x-2 pb-2">
        {(["YEAR", "MONTH6", "MONTH", "TOTAL"] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterChange(filter)}
            className={`w-[7.5%] px-4 py-2 text-sm font-medium rounded-md shadow-lg ${
              filter === selectedFilter
                ? "bg-MAIN_GREEN text-white"
                : "bg-gray-100 text-black"
            }`}
          >
            {dateFilterLabels[filter]}
          </button>
        ))}
      </div>

      {isLoading && (
        <>
          {/* 로딩중 처리 */}
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

      {isError && (
        <>
          {/* 데이터 에러 발생 시 처리 */}
          <div className="flex flex-col justify-center items-center h-[350px]">
            <div>
              <Lottie options={warningOptions} height={180} width={250} />
            </div>
            <div className="text-center text-sm text-GRAY">
              <h3 className="text-lg text-BLACK font-bold">
                다시 시도해주세요
              </h3>
              <p className="pt-2">내가 쓴 리뷰를 가져오지 못했습니다. 😭</p>
              <p className="">불편을 드려 죄송합니다.</p>
            </div>
          </div>
        </>
      )}

      {reviews.length > 0 ? (
        <>
          {/* 리뷰 리스트 -> 첫 렌더링 3개 -> 이후 더보기 */}
          <div className="max-h-[500px] w-full overflow-y-auto relative">
            {reviews.slice(0, viewCount).map((review, index) => (
              <div className="w-[90%] mx-auto shadow-lg rounded-xl p-1 pb-3 mb-5 outline-none text-BLACK">
                <div key={index} className="flex justify-around">
                  {/* 좌측 리뷰 내용 */}
                  <div className="w-[50%] flex flex-col justify-center items-start pl-3">
                    <div className="w-full flex justify-between">
                      <button
                        className="flex items-center gap-1 pl-2 text-lg font-bold"
                        onClick={() =>
                          navigate(
                            `/camps/${review.reservation.campsiteId}/reviews`
                          )
                        }
                      >
                        {review.reservation.campsiteName}
                        <RiArrowRightSLine />
                      </button>
                      {/* 작성일 */}
                      <p className="pl-2 text-sm text-GRAY my-auto">
                        {formatSimpleReviewTime(review.review.createTime)} 작성
                      </p>
                    </div>
                    {/* 별점 */}
                    <div className="flex gap-2 text-sm items-end p-2">
                      <Rating
                        rating={review.review.score}
                        size={20}
                        gap="gap-[0.7px]"
                      />
                      <p className="text-[#A0A0A0]">{review.review.score}점</p>
                    </div>
                    <div className="flex flex-col justify-between">
                      {/* 내용 */}
                      <p className="text-sm line-clamp-3 p-2">
                        {review.review.content}
                      </p>
                      <p className="text-MAIN_GREEN flex justify-center px-10 py-1 mt-2 rounded-2xl bg-SUB_GREEN_01">
                        {review.reservation.roomName}
                      </p>
                    </div>
                  </div>
                  {/* 우측 사진 */}
                  <div className="w-[50%] pr-4">
                    <div className="flex flex-col items-end justify-center">
                      <button
                        onClick={() =>
                          handleDeleteReview(review.review.reviewId)
                        }
                        className="flex justify-end mr-1 mb-1 rounded-full px-2 transition-transform duration-500 transform hover:scale-110"
                      >
                        <RiDeleteBin5Fill
                          size={25}
                          className="text-[#A0A0A0] hover:text-MAIN_PINK cursor-pointer pb-1"
                        />
                      </button>
                      {review.review.imageUrl ? (
                        <img
                          src={review.review.imageUrl}
                          alt="리뷰사진"
                          className="w-[300px] h-[150px] rounded-lg object-cover object-center shadow-md"
                        />
                      ) : (
                        <div className="w-[300px] h-[150px] flex flex-col justify-center border rounded-lg">
                          <Lottie
                            options={noImageOptions}
                            height={100}
                            width={180}
                            speed={0.5}
                          />
                          <p className="text-UNIMPORTANT_TEXT_02 text-center text-sm">
                            리뷰 사진을 등록하지 않았어요
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* 더보기, 줄이기 토글 버튼 */}
            <div className="flex justify-center pt-3">
              {viewCount < reviews.length && (
                <button onClick={showMoreReviews} className="mx-2 py-2">
                  더보기
                </button>
              )}
              {viewCount > 2 && (
                <button onClick={showLessReviews} className="mx-2 py-2">
                  줄이기
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* 내가 쓴 리뷰가 없을 때 처리 */}
          <div className="flex flex-col justify-center items-center h-[350px]">
            <div>
              <Lottie options={writeOptions} height={300} width={300} />
            </div>
            <div className="text-center text-sm text-GRAY">
              <h3 className="text-base text-BLACK">
                아직 작성한 <span className="text-MAIN_GREEN">캠핑장</span>
                리뷰가 없어요 😥
              </h3>
              <p className="pt-2">
                캠핑장을 이용하셨다면 리뷰를 작성해보세요 !
              </p>
              <p>캠핑장의 좋았던 점과 아쉬웠던 점을 공유해주세요</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyReview;
