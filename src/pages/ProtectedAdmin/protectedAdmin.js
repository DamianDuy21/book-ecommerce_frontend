import { Button, Result } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"
import AuthenModal from "../../components/AuthenModal/authenModal"

const ProtectedAdmin = () => {
    const isAuthen = useSelector(state => state.authen.isAuthenticated)
    const role = useSelector(state => state.authen.user.role)
    const nav = useNavigate()
    // useEffect(() => {
    //     if (isAuthen && role == "ADMIN") {
    //     }
    //     else {
    //         nav("/")
    //     }
    // }, [])
    return (<>

        {isAuthen && role == "ADMIN" ? (<>
            <Outlet />
        </>) : (<>
            <Result
                status="403"
                title="403"
                subTitle="Bạn không có quyền truy nhập!"
            />
        </>)}
    </>)
}
export default ProtectedAdmin