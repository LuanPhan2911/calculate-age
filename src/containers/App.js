

import HomeHeader from '../components/Home/HomeHeader';
import HomeContent from '../routes/HomeContent';
import '../assets/theme/dark.scss';
import '../assets/theme/light.scss';
import './App.scss';
import Auth from '../routes/Auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <HomeHeader />
      <HomeContent />
      <Auth />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    </div>
  );
}

export default App;
