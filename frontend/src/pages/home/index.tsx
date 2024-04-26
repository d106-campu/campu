import Footer from "@/components/@common/Footer/Footer";
import Header from "@/components/@common/Header/Header";
import HomeContainer from "@/components/home/HomeContainer";

const HomePage = () => {
  return (
    <div>
      <Header page={"main"} />
      <HomeContainer />
      <Footer />
    </div>
  );
};
export default HomePage;
