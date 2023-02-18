import axios from "axios";
import { GET_PROFILE, CLEAR_CURRENT_PROFILE, PROFILE_LOADING } from "./types";
// Get current profile
export const getCurrenhtProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: {},
      })
    );
};
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};
// lear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};
