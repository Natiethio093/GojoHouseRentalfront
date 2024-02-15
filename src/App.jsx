import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Hero from './Components/Hero';
import Login from './Components/Login';
import Register from './Components/Register';
import Protected from './Components/Protected';
import SearchResult from './Components/SearchResult';
import Propertydetail from './Components/Propertydetail';
import Navbar from './Components/Navbar';
import Navbar2 from './Components/Navbar2';
import { DateProvider } from './Components/DateContext'
import Paymentpage from './Components/Paymentpage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top whenever the location changes
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path='/Navbar' element={<Navbar />} />
        <Route path='/' element={<Hero />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Searchresult' element={<Protected Cmp={SearchResult} />} />
        <Route path='/Paymentpage/:id' element={<Protected Cmp={Paymentpage} />} />
        <Route path='/Listing/:id' element={<Protected Cmp={Propertydetail} />} />
      </Routes>
    </Router>
  );
}

export default App;