import MainImage from "@/assets/images/MainImage.jpg";
import SearchBar from "@/components/home/SearchBar";
import MyCamping from "@/components/home/MyCamping";
import Recommend from "@/components/home/Recommend";
import GoOwner from "@/components/home/GoOwner";
import NoticeSection from "@/components/home/NoticeSection";

const HomeContainer = () => {
  return (
    <>
      <div className="relative flex flex-col items-center">
        <img src={MainImage} />
        <div className="bg-white/50 h-auto w-[70%] absolute top-28 rounded-lg p-4">
          <p className="font-bold text-2xl text-center py-4">
            어디로 떠나볼까요?
          </p>
          <div className="px-12 py-6">
            <SearchBar />
          </div>
        </div>
        <MyCamping />
        <Recommend />
        <GoOwner />
        <NoticeSection />
      </div>
    </>
  );
};
export default HomeContainer;
