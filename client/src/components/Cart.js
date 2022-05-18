import React, {useState} from "react";
import { useCart } from "react-use-cart";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const Cart = () => {
    const { 
        isEmpty,
        totalUniqueItems,
        items,
        totalItems,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart
    } = useCart();

    return(
        <div>
            <p>Cart: ({totalUniqueItems}) Total Items: ({totalItems})</p>
        </div>
    )
}

export default Cart;