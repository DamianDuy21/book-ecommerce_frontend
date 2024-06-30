import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import HistoryComp from "../../components/HistoryComp/historyComp";
import ManageComp from "../../components/ManageComp/manageComp";
const ManagePage = () => {

    const nav = useNavigate()
    const user = useSelector(state => state.authen.user);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [user])
    return (<>
        <div className="container">
            <ManageComp />
        </div>
    </>)
}

export default ManagePage