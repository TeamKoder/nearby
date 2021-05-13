import {
    FETCH_LOCATION_REQUEST,
    FETCH_LOCATION_SUCCESS,
    FETCH_LOCATION_FAILURE,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_SINGUP_SUCCESS,
    USER_SINGUP_FAILURE,
    SEARCH_TEXT,
    USER_LOGOUT
  } from '../_constants/location.constats'

  export const fetchLocationRequest = () => {
    return {
      type: FETCH_LOCATION_REQUEST,
    }
  }
  
  export const fetchLocationSuccess = (response) => {
    return {
      type: FETCH_LOCATION_SUCCESS,
      payload: response,
    }
  }
  
  export const fetchLocationFailure = (error) => {
    return {
      type: FETCH_LOCATION_FAILURE,
      payload: error,
    }
  }
  
  export const userLoginSuccess = (data) => {
    return {
      type: USER_LOGIN_SUCCESS,
      payload: data,
    }
  }
  
  export const userLoginFailure = (error) => {
    return {
      type: USER_LOGIN_FAILURE,
      payload: error,
    }
  }
    
  export const userSignUpSuccess = () => {
    return {
      type: USER_SINGUP_SUCCESS,
    }
  }
  
  export const userSignUpFailure = (error) => {
    return {
      type: USER_SINGUP_FAILURE,
      payload: error,
    }
  }
  
  export const searchText = (text) => {
    return {
      type: SEARCH_TEXT,
      payload: text,
    }
  }

  export const userLogout = () => {
    return {
      type: USER_LOGOUT,
    }
  }
  