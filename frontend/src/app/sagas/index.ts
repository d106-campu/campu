import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([
    // 여기에 추가적으로 다른 사가들을 등록
  ]);
}
