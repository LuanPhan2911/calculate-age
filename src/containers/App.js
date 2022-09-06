

import HomeHeader from '../components/HomeHeader';
import HomeContent from '../routes/HomeContent';
import '../assets/theme/dark.scss';
import '../assets/theme/light.scss';
import './App.scss';
import Auth from '../routes/Auth';
function App() {
  return (
    <div className="App">
      <HomeHeader />
      <HomeContent />
      <Auth />
    </div>
  );
}

export default App;
