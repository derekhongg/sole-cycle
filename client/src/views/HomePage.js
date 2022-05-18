import React from 'react';
import AllShoes from '../components/AllShoes';
import Cart from '../components/Cart';
import { CartProvider } from 'react-use-cart';

const Home = (props) => {

    return(
        <div className="home-page">
            <CartProvider>
                <div><AllShoes/>
                </div>
                <div><Cart/></div>
            </CartProvider>
        </div>
    )
}

export default Home;