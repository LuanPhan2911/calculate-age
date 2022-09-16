import { Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import About from '../components/About';
import Countdown from '../components/Coundown';
import './HomeContent.scss';
import TodoList from '../components/TodoList';
import UserIsAuth from '../hoc/UserIsAuth';
import TrafficLight from '../components/TrafficLight';

const HomeContent = () => {
    return (
        <div className=' home-content-container'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/countdown" element={<Countdown />} />
                <Route path="/todolist" element={
                    <UserIsAuth> <TodoList /></UserIsAuth>
                } />
                <Route path="about" element={<About />} />
                <Route path="traffic-light" element={<TrafficLight />} />
            </Routes>
        </div>

    );
}
export default HomeContent