import {
  FETCH_LOCATION_REQUEST,
  FETCH_LOCATION_SUCCESS,
  FETCH_LOCATION_FAILURE,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_SINGUP_SUCCESS,
  USER_SINGUP_FAILURE,
  SEARCH_TEXT,
  USER_LOGOUT,
} from "../_constants/location.constats";
import { locationService } from "../_services/location.services";

export const getLocation = () => (dispatch) => {
  dispatch(request());
  locationService
  .getLocations()
    .then((response) => {
      dispatch(success(response));
    },
    (error) => {
      const errMsg = error.message;
      dispatch(failure(errMsg));
    });

  function request() {
    return { type: FETCH_LOCATION_REQUEST };
  }
  function success(user) {
    return { type: FETCH_LOCATION_SUCCESS, payload: user };
  }
  function failure(error) {
    return { type: FETCH_LOCATION_FAILURE, payload: error };
  }
};

export const locationActions = {
  getLocation,
};
