import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

const ProfilePage = () => {
    const {userName} = useParams();
    const [user, setUser] = useState("");
    const [shoes, setShoes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${userName}`, {withCredentials : true})
        .then(res => {
            setUser(res.data);
        })
        .catch(err => {
            console.log(err, "Error getting user data.")
        })
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/shoes/${userName}`, {withCredentials: true})
        .then(res => {
            setShoes(res.data);
        })
        .catch(err => {
            console.log(err, "Error getting users shoes");
        })
    }, []);

    const handleDeleteUser = (id) => {
        axios.delete(`http://localhost:8000/api/user/${id}`)
        .then((res) => {
            console.log('User deleted succesfully.', res)
            navigate('/');
        })
        .catch((err) => {
            console.log(err, "Error deleting user.")
        })};


    return(
        <div>
            <div className="navbar navbar-light text-light p-1">
                <h1 className="m-1">SoleCycle</h1>
                <Link className="btn btn-primary m-1" to={`/home/${userName}`}>Home</Link>
            </div>
            <div className="d-flex justify-content-between m-2">
                <h2>@{user.userName}</h2>
                <h2>{user.firstName} {user.lastName}</h2>
                <div>
                    <Link className="btn btn-warning m-1" to={`/user/edit/${user.userName}`}>Edit User</Link>
                    <button className="btn btn-danger m-1" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                </div>
            </div>
            <h2 className="text-center">Shoes</h2>
            <div className="m-4 d-flex flex-wrap justify-content-around">
                {shoes.map((shoes, index) => {
                    return (
                        <div className="card w-25 m-2" key={index}>
                            <div className="card-body">
                                <h5 className="card-title">{shoes.movieName}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Shoe: {shoes.name}</h6>
                                <p className="card-text">{shoes.comment}</p>
                                <Link className="card-link btn btn-sm btn-warning mr-1" to={`/edit/${user.userName}/${shoes._id}`}>Edit</Link>
                                
                            </div>
                        </div>
                    )})}
            </div>
        </div>
    )
};

export default ProfilePage;