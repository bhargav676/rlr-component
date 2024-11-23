import React from 'react';
import Main from './Main';
import Navbar from './Navbar';
import Components from './Components';
import Store from './Store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/component" element={<Components />} />
          <Route path="/store" element={<Store />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
