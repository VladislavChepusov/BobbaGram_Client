import { Cookies } from "react-cookie";

export interface IAuthTokenInfo {
  exp: number;
  nbf: number;
  login: string;
  sessionId: string;
  name: string;
}

const LIFE_TIME_TO_UPDATE_MULTIPLIER = 0.5;
export const getUnixTime = () => Math.round(+new Date() / 1000);

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) {
    return true;
  }

  try {
    const tokenInfo = token.split(".")[1];
    const tokenInfoDecoded = window.atob(tokenInfo);

    const { exp, nbf }: IAuthTokenInfo = JSON.parse(tokenInfoDecoded);
    const tokenLeftTime = exp - getUnixTime();
    const minLifeTimeForUpdate = (exp - nbf) * LIFE_TIME_TO_UPDATE_MULTIPLIER;

    return tokenLeftTime < minLifeTimeForUpdate;
  } catch (e) {
    console.error(e);
    return true;
  }
};

export const UserNameInToken = (): string => {
  var cookies = new Cookies();
  //var token:string = cookies.get("accessToken");
  var token = cookies.get("accessToken").replace("Bearer", "");
  if (!token) {
    return "error UserNameInToken !!";
  }
  try {
    const tokenInfo = token.split(".")[1];
    var tokenInfoDecoded = window.atob(tokenInfo);
    tokenInfoDecoded = tokenInfoDecoded.replace(
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/",
      ""
    );
    const { name }: IAuthTokenInfo = JSON.parse(tokenInfoDecoded);
    return name;
  } catch (e) {
    console.error(e);
    return "error UserNameInToken = " + e;
  }
};
