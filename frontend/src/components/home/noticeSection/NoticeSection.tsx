import notice01 from "@/assets/images/home/notice01.png";
import notice02 from "@/assets/images/home/notice02.png";
import notice03 from "@/assets/images/home/notice03.png";
import notice04 from "@/assets/images/home/notice04.png";

const NoticeSection = () => {
  return (
    <>
      <div className="text-center flex flex-col items-start py-10 w-[70%]">
        <div className="font-semibold text-md pb-2">안전 수칙</div>
        <div className="w-full flex items-center justify-around">
          <div className="flex flex-col">
            <img src={notice01} />
            <img src={notice02} />
          </div>
          <div className="flex flex-col">
            <img src={notice03} />
            <img src={notice04} />
          </div>
        </div>
      </div>
    </>
  );
};

export default NoticeSection;
