import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import HistoryComp from "../../components/HistoryComp/historyComp";
const HistoryPage = () => {
    const params = useParams()
    const nav = useNavigate()
    // console.log(params.id)
    const user = useSelector(state => state.authen.user);
    // console.log(user)

    useEffect(() => {
        window.scrollTo(0, 0);
        if (user.role != "ADMIN") {
            nav(`/history/${user.id}`)
        }

    }, [params.id, user])
    return (<>
        <div className="container">
            {params.id == user.id || user.role == "ADMIN" ? (<HistoryComp userId={params.id} />) : (<></>)}
        </div>
    </>)
}

export default HistoryPage