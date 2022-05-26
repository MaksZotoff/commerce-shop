import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Button, Alert } from "react-bootstrap"
import Authentification from '../service/authentification'

import "../App.css";

const Login = () => {
  
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [errorShow, setErrorShow] = useState(false);


  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const fetchData = (login, password) => {
    Authentification.signin(login, password)
    .then((res) => {
        if (res.data.success === false) {
          setErrorShow(true)
        } else {
          navigate("/products");
          window.location.reload();
        }
  })
  }



  return (
    <>
    <div className="login">
      <Form className="loginform" onSubmit={handleSubmit}>
        <Form.Group className="m-3" controlId="formBasicLogin">
          <Form.Label>Введите логин</Form.Label>
          <Form.Control
            required
            type="text"
           
            value={login}
            onChange={e => setLogin(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="m-3" controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            required
            type="password"
            
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button
          className="m-3"
          variant="primary"
          type="button"
          onClick={() => fetchData(login, password)}
        >Войти
        </Button>
      </Form>
      
      </div>        
        {errorShow &&
          <Alert variant="danger" onClose={() => setErrorShow(false)} dismissible style={{ zIndex: 9999, position: "fixed", right: "1vw", bottom: "0" }}>
              <Alert.Heading>Какая-то ошибка, повторите попытку</Alert.Heading>
          </Alert>}
    </>
  );
};

export default Login;