import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { InputGroup } from 'react-bootstrap';

const ShoeForm = (props) => {
    const { id, userName } = useParams();
    const {initialName, initialSize, initialCondition, initialColor, initialDescription, initialPrice, onSubmitProp} = props;
    const [name, setName] = useState(initialName);
    const [size, setSize] = useState(initialSize);
    const [condition, setCondition] = useState(initialCondition);
    const [color, setColor] = useState(initialColor);
    const [description, setDescription] = useState(initialDescription);
    const [price, setPrice] = useState(initialPrice);
    const navigate = useNavigate();

    const onSubmitHandler = e => {
        e.preventDefault();
        onSubmitProp({name, size, condition, color, description, price});
    }
    return(
        <div>
            <Button size="sm" variant="outline-success" className="Form" href={`/home/${userName}`}>Home</Button>
            
            <Form className = "Form" onSubmit={onSubmitHandler}>
                <div class="me-5 mt-3">
                    <p>Shoe Details</p>
                    <Form.Group>
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Size:</Form.Label>
                        <Form.Select name="size" value ={size} onChange={(e) => setSize(e.target.value)}>
                            <option disabled>Select a size</option>
                            <option>4.0M | 5.5W</option>
                            <option>4.5M | 6.0W</option>
                            <option>5.0M | 6.5W</option>
                            <option>5.5M | 7.0W</option>
                            <option>6.0M | 7.5W</option>
                            <option>6.5M | 8.0W</option>
                            <option>7.0M | 8.5W</option>
                            <option>7.5M | 9.0W</option>
                            <option>8.0M | 9.5W</option>
                            <option>8.5M | 10.0W</option>
                            <option>9.0M | 10.5W</option>
                            <option>9.5M | 11.0W</option>
                            <option>10.0M | 11.5W</option>
                            <option>10.5M | 12.0W</option>
                            <option>11.0M | 12.5W</option>
                            <option>11.5M | 13.0W</option>
                            <option>12.0M</option>
                            <option>12.5M</option>
                            <option>13.0M</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Color:</Form.Label>
                        <Form.Control type="text" name="color" value={color} onChange={(e) => setColor(e.target.value)} />
                    </Form.Group>
                    <div>
                        <Form.Group>
                            <Form.Label>Condition:</Form.Label>
                            <Form.Select name="condition" value ={condition} onChange={(e) => setCondition(e.target.value)}>
                                <option disabled>Select Condition</option>
                                <option>Brand New</option>
                                <option>Very Good</option>
                                <option>Good</option>
                                <option>Fair</option>
                                <option>Poor</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group class="mb-3">
                                <Form.Label>Description:</Form.Label>
                                <Form.Control type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                        <InputGroup>
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control id="inlineFormInputGroupUsername" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </InputGroup>
                    </div>
                </div>
                <Button className="submit-button" variant="primary" size="sm" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default ShoeForm;