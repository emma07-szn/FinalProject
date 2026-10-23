import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';
import Mpesa from './components/Mpesa';
import Navbar from './components/Navbar';
import Signin from './components/Signin';
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Footer from './components/Footer';
import { CartProvider } from './components/CartContext';
import CartPage from './components/CartPage';
import Account from './components/Account';
import Buynowmpesa from './components/Buynowmpesa';



function App() {
  const user=JSON.parse(localStorage.getItem("user"))
  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar />



        {/* routes */}
        <CartProvider>
          <Routes>
            <Route path='/' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/getproduct' element={<Getproducts />} />
            <Route path='/mpesa' element={<Mpesa />} />
            <Route path='/cartpage' element={<CartProvider />} />
            <Route path='/cart' element={<CartPage/>}/>
            <Route path='/addproduct' element={<Addproducts />} />
            <Route path='/account' element={<Account/>}/>
            <Route path='/buynowmpesa' element={<Buynowmpesa/>} />


          </Routes>
        </CartProvider>

        {user&&<Footer />}

      </div>
    </BrowserRouter>

  );
}

export default App;
