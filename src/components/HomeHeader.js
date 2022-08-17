
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { menu, path } from '../utils';
import { useSelector, useDispatch } from 'react-redux';
import { changeLanguage } from '../features/app/ChangeLanguageSlice';
import { FormattedMessage } from 'react-intl';
const HomeHeader = () => {
    const dispatch = useDispatch();
    return (
        <Navbar bg="light" variant="light">
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