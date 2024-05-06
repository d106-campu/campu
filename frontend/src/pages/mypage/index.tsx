import { useSelector } from 'react-redux';
import Header from "@/components/@common/Header/Header";
import Footer from "@/components/@common/Footer/Footer";
import MySideBar from "@/components/my/MySideBar";
import ConsumerContainer from "@/components/my/ConsumerContainer";
import { RootState } from '@/app/store';

const MyPage = (): JSX.Element => {
  const selectedComponent = useSelector((state: RootState) => state.selectedComp.value);

  return (
    <>
      <Header />
      <div className="w-screen flex items-center justify-center pt-10">
        <div className="w-[75%] flex">
          <MySideBar
            selectedComponent={selectedComponent}
          />
          {/* 구분선 */}
          <div className="flex-grow-0 flex-shrink-0 w-[2%] border-r-[1px] mr-10 mb-10" />
          <ConsumerContainer selectedComponent={selectedComponent}/>
        </div>
      </div>
      <div className="w-full mt-10">
        <Footer />
      </div>
    </>
  )
};

export default MyPage;
