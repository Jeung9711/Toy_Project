import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import Landing from './components/Landing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login-page' element={<Login />}></Route>
        <Route path='/registration-page' element={<Registration />}></Route>
        <Route path='/landing-page' element={<Landing />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
