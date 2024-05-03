import { useState } from 'react';
import { IMyReview } from '@/types/review';
import { FaArrowRightToBracket } from "react-icons/fa6";
import Rating from "@/components/@common/Review/Rating";

interface MyReviewProps {
  reviews: IMyReview[];
  totalMyReview: number;
}

const MyReview = ({
  reviews,
  totalMyReview
}: MyReviewProps): JSX.Element => {
  const [selectedFilter, setSelectedFilter] = useState('전체'); // 날짜 선택 상태 관리
  const [isReviews, setIsReviews] = useState<IMyReview[]>(reviews.slice(0, 2));
  const [viewCount, setViewCount] = useState<number>(2); // 처음 보여줄 리뷰 개수 관리
  const filters = ['오늘', '일주일', '한달', '1년', '전체']; // 날짜 관련 필터 목록

  // 날짜 선택에 따른 필터 체인지
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    // @TODO : 여기서 필터에 따른 데이터 로드 로직을 추가 예정
  };

  // 과거 리뷰 더보기
  const showMoreReviews = () => {
    setViewCount(prev => Math.min(prev + 2, reviews.length));
    setIsReviews(reviews.slice(0, viewCount + 2));
  };

  return (
    <div>
      {/* 헤더 */}
      <div className='flex'>
        <h1 className='text-lg font-bold pb-5'>내가 쓴 리뷰</h1>
        <h1 className='text-lg text-MAIN_GREEN pl-2 flex'>{totalMyReview}</h1>
      </div>

      {/* 날짜 선택 */}
      <div className="flex space-x-2 pb-5">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => handleFilterChange(filter)}
            className={`w-[7.5%] px-4 py-2 text-sm font-medium rounded-md shadow-lg ${filter === selectedFilter ? 'bg-MAIN_GREEN text-white' : 'bg-gray-100 text-black'}`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* 리뷰 리스트 -> 첫 렌더링 3개 -> 이후 더보기 */}
      <div className='max-h-[500px] overflow-y-auto relative'>
        {isReviews.map((review, index) => (
        <div className=' mx-auto shadow-lg rounded-xl p-1 pb-3 mb-5 outline-none'>
          <div key={index} className='flex justify-around'>
            {/* 좌측 리뷰 내용 */}
            <div className='w-[50%] flex flex-col justify-center items-start pl-3'>
              <div className='flex'>
                <h1 className='text-lg'>{review.campsiteName}</h1>
                <button className='pl-2'><FaArrowRightToBracket /></button>
              </div>
              <div className='flex pb-2'>
                <Rating rating={review.rating} size={25} gap="gap-[0.7px]" />
                <p className='pl-2 text-GRAY my-auto'>{review.date}</p>
              </div>
              <p className='text-sm line-clamp-3'>{review.content}</p>
              <div className='flex justify-center p-1 mt-2 w-[50%] rounded-2xl bg-gray-100'>
                <p className='text-gray-700'>{review.area}</p>
              </div>
            </div>
            {/* 우측 사진 */}
            <div className='w-[50%] pr-3'>
              <div className='flex flex-col items-end justify-center'>             
              <button className='flex justify-end'>
                <p className='text-xs pr-1'>삭 제</p>
              </button>
                {review.images.map((image, idx) => (
                  <img
                    key={idx}
                    src={image}
                    alt="Review"
                    className='w-[300px] h-[150px] rounded-lg object-cover object-center'/>
                ))}
              </div>
            </div>
          </div>
        </div>
        ))}
      <div className='flex justify-center pt-5'>
        {viewCount < totalMyReview && (
          <button onClick={showMoreReviews}>더보기</button>
        )}
      </div>
      </div>
    </div>
  );
}

export default MyReview;