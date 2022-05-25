import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/HomePage';
import NewShoe from './components/AddShoe';
import UpdateShoe from './components/UpdateShoe';
import OneShoe from './components/OneShoe';
import ProfilePage from './components/ProfilePage';
import EditUser from './components/EditUser';
import Main from './views/LogReg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from './components/Cart';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/home/:userName" element={<Home/>}/>
            <Route path="/user/:userName" element={<ProfilePage/>}/>
            <Route path="/user/edit/:user" element={<EditUser/>}/>
            <Route path="/shoes/new/:userName" element={<NewShoe/>}/>
            <Route path="/shoes/edit/:userName/:id" element={<UpdateShoe/>}/>
            <Route path="/shoes/:userName/:id" element={<OneShoe/>}/>
            <Route path="/cart" element={<Cart/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
