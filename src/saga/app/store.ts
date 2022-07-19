import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import saga from "redux-saga";
import { all, fork } from "redux-saga/effects";
import { watchCommonSaga } from "../saga";
import rootReducer from "../slices";
const sagaMiddleWare = saga();
function* RootSaga() {
  yield all([fork(watchCommonSaga)]);
}
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ thunk: false }).prepend(sagaMiddleWare);
  },
});
sagaMiddleWare.run(RootSaga);
export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
