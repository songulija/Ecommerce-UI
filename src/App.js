
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen'
import { Container } from 'react-bootstrap'
import AdminBrandsScreen from './screens/admin/AdminBrandsScreen';
import AdminCategoriesScreen from './screens/admin/AdminCategoriesScreen';
import AdminProductScreen from './screens/admin/AdminProductScreen';
import AdminUsersScreen from './screens/admin/AdminUsersScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

function App() {
  return (
    <>
      {/* <h1>hheheh</h1> */}

      <Header />
      <Router>
        <Routes>
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/admin/brands' element={<AdminBrandsScreen />} />
            <Route path='/admin/categories' element={<AdminCategoriesScreen />} />
            <Route path='/admin/products' element={<AdminProductScreen />} />
            <Route path='/admin/users' element={<AdminUsersScreen />} />
            <Route path='/products/:id' element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path='/' element={<HomeScreen />} exact />
        </Routes>
      </Router>
    </>
  );
}

export default App;
