import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home/index';
import Header from 'components/Header/index';
import Frame from 'pages/Frame/index';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Frame" element={<Frame />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
