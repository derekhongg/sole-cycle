import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import io from 'socket.io-client'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table"
import { InputGroup } from 'react-bootstrap';
import Cart from './Cart';
import { useCart } from 'react-use-cart'


const AllShoes = (props) => {
    const [ shoeList, setShoeList ] = useState([]);
    const { addItem } = useCart();
    const navigate = useNavigate();
    const [socket] = useState( () => io(':8000') );

    useEffect(() => {
        console.log("Inside useEffect for Socket.io");
        socket.on("Connect", () => {
            console.log(`Connected on the client - ID: ${socket.id}`);
        });
        socket.on("new_shoe_added", data => {
            console.log('new_shoe_added');
            console.log(data);
            setShoeList( (currentShoeArray) => {
                console.log("Inside setAllShoes: " + currentShoeArray);
                return [ data, ...currentShoeArray ];
            });
        });
        return () => socket.disconnect();
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8000/api/shoes",
        {withCredentials: true})
            .then((res) => {
                console.log("You got here")
                console.log(res.data);
                setShoeList(res.data);
            })
            .catch((err) => console.log(err.response, "Error Here"));
    }, []);
    
    const handleLogout = () => {
        // try{
        //     const response = await axios.post("http://localhost:8000/api/user/logout");
        //     setSuccessMessage(response.msg)
        // } catch (error) {
        //     console.log(error.response)
        // }
        axios.post("http://localhost:8000/api/user/logout", {}, {withCredentials:true})
            .then((res) => console.log(res), navigate("/"))
            .catch((err) => console.log(err, "Error"));
    };
    

    return(
        <div>
            <div className = "header">
                <h1 className="home-header">Welcome to SoleCycle!</h1>
                <Button classname="logoutBtn" size="sm" variant="danger" onClick={()=> handleLogout()}>Logout</Button>
            </div>
            <h5>Provide sneakers with a new home and reduce waste!</h5>
            <Button className="actionButton" size="sm" variant="danger" onClick={() => navigate(`/shoes/new`)}>
                List Sneaker
            </Button>
            {
                <Table striped border hover>
                    <thead>
                        {
                            <tr>
                                <th>Name </th>
                                <th>Size </th>
                                <th>Color </th>
                                <th>Price </th>
                                <th>Actions </th>
                            </tr>
                        }
                    </thead>
                    <tbody>
                        {
                            shoeList.map((item, index) => {
                                return(
                                <tr key={index}>
                                    <td><Link to={`/shoes/${item.id}`}>
                                        {item.name}
                                    </Link>
                                    </td>
                                    <td>{item.size}</td>
                                    <td>{item.color}</td>
                                    <td>${item.price}</td>
                                    <td>
                                        <Button className="actionButton" variant="success" size="sm" onClick={() => navigate(`/shoes/edit/${item.id}`)}>
                                            Edit
                                        </Button>
                                        <Button className="actionButton" variant="primary" size="sm" onClick={() => addItem(props.item)}>
                                            Add to Cart
                                        </Button>
                                    </td>
                                </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            }
        </div>
    )
}

export default AllShoes;