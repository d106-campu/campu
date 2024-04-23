import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import MyPage from "./pages/mypage";
import OwnerPage from "./pages/ownerpage";
import SearchPage from "./pages/search";
import ReservationPage from "./pages/reservation";
import PaymentPage from "./pages/payment";

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
    path: "/reservation",
    element: <ReservationPage />,
  },
  {
    path: "/payment",
    element: <PaymentPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
