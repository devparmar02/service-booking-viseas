import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'; 
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/contact';
import Service from './pages/Service';
import Countries from './pages/countries';
import Register from './pages/register';
import Login from './pages/Login';
import ForgetPass from './pages/ForgetPass';
import AddServices from './pages/AddServices';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Service />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgetpass" element={<ForgetPass/>}/>
        <Route path="/addservices" element={<AddServices/>}/>

      </Routes>
     {/* <Footer /> */}
    </Router>
  );
}

export default App;
