import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import axios from 'axios';
import Footer from './components/Footer';
import SingleProduct from './pages/SingleProduct';
import CategoryProduct from './CategoryProduct';
import { useCart } from './context/CartContext';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {

  const [location, setLocation] = useState('');
  const [openDropDown, setOpenDropDown] = useState(false);
  const [isValidPromo, setIsValidPromo] = useState(false);
  const { cartItem, setCartItem } = useCart();

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async pos => {
      const { latitude, longitude } = pos.coords;
      console.log(latitude,longitude);

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

      try {
        const location = await axios.get(url);
        const exactLocation = location.data.address;
        setLocation(exactLocation);
        setOpenDropDown(false);
        // console.log(exactLocation);
      }
      catch (err) {
        console.log(err)
      }

    })
  }

  useEffect(() => {
    getLocation();
  }, []);



  // Load cart from local storage on initial render 

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItem(JSON.parse(storedCart))
    }
  }, []);

  //Save cart to local storage whenever it changes

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItem))
  }, [cartItem])

  return (
    <>
      <BrowserRouter>
        <Navbar location={location} getLocation={getLocation} openDropDown={openDropDown} setOpenDropDown={setOpenDropDown} />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/products' element={<Products />}></Route>
          <Route path='/products/:id' element={<SingleProduct />}></Route>
          <Route path='/category/:category' element={<CategoryProduct />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/cart' element={<ProtectedRoutes><Cart location={location} getLocation={getLocation} isValidPromo={isValidPromo} setIsValidPromo={setIsValidPromo} /></ProtectedRoutes>}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
