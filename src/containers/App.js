
import { Route, Routes } from 'react-router-dom';
import HomeHeader from '../components/HomeHeader';
import Home from '../components/Home';
import About from '../components/About';

function App() {
  return (
    <div className="App">
      <HomeHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
