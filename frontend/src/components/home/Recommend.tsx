import RecommendThema from "./RecommendThema";
import RecommendType from "./RecommendType";

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
