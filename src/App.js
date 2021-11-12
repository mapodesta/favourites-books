import Cards from './components/Cards/Cards';
import Fav from './components/Favs/Fav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="favs" element={<Fav />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
