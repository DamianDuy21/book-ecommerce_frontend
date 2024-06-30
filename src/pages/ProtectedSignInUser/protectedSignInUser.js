import { Button, Result } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"
import AuthenModal from "../../components/AuthenModal/authenModal"

const ProtectedSignInUser = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalStatus, setModalStatus] = useState(1)
    const isAuthen = useSelector(state => state.authen.isAuthenticated)
    const nav = useNavigate()
    useEffect(() => {
        if (isAuthen) {
            setIsModalOpen(false)
        }
        else {
            setIsModalOpen(true)
        }
    }, [])
    return (<>
        <AuthenModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} modalStatus={modalStatus} setModalStatus={setModalStatus} />
        {isAuthen ? (<>
            <Outlet />
        </>) : (<>
            <Result
                status="403"
                title="403"
                subTitle="Bạn cần đăng nhập để có thể truy cập vào trang này!"
                extra={<>
                    <Button type="" onClick={() => {
                        nav("/")
                    }}>Trang chủ</Button>
                    <Button type="primary" onClick={() => {
                        setIsModalOpen(true)
                    }}>Đăng nhập</Button>
                </>}
            />
        </>)}
    </>)
}
export default ProtectedSignInUser