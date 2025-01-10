import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center flex-col sm:flex-row">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <p className="text-2xl font-bold uppercase tracking-widest text-gray-100">RLR</p>
        </div>
        <div className="flex space-x-6">
          <Link to='/'><p className="nav-item">First page</p></Link>
          <Link to='/component'><p className="nav-item">Component</p></Link>
          <Link to='/store'><p className="nav-item">Store</p></Link>
          <Link to='/details'><p className="nav-item">Custom Details</p></Link>
          <Link to='/problem'><p className="nav-item">Problems</p></Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
