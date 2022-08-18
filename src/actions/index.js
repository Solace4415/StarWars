import * as api from "../apis/index";

export const fetchfilms = (setError) => async (dispatch) => {
  try {
    const { data } = await api.fetchFilms();
    dispatch({
      type: "FILM",
      payload: data?.results,
    });
  } catch (error) {
    setError(error.message);
  }
};
