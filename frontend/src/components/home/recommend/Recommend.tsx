import RecommendThema from "@/components/home/recommend/RecommendThema";
import RecommendType from "@/components/home/recommend/RecommendType";

const Recommend = () => {
  return (
    <>
      <div className="w-full">
        <RecommendType />
        <RecommendThema />
      </div>
    </>
  );
};

export default Recommend;
