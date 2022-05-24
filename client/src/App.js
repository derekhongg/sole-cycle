import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/HomePage';
import NewShoe from './components/AddShoe';
import UpdateShoe from './components/UpdateShoe';
import OneShoe from './components/OneShoe';
import ProfilePage from './components/ProfilePage';
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
            <Route path="/user/:userName" element={<ProfilePage/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/shoes/new" element={<NewShoe/>}/>
            <Route path="/shoes/edit/:id" element={<UpdateShoe/>}/>
            <Route path="/shoes/:id" element={<OneShoe/>}/>
            <Route path="/cart" element={<Cart/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
