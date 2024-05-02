import { FaStar, FaStarHalf } from "react-icons/fa6";

interface IRatingProps {
  rating: number;
  size: number;
  gap?: string;
}

const Rating = ({ rating, size, gap = "gap-2" }: IRatingProps) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className={`flex ${gap}`}>
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} size={size} className="text-yellow-500" />
      ))}
      {halfStar === 1 && (
        <div className="flex">
          <FaStarHalf size={size} className="absolute z-10 text-yellow-500" />
          <FaStar size={size} className="relative text-[#D9D9D9]" />
        </div>
      )}
      {[...Array(emptyStars)].map((_, index) => (
        <FaStar key={index} size={size} className="text-[#D9D9D9]" />
      ))}
    </div>
  );
};

export default Rating;
