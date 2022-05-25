import React, {useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShoeForm from "./Form";


const NewShoe = (props) => {
    const { userName } = useParams();
    const [errors, setErrors] = useState({});
    const [name, setName] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [condition, setCondition] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState();
    const [authError, setAuthError] = useState({});
    const [socket] = useState(() => io(':8000'));
    const navigate = useNavigate();

    const submitHandler = shoeParam => {
        axios.post("http://localhost:8000/api/shoes", shoeParam, {withCredentials: true}, {
            name, size, color, condition, description, price
        })
            .then((res) => {
                if(res.data.errors){
                    console.log(res.errors);
                    setErrors(res.errors);
                } else {
                    setErrors({});
                    setAuthError("");
                    console.log(res.data);
                    socket.emit("added_new_shoe", res.data);
                    socket.disconnect();
                    navigate(`/home/${userName}`)
                }
            })
            .catch((err) => {
                if(err.response.status === 401){
                    setAuthError("You must be logged in to add a new shoe.")
                } else {
                setErrors(err.response.data.errors);
                }
            })
    };

    return(
        <div>
            <h1 className="newSneaker">Add a Sneaker</h1>
            <p class="errors">{errors.name ? <span>{errors.name.message}</span>:null}</p>
            <p class="errors">{errors.size ? <span>{errors.size.message}</span>:null}</p>
            <p class="errors">{errors.color ? <span>{errors.color.message}</span>:null}</p>
            <p class="errors">{errors.condition ? <span>{errors.condition.message}</span>:null}</p>
            <p class="errors">{errors.description ? <span>{errors.description.message}</span>:null}</p>
            {
                <ShoeForm onSubmitProp={submitHandler}/>
            }
        </div>
    )
}

export default NewShoe;