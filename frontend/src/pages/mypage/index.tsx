import { useState } from "react";
import Header from "@/components/@common/Header/Header";
import Footer from "@/components/@common/Footer/Footer";
import MySideBar from "@/components/my/MySideBar";
import ConsumerContainer from "@/components/my/ConsumerContainer";


const MyPage = (): JSX.Element => {
  const [selectedComponent, setSelectedComponent] = useState<string>('MyReservation'); // 컴포넌트 호출 관리

  const handleComponentChange = (componentName: string) => {
    setSelectedComponent(componentName);
  }

  return (
    <>
      <Header />
      <div className="w-screen h-[calc(100vh-3rem)] flex items-center justify-center">
        <div className="w-[75%] h-auto flex">
          <MySideBar
            onComponentChange={handleComponentChange}
            selectedComponent={selectedComponent}
          />
          {/* 구분선 */}
          <div className="w-[2%] border-r-[1px] mr-10" />
          <ConsumerContainer selectedComponent={selectedComponent}/>
        </div>
      </div>
      <Footer />
    </>
  )
};

export default MyPage;
