import MainImage from "@/assets/images/MainImage.jpg";
import SearchBar from "./SearchBar";
import MyCamping from "./MyCamping";
import Recommend from "./Recommend";

const HomeContainer = () => {
  return (
    <>
      <div className="relative flex flex-col items-center">
        <img src={MainImage} />
        <SearchBar />
        <MyCamping />
        <Recommend />
      </div>
    </>
  );
};
export default HomeContainer;
