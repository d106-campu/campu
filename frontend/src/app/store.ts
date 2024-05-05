import { ownerSideReducer } from "@/features/owner/OwnerSideSlice";
import { ownerTabReducer } from "@/features/owner/OwnerTabSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "@/features/login/authSlice";
import { campingMapReducer } from "@/features/search/campingMapSlice";
import { selectedCompReducer } from "@/features/mypage/componentSlice";
import { reservationReducer } from "@/features/reservation/ReservationSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "ownerTab",
    "ownerSide",
    "auth",
    "campingMap",
    "selectedComp",
    "reservation",
  ],
};

const rootReducer = combineReducers({
  ownerTab: ownerTabReducer,
  ownerSide: ownerSideReducer,
  auth: authReducer,
  campingMap: campingMapReducer,
  selectedComp: selectedCompReducer,
  reservation: reservationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch; // 디스패치 함수의 타입을 설정하여 액션을 디스패치할 수 있도록 하기
export type RootState = ReturnType<typeof store.getState>; // 스토어의 전체 상태의 타입 설정
