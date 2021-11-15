import Cards from './components/Cards/Cards';
import Fav from './components/Favs/Fav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import FavState from './Context/FavState';
function App() {
  return (
    <FavState>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="favs" element={<Fav />} />
        </Routes>
      </BrowserRouter>
    </FavState>
  );
}

export default App;
