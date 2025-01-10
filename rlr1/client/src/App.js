import React from 'react';
import Main from './Main';
import Navbar from './Navbar';
import Components from './Components';
import Store from './Store';
import Ordered from './Ordered';
import Details from './Detail';
import Review from './Review'
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
          <Route path="/details" element={<Ordered />} />
          <Route path="/order/:orderId" element={<Details />} />
          <Route path="/problem" element={<Review />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
 
export default App;
