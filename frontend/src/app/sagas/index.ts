import { all } from "redux-saga/effects";
import { watchToggleLikes } from "./campsiteLikesSaga";

function* rootSaga() {
  yield all([
    watchToggleLikes(),
    // 여기에 다른 사가들을 등록
  ]);
}

export default rootSaga;
