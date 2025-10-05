// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Import the three main views
import ListView from './views/ListView';
import GalleryView from './views/GalleryView';
import DetailView from './views/DetailView';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1><Link to="/">Movies App</Link></h1>
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
    </div>
  );
}

export default App;
