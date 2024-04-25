import MainImage from "@/assets/images/MainImage.jpg";
import SearchBar from "./SearchBar";

const HomeContainer = () => {
  return (
    <div className="relative flex justify-center">
      <img src={MainImage} />
      <SearchBar />
    </div>
  );
};
export default HomeContainer;
