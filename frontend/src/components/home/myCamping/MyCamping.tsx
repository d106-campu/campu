import MyCampingItem from "@/components/home/myCamping/MyCampingItem";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useMy } from "@/hooks/my/useMy";

const MyCamping = () => {
  const navigate = useNavigate();
  const { useFavoriteCampsList } = useMy();
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  const { data: myCampsiteList } = useFavoriteCampsList({
    pageable: { page: 0, size: 4 },
  });

  console.log(myCampsiteList?.campsiteList);

  const goToMy = () => {
    navigate("/my");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  if (!isLogin) {
    return (
      <div className="h-auto pt-8 pb-4 w-[70%]">
        <p className="font-extrabold text-xl pt-6">내가 찜한 캠핑장</p>
        <div className="pt-4">
          <div className="border rounded-md h-40 flex flex-col items-center justify-center">
            <p className="pb-4">로그인이 필요한 서비스 입니다 😊</p>
            <p
              className="text-white text-sm px-4 py-2 rounded-full bg-MAIN_GREEN cursor-pointer"
              onClick={goToLogin}
            >
              로그인하기
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-auto pt-8 pb-4 w-[70%]">
        <div className="flex items-baseline justify-between">
          <p className="font-extrabold text-xl pt-6">내가 찜한 캠핑장</p>
          {myCampsiteList && (
            <p
              className="text-sm text-gray-500 px-4 cursor-pointer"
              onClick={goToMy}
            >
              더보기
            </p>
          )}
        </div>
        {myCampsiteList?.campsiteList ? (
          <div className="flex justify-center">
            <div className="flex flex-wrap w-full">
              {myCampsiteList?.campsiteList.content.map((camping) => (
                <MyCampingItem key={camping.campsiteId} camping={camping} />
              ))}
            </div>
          </div>
        ) : (
          <div className="pt-4">
            <div className="border rounded-md h-40 flex items-center justify-center">
              <p className="text-MAIN_GREEN">아직 찜한 캠핑장이 없습니다 💖</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyCamping;
