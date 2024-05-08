// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { myCampingDummyList } from "@/components/my/consumer/MyFavoriteDummy";

// interface FavoriteCampsState {
//   likedCamps: { [key: number]: boolean };
// }

// const initialState: FavoriteCampsState = {
//   // @TODO : 추후 백엔드로부터 좋아요 정보 리스트를 받아온 후 연결 로직 수정해야함
//   likedCamps: myCampingDummyList.reduce((acc, camp) => {
//     acc[camp.id] = true; // 모든 캠핑장을 초기에 좋아요 상태로 설정
//     return acc;
//   }, {} as { [key: number]: boolean }),
// };

// const favoriteCampsSlice = createSlice({
//   name: "favoriteCamps",
//   initialState,
//   reducers: {
//     toggleLike: (state, action: PayloadAction<number>) => {
//       const campId = action.payload;
//       // console.log(`하트 누름: ${campId}`);
//       state.likedCamps[campId] = !state.likedCamps[campId];
//       // console.log(`새 상태 확인:`, state.likedCamps);
//     },
//   },
// });

// export const { toggleLike } = favoriteCampsSlice.actions;
// export const favoriteCampsReducer = favoriteCampsSlice.reducer;
