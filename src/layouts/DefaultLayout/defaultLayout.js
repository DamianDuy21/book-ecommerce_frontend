import { Outlet, useLocation } from "react-router-dom";

import NoSiderLayout from "../NoSiderLayout/noSiderLayout";
import SiderLayout from "../SiderLayout/siderLayout";
import { useEffect } from "react";
import { doSignOutAction } from "../../redux/AuthenReducer/authenReducer";
import { useDispatch } from "react-redux";
import { deleteAllCookies, getCookie } from "../../helpers/cookies";
import { authenToken } from "../../services/userServices";

const DefaultLayout = () => {
  const path = useLocation();
  const dispatch = useDispatch();
  let pathname = path.pathname;
  let pos = pathname.lastIndexOf("/");
  if (pos != 0) {
    pathname = pathname.substring(0, pos);
  }

  useEffect(() => {
    const fetchAuthen = async () => {
      // console.log(getCookie("accessToken"));
      if (getCookie("accessToken")) {
        const response = await authenToken();
        console.log(response);
        if (response.ec && response.ec != 200) {
          deleteAllCookies();
          dispatch(doSignOutAction());
          localStorage.clear();
        }
      } else {
        dispatch(doSignOutAction());
        localStorage.clear();
      }
    };
    fetchAuthen();
  }, []);
  return (
    <>
      {pathname == "/cart-detail" ||
      pathname == "/product-detail" ||
      pathname == "/buy-now" ||
      pathname == "/profile" ||
      pathname == "/history" ||
      pathname == "/receipt-detail" ||
      pathname == "/manage" ? (
        <>
          <NoSiderLayout />
        </>
      ) : (
        <>
          <SiderLayout />
        </>
      )}
    </>
  );
};
export default DefaultLayout;
