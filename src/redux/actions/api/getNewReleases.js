import api from "../../../api";

const getNewReleases = (token, country, limit) => async (dispatch) => {
  try {
    const res = await api.get("/browse/new-releases", {
      headers: {
        Authorization: `Bearer ${
          token || window.localStorage.getItem("token")
        }`,
      },
      params: {
        country: country || "EG",
        limit: limit || 5,
      },
    });
    const ids = [...new Set(res.data.albums.items.map((item) => item.id))];
    ids.map(async (id) => {
      const res = await api.get(`/albums/${id}`, {
        headers: {
          Authorization: `Bearer ${
            token || window.localStorage.getItem("token")
          }`,
        },
      });
      dispatch({
        type: "GET_NEW_RELEASES",
        payload: res.data,
      });
    });
  } catch (error) {
    dispatch({
      type: "GET_NEW_RELEASES",
      payload: [],
    });
  }
};

export default getNewReleases;
