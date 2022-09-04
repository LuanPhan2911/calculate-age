
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { path } from '../utils';
import { useSelector, useDispatch } from 'react-redux';
import { changeLanguage, changeMode } from '../features/app/AppSlice';
import { FormattedMessage } from 'react-intl';
import { useEffect } from 'react';
const HomeHeader = () => {
    const mode = useSelector((state) => state.app.mode);
    const dispatch = useDispatch();
    useEffect(() => {
        if (mode === 'light') {
            document.getElementsByTagName('html')[0]
                .setAttribute("data-theme", "light");
        } else {
            document.getElementsByTagName('html')[0]
                .setAttribute("data-theme", "dark");
        }
    }, [mode]);
    const changeModeTheme = (theme) => {
        if (theme === 'light') {
            document.getElementsByTagName('html')[0]
                .setAttribute("data-theme", "light");
        } else {
            document.getElementsByTagName('html')[0]
                .setAttribute("data-theme", "dark");
        }

        dispatch(changeMode(theme));
    }
    return (
        <Navbar bg={
            mode === 'light' ? 'light' : 'dark'
        } variant={
            mode === 'light' ? 'light' : 'dark'
        }>
            <Container>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to={path.HOME}>{<FormattedMessage id='menu.home' />}</Nav.Link>
                    <Nav.Link as={Link} to={path.COUNTDOWN}>
                        {<FormattedMessage id='menu.countdown' />}
                    </Nav.Link>
                    <Nav.Link as={Link} to={path.ABOUT}>
                        {<FormattedMessage id='menu.about' />}
                    </Nav.Link>
                </Nav>
                <div className='d-flex'>
                    {
                        mode === 'light' ?
                            <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => changeModeTheme('dark')}
                            >Dark Mode</button>
                            :
                            <button
                                type="button"
                                className="btn btn-light"
                                onClick={() => changeModeTheme('light')}
                            >Light Mode</button>

                    }

                    <button
                        className='btn btn-success mx-2'
                        onClick={() => dispatch(changeLanguage('vi'))}>
                        VN
                    </button>
                    <button className='btn btn-primary'
                        onClick={() => dispatch(changeLanguage('en'))}>
                        EN
                    </button>
                </div>
            </Container>
        </Navbar>
    );
}
export default HomeHeader;