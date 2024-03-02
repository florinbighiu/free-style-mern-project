import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Characters from './pages/Characters';
import Planets from './pages/Planets';
import Favorites from './pages/Favorites';
import CharacterDetails from './components/CharacterDetails';
import FilmDetails from './pages/FilmDetails';
import FilmsPage from "./pages/FilmsPage"

function App() {
  const [searchQuery, setSearchQuery] = useState('');

    return (
      <Router>
        <Navbar setSearchQuery={setSearchQuery} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters searchQuery={searchQuery} />} />
          <Route path="/characters/:name" element={<CharacterDetails />} />
          <Route path="/planets" element={<Planets searchQuery={searchQuery} />} />
          <Route path="/favorites" element={<Favorites searchQuery={searchQuery} />} />
          <Route path="/film/:filmIndex" component={FilmDetails} />
          <Route path="/films" element={<FilmsPage />} />
        </Routes>
      </Router>
    );
}

export default App;
