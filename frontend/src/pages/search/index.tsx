import Header from "@/components/@common/Header/Header";
import SearchContainer from "@/components/search/SearchContainer";
import { clearCampingData } from "@/features/search/campingMapSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const SearchPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearCampingData());
    };
  }, [dispatch]);

  return (
    <>
      <Header page={"search"} />
      <SearchContainer />
    </>
  );
};

export default SearchPage;
