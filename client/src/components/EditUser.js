import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";

const EditUser = () => {
    const navigate = useNavigate();
    const { user } = useParams();

    const [_id, set_Id] = useState("")
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${user}`, { withCredentials: true })
            .then(res => {
                set_Id(res.data._id);
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setUserName(res.data.userName);
                setEmail(res.data.email);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/user/${_id}`, { _id, firstName, lastName, userName, email }, { withCredentials: true })
            .then((res) => {
                console.log("Success", res);
                navigate(`/user/${userName}`);
            })
            .catch((err) => {
                console.log("Error Editing User", err.response);
                setError(err.response.data.errors);
            });
    };

    return (
        <div>
            <div className="navbar navbar-light bg-dark text-light p-1">
                <h1 className='m-1'>SoleCycle</h1>
            </div>
            <h2 className="text-center mt-2">Edit {userName}'s Info</h2>
            <div className="container d-flex justify-content-around">
                <form onSubmit={submitHandler}>
                    <input type="hidden" name="_id" value={{ _id }} />
                    <div className="d-flex">
                        <div className="d-block m-2">
                            <div>
                                <label>
                                    First Name:
                                    <input type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName} className="form-control" />
                                </label>
                                {error.firstName && <p style={{ color: "red" }}>{error.firstName.message}</p>}
                            </div>
                            <div>
                                <label>
                                    Last Name:
                                    <input type="text" onChange={(e) => setLastName(e.target.value)} value={lastName} className="form-control" />
                                </label>
                                {error.lastName && <p style={{ color: "red" }}>{error.lastName.message}</p>}
                            </div>
                            <div>
                                <label>
                                    Username:
                                    <input type="text" onChange={(e) => setUserName(e.target.value)} value={userName} className="form-control" />
                                </label>
                                {error.userName && <p style={{ color: "red" }}>{error.userName.message}</p>}
                            </div>
                            <div>
                                <label>
                                    Email:
                                    <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" />
                                </label>
                                {error.email && <p style={{ color: "red" }}>{error.email.message}</p>}
                            </div>
                        </div>
                    </div>
                    <Button type="submit" className="m-2" variant="success" >Submit Changes</Button>
                </form>
            </div>
        </div>
    )
};

export default EditUser;