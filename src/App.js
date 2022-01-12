
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen'
import {Container} from 'react-bootstrap'
import AdminBrandsScreen from './screens/admin/AdminBrandsScreen';
import AdminCategoriesScreen from './screens/admin/AdminCategoriesScreen';
import AdminProductScreen from './screens/admin/AdminProductScreen';

function App() {
  return (
    <>
      {/* <h1>hheheh</h1> */}
      <Header />
      <Router>
        <Routes>
          <Route path='/login' element={<LoginScreen/>}/>
          <Route path='/admin/brands' element={<AdminBrandsScreen/>}/>
          <Route path='/admin/categories' element={<AdminCategoriesScreen/>}/>
          <Route path='/admin/products' element={<AdminProductScreen/>}/>
          <Route path='/' element={<HomeScreen/>} exact/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
