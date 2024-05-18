import Footer from "@/components/@common/Footer/Footer";
import Header from "@/components/@common/Header/Header";
import HomeContainer from "@/components/home/HomeContainer";
import { clearCampingData } from "@/features/search/campingMapSlice";
import { clearSearchData } from "@/features/search/searchBarSlice";
import { resetDate } from "@/features/reservation/campingDateSlice";
import { resetHeadCount } from "@/features/reservation/HeadCountSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();

  // 메인페이지로 새로고침 시 스토어 데이터 초기화
  useEffect(() => {
    dispatch(clearCampingData());
    dispatch(clearSearchData());
    dispatch(resetDate());
    dispatch(resetHeadCount());
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
