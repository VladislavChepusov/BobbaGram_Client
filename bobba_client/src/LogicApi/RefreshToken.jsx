import { Client, RefreshTokenRequestModel } from "./AuthModels";
import { Cookies } from "react-cookie";
import { isTokenExpired } from "./Tokens";

export const TokenMidelware = () => {
  var cookies = new Cookies();
  if (isTokenExpired(cookies.get("accessToken"))) {
    alert("токен не валиден");
    RefreshToken(localStorage.getItem("refreshToken"));
  } else {
    //alert("токен валиден")
  }
};

export const IsAuthTokens = () => {
  var cookies = new Cookies();
  if (
    isTokenExpired(cookies.get("accessToken")) &&
    localStorage.getItem("refreshToken") == null
  ) {
    return false;
  } else {
    return true;
  }
};

export const RefreshToken = (refreshtoken) => {
  var connect = new Client("https://localhost:7277");
  var data = new RefreshTokenRequestModel();
  data.refreshToken = localStorage.getItem("refreshToken");
  var response = connect.refreshToken(data);

  //cookies.set('name', name, { path: '/' });
  response.then((res) => {
    if (res) {
      let d = new Date();
      var cookies = new Cookies();
      d.setTime(d.getTime() + 60 * 1000); // время жизни

      //acces в куки\refresh  в localstorage
      cookies.set("accessToken", "Bearer " + res.accessToken, {
        path: "/",
        // expires: d
      });
      localStorage.setItem("refreshToken", res.refreshToken);
    }
  });
};
