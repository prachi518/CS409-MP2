import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import './App.css';

// Import the three main views
import ListView from './views/ListView';
import GalleryView from './views/GalleryView';
import DetailView from './views/DetailView';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/CS409-MP2">
      <header className="App-header">
        <h1><Link to="/">NightScreen</Link></h1>
        <nav>
          <Link to="/">List</Link> | <Link to="/gallery">Gallery</Link>
        </nav>
      </header>

      <main>
          <Routes>
            <Route path="/" element={<ListView />} />
            <Route path="/gallery" element={<GalleryView />} />
            <Route path="/movie/:id" element={<DetailView />} />
          </Routes>
      </main>
      </BrowserRouter>
    </div>
  );
}

export default App;