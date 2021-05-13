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

const initialState = {
  loading: false,
  response: {},
  amenities: {},
  error: "",
  users: [],
  userLogin: {},
  userLoginErrorMsg: "",
  userLoginError: false,
  isLoggin: false,
  userSingUpError: false,
  userSignUpErrorMsg: "",
  searchText: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOCATION_REQUEST:
      return {};

    case FETCH_LOCATION_SUCCESS:
      return {
        ...state,
        response: action.payload,
        error: "",
      };

    case FETCH_LOCATION_FAILURE:
      return {
        ...state,
        response: [],
        error: action.payload,
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggin: true,
        userLoginError: false,
        userLogin: action.payload,
        userLoginErrorMsg: "",
      };

    case USER_LOGIN_FAILURE:
      return {
        ...state,
        userLoginErrorMsg: action.payload,
        userLoginError: true,
        isLoggin: false,
      };

    case USER_SINGUP_SUCCESS:
      return {
        ...state,
        userSingUpError: false,
      };

    case USER_SINGUP_FAILURE:
      return {
        ...state,
        userSingUpError: true,
        userSignUpErrorMsg: action.payload,
      };

    case SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload,
      };

    case USER_LOGOUT:
      return {
        ...state,
        isLoggin: false,
      };

    default:
      return state;
  }
};

export default reducer;
