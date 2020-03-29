import { GET_ERRORS } from "./types";
import axios from "axios";

export const createPost = (postData, history) => dispatch => {
  axios.post("/api/posts", postData).catch(err => {
    console.log(err);
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  });
};
