import { useSelector } from "react-redux";
import Login from "../containers/auth/login";

const UserIsAuth = (props) => {
    let isAuth = useSelector(state => state.user.isAuth);
    const handleUserIsAuth = () => {
        if (!isAuth) {
            return <Login />
        } else {
            return props.children;
        }

    }
    return (
        <>
            {handleUserIsAuth()}
        </>
    )
}
export default UserIsAuth;