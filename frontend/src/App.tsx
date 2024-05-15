import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import MyPage from "@/pages/mypage";
import OwnerPage from "@/pages/ownerpage";
import SearchPage from "@/pages/search";
import ReservationPage from "./pages/reservation";
import PhotosPage from "@/pages/reservation/photos";
import PaymentPage from "@/pages/payment";
import ReviewListPage from "@/pages/reservation/reviewList";
import ReviewPage from "@/pages/reservation/reviewList/review";
import WriteReviewPage from "./pages/reservation/reviewList/writeReview";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/components/@common/Toast/Toast.css";
import { useEffect } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import Toast from "./components/@common/Toast/Toast";
import { useDispatch, useSelector } from "react-redux";
import { addNewNotifyCnt } from "./features/notify/notifyCnt";
import { RootState } from "./app/store";
import OwnerAddPage from "./pages/owneraddpage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/my",
    element: <MyPage />,
  },
  {
    path: "/owner",
    element: <OwnerPage />,
  },
  {
    path: "/owner/add",
    element: <OwnerAddPage />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/camps/:campId",
    element: <ReservationPage />,
  },
  {
    path: "/camps/:campId/photos",
    element: <PhotosPage />,
  },
  {
    path: "/camps/:campId/reviews",
    element: <ReviewListPage />,
  },
  {
    path: "/camps/review-write",
    element: <WriteReviewPage />,
  },
  {
    path: "/camps/:campId/reviews/:reviewId",
    element: <ReviewPage />,
  },
  {
    path: "/camps/:campId/payment",
    element: <PaymentPage />,
  },
]);

function App() {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogin) {
      // eventSource 객체 생성
      const eventSource = new EventSourcePolyfill(
        import.meta.env.VITE_SSE_URL,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
          heartbeatTimeout: 86400000,
        }
      );

      // eventSource 연결
      eventSource.onopen = () => {
        console.log("eventSource 연결");
      };

      // eventSource 에러
      eventSource.onerror = async (event) => {
        console.log("eventSource 에러", event);
        eventSource.close();
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      eventSource.addEventListener("campu", async function (event: any) {
        const data = JSON.parse(event.data);
        if (data.data.notification === "success") {
          console.log("SSE 최초 연결 알림");
        } else {
          Toast.info("새로운 알림이 있습니다!");
          dispatch(addNewNotifyCnt());
        }
      });

      return () => {
        eventSource.close();
      };
    }
  }, [accessToken]);

  return (
    <>
      <ToastContainer position="top-center" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
