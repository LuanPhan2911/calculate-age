import { Route, Routes } from 'react-router-dom';
import Login from '../containers/auth/login';
import Register from '../containers/auth/register';
const Auth = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );

}
export default Auth;