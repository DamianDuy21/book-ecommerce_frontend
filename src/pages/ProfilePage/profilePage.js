
import { useEffect } from "react";
import ProfileComp from "../../components/ProfileComp/profileComp";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const ProfilePage = () => {
    const params = useParams()
    const nav = useNavigate()
    // console.log(params.id)
    const user = useSelector(state => state.authen.user);
    // console.log(user)

    useEffect(() => {
        window.scrollTo(0, 0);
        nav(`/profile/${user.id}`)
    }, [])
    return (<>
        <div className="container">
            {params.id == user.id ? (<ProfileComp />) : (<></>)}
        </div>
    </>)
}
export default ProfilePage