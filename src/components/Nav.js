import './Nav.css';
import { NavLink } from 'react-router-dom';
const Nav = () => {
    return (
        <div className="topnav">
            <NavLink to={'/'}>
                Home
            </NavLink>
            <NavLink to={'/about'}>
                About
            </NavLink>
        </div>
    );
}
export default Nav;