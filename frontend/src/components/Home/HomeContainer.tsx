import MainImage from "@/assets/images/MainImage.jpg";
import SearchBar from "./SearchBar";
import MyWish from "./MyWish";

const HomeContainer = () => {
  return (
    <>
      <div className="relative flex flex-col items-center">
        <img src={MainImage} />
        <SearchBar />
        <MyWish />
      </div>
    </>
  );
};
export default HomeContainer;
