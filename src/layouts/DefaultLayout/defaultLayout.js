import { Outlet, useLocation } from "react-router-dom";

import NoSiderLayout from "../NoSiderLayout/noSiderLayout";
import SiderLayout from "../SiderLayout/siderLayout";

const DefaultLayout = () => {
  const path = useLocation();
  let pathname = path.pathname;
  let pos = pathname.lastIndexOf("/");
  if (pos != 0) {
    pathname = pathname.substring(0, pos);
  }
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
