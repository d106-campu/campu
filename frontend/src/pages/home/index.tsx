import Footer from "@/components/@common/Footer/Footer";
import Header from "@/components/@common/Header/Header";
import HomeContainer from "@/components/home/HomeContainer";
import { clearCampingData } from "@/features/search/campingMapSlice";
import { clearSearchData } from "@/features/search/searchBarSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearCampingData());
      dispatch(clearSearchData());
    };
  }, [dispatch]);

  return (
    <div>
      <Header page={"main"} />
      <HomeContainer />
      <Footer />
    </div>
  );
};
export default HomePage;
