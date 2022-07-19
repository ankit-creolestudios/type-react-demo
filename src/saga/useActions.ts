import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { clearStore, getPostsApi } from "./actions";

const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators({ getPostsApi, clearStore }, dispatch);
};

export default useActions;
