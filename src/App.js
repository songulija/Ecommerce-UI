
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen'
import {Container} from 'react-bootstrap'

function App() {
  return (
    <>
      {/* <h1>hheheh</h1> */}
      <Header />
      <Router>
        <Routes>
          <Route path='/login' element={<LoginScreen/>}/>
          <Route path='/' element={<HomeScreen/>} exact/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
