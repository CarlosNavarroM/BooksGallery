import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Library from './assets/components/Library';
import BookDetails from './assets/components/BookDetails';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Libros de Programación</h1>
        </header>
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;