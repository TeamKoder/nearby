import {
  userLoginSuccess,
  userLoginFailure,
  userSignUpSuccess,
  userSignUpFailure,
  searchText,
  userLogout,
} from "../_types/location.action.type";
import Cookies from "js-cookie";

function getLocations(user) {
  return fetch(
    `https://aosxqfz4ab.execute-api.us-east-2.amazonaws.com/dev/test/path?location=${user.location}&user=${user.name}&phone=${user.mobile}&email=${user.email}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  ).then(handleResponse);
}

const handleResponse = (response) => {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      if (response.status === 401) {
        // toast.error("Missing authentication");
        console.log(response);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
};

export const userLogin = (user, searchText) => (dispatch) => {
  let email = Cookies.get("userEmail");
  let password = Cookies.get("userPassword");
  console.log("userDetails ==>", user.email, user.password);
  if (email && password) {
    if (user.email === email && user.password === password) {
      Cookies.set("isLoggin", true);
      window.location.replace(
        `/dashboard?location=${searchText}&user=${Cookies.get(
          "userName"
        )}&phone=${Cookies.get("userPhoneNo")}&email=${Cookies.get(
          "userEmail"
        )}`
      );
      dispatch(userLoginSuccess(user));
    } else {
      dispatch(userLoginFailure("Incorrect Username or Password"));
      setTimeout(() => {
        dispatch(userLoginFailure(""));
      }, [3000]);
    }
  } else {
    dispatch(userLoginFailure("User does not exist."));
    setTimeout(() => {
      dispatch(userLoginFailure(""));
    }, [3000]);
  }
};

export const userSignup = (user) => (dispatch) => {
  let email = Cookies.get("userEmail");
  if (user.email === email) {
    dispatch(userSignUpFailure("User Already exist...!!!"));
    setTimeout(() => {
      dispatch(userSignUpFailure(""));
    }, [3000]);
  } else {
    Cookies.set("userEmail", user.email);
    Cookies.set("userPassword", user.password);
    Cookies.set("userName", user.username);
    Cookies.set("userPhoneNo", user.phone);
    dispatch(userSignUpSuccess());
  }
};

export const userSearchText = (text) => (dispatch) => {
  dispatch(searchText(text));
};

export const userLogouts = () => (dispatch) => {
  dispatch(userLogout());
  Cookies.remove("isLoggin");
  window.location.reload(true);
};

export const locationService = {
  getLocations,
};
