import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import io from 'socket.io-client'
import Button from 'react-bootstrap/Button'

const OneShoe = (props) => {
    const { id } = useParams();
    const [ oneUser, setOneUser ] = useState({});
    const [ oneShoe, setOneShoe ] = useState({});
    const [socket] = useState( () => io(':8000') );
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/shoes/${id}`,
        {withCredentials: true})
            .then((res) => {
                console.log(res.data);
                setOneShoe(res.data);
            })
            .catch((err) => console.log(err))
    }, [id]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${id}`)
            .then((res) => {
                console.log(res.data);
                setOneUser(res.data);
            })
            .catch((err) => console.log(err))
    }, [id]);

    const handleDelete = (shoeId) => {
        axios.delete(`http://localhost:8000/api/shoes/${shoeId}`, {withCredentials:true})
            .then((res) => {
                console.log(res.data);
                alert(`${oneShoe.name} has been deleted.`);
                navigate('/home')
            })
            .catch((err) => console.log(err))
    }

    return(
        <div>
            <Card style={{ width: '30rem' }} className="text-center" id="cardInfo">
                <Card.Body>
                    <Card.Title>{oneShoe.name}</Card.Title>
                    <Card.Text>Condition: {oneShoe.condition}</Card.Text>
                    <Card.Text>Size: {oneShoe.size}</Card.Text>
                    <Card.Text>Color: {oneShoe.color}</Card.Text>
                    <Card.Text>Description: {oneShoe.description}</Card.Text>
                    <Card.Text>Price: ${oneShoe.price}</Card.Text>
                    <Card.Text>Posted by: {oneUser.firstName} {oneUser.lastName}</Card.Text>
                    <Button className="actionButton" onClick={() => navigate("/home")}>Home</Button>
                    <Button variant="danger" onClick={() => handleDelete(oneShoe._id)}>Delete</Button>
                </Card.Body>
            </Card>
        </div>
    )

}

export default OneShoe;