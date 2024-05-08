import { all } from "redux-saga/effects";

function* rootSaga() {
  yield all([
    // 여기에 다른 사가를 등록합니다.
  ]);
}

export default rootSaga;