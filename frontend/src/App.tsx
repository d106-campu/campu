import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
import { Provider } from "react-redux";
import { store } from "./app/store";
import { useEffect } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";

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
    path: "/camps/:campId/reviews/write",
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

const queryClient = new QueryClient();

function App() {
  // const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      // eventSource 객체 생성
      const eventSource = new EventSourcePolyfill(
        import.meta.env.VITE_SSE_URL,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
          heartbeatTimeout: 100000000,
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

        console.log(data);
      });

      return () => {
        eventSource.close();
      };
    }
  }, [accessToken]);

  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ToastContainer position="top-center" />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
