import { call, put, takeLeading } from "redux-saga/effects";
import {
  addLike,
  removeLike,
  setLoading,
} from "@/features/like/campsiteLikeSlice";
import { APIResponse } from "@/types/model";
import { postLikes } from "@/services/reservation/api";
import { ILikeRes } from "@/types/reservation";

// Saga에서 사용하는 액션에 대한 타입 정의
interface ILikeAction {
  type: string;
  payload: number; // campsiteId
}

function* handleToggleLike(action: ILikeAction) {
  try {
    yield put(setLoading(true)); // 로딩 시작
    const response: APIResponse<ILikeRes> = yield call(
      postLikes, // 실제 API 호출
      action.payload
    );
    if (response.result === "ok") {
      if (response.data.likeResponse.like) {
        yield put(addLike(action.payload)); // 좋아요 추가
      } else {
        yield put(removeLike(action.payload)); // 좋아요 제거
      }
    }
    yield put(setLoading(false)); // 로딩 종료
  } catch (error) {
    console.error("좋아요 토글 시 에러 발생: ", error);
    yield put(setLoading(false));
  }
}

export function* watchToggleLikes() {
  yield takeLeading("likes/addLike", handleToggleLike);
  yield takeLeading("likes/removeLike", handleToggleLike);
}
