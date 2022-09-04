

import HomeHeader from '../components/HomeHeader';
import HomeContent from '../components/HomeContent';
import '../assets/theme/dark.scss';
import '../assets/theme/light.scss';
import './App.scss';
function App() {
  return (
    <div className="App">
      <HomeHeader />
      <HomeContent />
    </div>
  );
}

export default App;
