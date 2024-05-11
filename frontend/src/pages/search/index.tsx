import Header from "@/components/@common/Header/Header";
import SearchContainer from "@/components/search/SearchContainer";
import { clearMarker } from "@/features/search/markersSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const SearchPage = () => {
  const dispatch = useDispatch();

  // 검색 페이지에서 벗어났을 때 스토어 비우기
  useEffect(() => {
    return () => {
      dispatch(clearMarker());
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
