import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { Button, Container, Table, Modal, Form, Alert } from "react-bootstrap";
import '../App.css';

const Cart= ()=>{
    const [Data, setData] = useState([]);
    const [password, setPassword] = useState("")
    const [show, setShow] = useState(false);
    const [errorShow, setErrorShow] = useState(false);
    const [successShow, setSuccessShow] = useState(false);
    const navigate = useNavigate()
    
    const API = "http://localhost:8080";
    const API_PRODUCT = "http://localhost:8080/products";

    useEffect(() => {
        const fetchData = async() => {
            const cart = await JSON.parse(localStorage.getItem("cart"));
            if (cart !== null) {
                const res = await axios.post(API_PRODUCT + "/cart", { cart })
                setData(res.data.product);
              }
        }
        fetchData()
    }, [])

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
      };
    
      const сonfirmPassword = async () => {
        const data = JSON.parse(localStorage.getItem("user"))
        const res = await axios.post(API + '/cart/confirm', { data, password, Data });
        if (res.data.success === false) {
          setErrorShow(true)
        } else {
            setSuccessShow(true);
           setTimeout(() => {
            localStorage.removeItem("cart");
            navigate("/products");
            window.location.reload();
          }, 2000);
        }
      }


    return(
        <>
        <div className='catalog'>
            <div className="loginform">
                <h1>Корзина</h1>
                <Table variant="light" striped bordered>
                    <tbody style={{ textAlign: "center", fontSize: "1.3rem" }}>
                        {Data.map((element, id) => (
                        <tr className="mt-5r" key={id}>
                            <td><img
                            className="d-block m-auto"
                            src={API_PRODUCT + `/file/${element.photoFileId}`}
                            alt={`${element.Name}`}
                            style={{ maxWidth: "7rem" }}
                            />
                            </td>
                            <td>{element.name}</td>
                            <td>{element.price}</td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <Button className="mt-3 d-flex justify-content-center" onClick={() => setShow(true)}>Оформить заказ</Button>
          </div>
        <Modal show={show}
          onHide={() => {
            setShow(false)
            setPassword("")
          }}
          backdrop="static"
          keyboard={false}
          centered
        >
        <Modal.Header closeButton>
            <Modal.Title>Подтвердите пароль</Modal.Title>
        </Modal.Header>
      
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="m-3" controlId="formBasicLogin">
              <Form.Label>Введите пароль</Form.Label>
              <Form.Control
                required
                type="text"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={() => {
            setShow(false)
            setPassword("")
          }}>Отмена</Button>
          <Button variant="success" onClick={() => сonfirmPassword()}>Подтвердить</Button>
        </Modal.Footer>
        </Modal>
        {errorShow &&
        <Alert variant="danger" onClose={() => setErrorShow(false)} 
          dismissible style={{ zIndex: 9999, position: "fixed", right: "1vw", bottom: "0" }}>
          <Alert.Heading>Упс... кажется произошла какая-то ошибка</Alert.Heading>
        </Alert>}
        {successShow &&
          <Alert variant="success" onClose={() => setSuccessShow(false)} 
            dismissible style={{ zIndex: 9999, position: "fixed", right: "1vw", bottom: "0" }}>
            <Alert.Heading>Заказ сформирован</Alert.Heading>
          </Alert>}
        

        </>

    )
    

} 
export default Cart;