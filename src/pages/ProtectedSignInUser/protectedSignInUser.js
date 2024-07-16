import { Button, Result } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import AuthenModal from "../../components/AuthenModal/authenModal";
import { authenToken } from "../../services/userServices";
import { doSignOutAction } from "../../redux/AuthenReducer/authenReducer";
import { getCookie } from "../../helpers/cookies";

const ProtectedSignInUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState(1);
  const isAuthen = useSelector((state) => state.authen.isAuthenticated);
  const nav = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAuthen = async () => {
      // console.log(localStorage.getItem("accessToken"));
      console.log(getCookie("accessToken"));
      if (getCookie("accessToken")) {
        const response = await authenToken();
        console.log(response);
        if (response.ec && response.ec != 200) {
          setIsModalOpen(true);
          localStorage.clear();
          dispatch(doSignOutAction());
        }
      }
    };
    fetchAuthen();

    if (isAuthen) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  }, []);
  return (
    <>
      <AuthenModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalStatus={modalStatus}
        setModalStatus={setModalStatus}
      />
      {isAuthen ? (
        <>
          <Outlet />
        </>
      ) : (
        <>
          <Result
            status="403"
            title="403"
            subTitle="Bạn cần đăng nhập để có thể truy cập vào trang này!"
            extra={
              <>
                <Button
                  type=""
                  onClick={() => {
                    nav("/");
                  }}
                >
                  Trang chủ
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                >
                  Đăng nhập
                </Button>
              </>
            }
          />
        </>
      )}
    </>
  );
};
export default ProtectedSignInUser;
