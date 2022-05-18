import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ShoeForm from './Form';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateShoe = (props) => {
    const { id } = useParams();
    const [errors, setErrors] = useState({});
    const [name, setName] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [condition, setCondition] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState();
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/shoes/${id}`, {withCredentials: true})
            .then(res => {
                console.log(res.data);
                setName(res.data.name);
                setSize(res.data.size);
                setColor(res.data.color);
                setCondition(res.data.condition);
                setDescription(res.data.description);
                setPrice(res.data.price);
                setLoaded(true);
            })
            .catch((err) => console.log(err))
    }, [id]);

    const submitHandler = shoeParam => {
        axios.put(`http://localhost:8000/api/shoes/${id}`, shoeParam, {withCredentials: true}, {
            name, size, color, condition, description, price
        })
            .then((res) => {
                if(res.data.errors){
                    console.log(res.errors);
                    setErrors(res.errors);
                } else {
                    console.log(res.data);
                    navigate("/home");
                }
            })
            .catch((err) => {
                setErrors(err.response.data.errors);
            })
    }
    return(
        <div>
            <div className="update-header">
                <h1>SoleCycle</h1>
                <h5>Update {name}</h5>
            </div>
            {
                loaded && <ShoeForm onSubmitProp = {submitHandler}
                initialName = {name}
                initialSize = {size}
                initialColor = {color}
                initialCondition = {condition}
                intialDescription = {description}
                initialPrice = {price}
                />
            }
            <p class="errors">{errors.name ? <span>{errors.name.message}</span>:null}</p>
            <p class="errors">{errors.size ? <span>{errors.size.message}</span>:null}</p>
            <p class="errors">{errors.color ? <span>{errors.color.message}</span>:null}</p>
            <p class="errors">{errors.condition ? <span>{errors.condition.message}</span>:null}</p>
            <p class="errors">{errors.description ? <span>{errors.description.message}</span>:null}</p>
        </div>
    )
}

export default UpdateShoe;