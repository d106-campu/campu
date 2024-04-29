import RecommendThema from "@/components/home/RecommendThema";
import RecommendType from "@/components/home/RecommendType";

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
