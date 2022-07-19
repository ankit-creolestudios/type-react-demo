import axios, { AxiosResponse } from "axios";
import { put, takeLatest } from "redux-saga/effects";
import IPost from "../appInterface/IPost";

import * as actions from "./actions";
import * as slicesActions from "./slices";

function* getPostsApi(action: ReturnType<typeof actions.getPostsApi>) {
  try {
    const res: AxiosResponse<IPost[]> = yield axios.get(
      `https://jsonplaceholder.typicode.com/users/1/posts?_limit=10`
    );
    yield put(slicesActions.setPosts(res.data));
  } catch (err) {
    console.log(err);
  }
}
export function* watchCommonSaga() {
  //takeEvery allows multiple fetchData instances to be started concurrently
  //If we want to only get the response of the latest request fired
  yield takeLatest(actions.getPostsApi.type, getPostsApi);
}
