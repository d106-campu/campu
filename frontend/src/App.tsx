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
import { Provider } from "react-redux";
import { store } from "./app/store";

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
    path: "/camps/:campId/reviews/:reviewId",
    element: <ReviewPage />,
  },
  {
    path: "/camps/:campId/payment",
    element: <PaymentPage />,
  },
]);

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
