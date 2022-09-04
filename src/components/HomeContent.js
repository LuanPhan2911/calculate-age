import { Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import About from '../components/About';
import Countdown from './Coundown';
import './HomeContent.scss';

const HomeContent = () => {
    return (
        <div className=' home-content-container'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/countdown" element={<Countdown />} />
                <Route path="about" element={<About />} />
            </Routes>
        </div>

    );
}
export default HomeContent