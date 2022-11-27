import { Route, Routes } from 'react-router-dom';
import Home from '../components/Home/Home';
import About from '../components/About/About';
import Countdown from '../components/Countdown/Countdown';
import './HomeContent.scss';
import UserIsAuth from '../hoc/UserIsAuth';
import TrafficLight from '../components/TrafficLight/TrafficLight';
import TodoList from '../components/TodoList/TodoList';
import TodoListHistory from '../components/TodoList/TodoListHistory';
import Post from '../components/Posts/Post';
import PostDetail from '../components/Posts/PostDetail';
import PostForm from '../components/Posts/PostForm';
import Student from '../components/Student/Student';
import Calculator from '../components/Calculator/Calculator';
import Weather from '../components/Weather/Weather';

const HomeContent = () => {
    return (
        <div className=' home-content-container'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/countdown" element={<Countdown />} />
                <Route path="/todolist" element={
                    <UserIsAuth> <TodoList /></UserIsAuth>
                } />
                <Route path="/todolist/history" element={
                    <UserIsAuth> <TodoListHistory /></UserIsAuth>
                } />
                <Route path="/post" element={
                    <UserIsAuth> <Post /></UserIsAuth>
                } />
                <Route path="/post/store" element={
                    <UserIsAuth> <PostForm /></UserIsAuth>
                } />
                <Route path="/post/:post_id" element={
                    <UserIsAuth> <PostDetail /></UserIsAuth>
                } />
                <Route path="/student" element={
                    <UserIsAuth> <Student /></UserIsAuth>
                } />
                <Route path="about" element={<About />} />
                <Route path="calculator" element={<Calculator />} />
                <Route path="traffic-light" element={<TrafficLight />} />
                <Route path="weather" element={<Weather />} />
            </Routes>
        </div>

    );
}
export default HomeContent