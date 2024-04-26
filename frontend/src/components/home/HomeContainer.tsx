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
        <SearchBar />
        <MyCamping />
        <Recommend />
        <GoOwner />
        <NoticeSection />
      </div>
    </>
  );
};
export default HomeContainer;
