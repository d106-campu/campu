import Footer from "@/components/@common/Footer/Footer";
import Header from "@/components/@common/Header/Header";
import SearchContainer from "@/components/search/SearchContainer";

const SearchPage = () => {
  return (
    <>
      <Header page={"search"} />
      <SearchContainer />
      <Footer />
    </>
  );
};

export default SearchPage;
