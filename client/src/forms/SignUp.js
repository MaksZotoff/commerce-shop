import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import Authentification from '../service/authentification';
import "../App.css";

import { Form, Button, Alert } from "react-bootstrap";

const Signup = () => {
  
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [patronym, setPatronym] = useState("");

  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [secpassword, setSecpassword] = useState("");
  const [isChecked, setIsChecked] = useState(false)


  const [loginInvalid, setLoginInvalid] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [secpasswordInvalid, setSecpasswordInvalid] = useState(false);

  const [nameInvalid, setNameInvalid] = useState(false);
  const [surnameInvalid, setSurnameInvalid] = useState(false);
  const [patronymInvalid, setPatronymInvalid] = useState(false);

  const [error, setError] = useState(null)

  const [show, setShow] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  const navigate = useNavigate()

  const checkHandler = () => {
    setIsChecked(!isChecked)
  }
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
  };


  const onServer = (name, surname, patronym, login, email, password) => {
    setLoginInvalid(false);
    setEmailInvalid(false);
    setPasswordInvalid(false);
    setSecpasswordInvalid(false);

    setNameInvalid(false);
    setSurname(false);
    setPatronym(false);

    setError(null)


      if (login === "") setLoginInvalid(true)
      if (email === "") setEmailInvalid(true)
      if (name === "") setNameInvalid(true)
      if (surname === "") setSurnameInvalid(true)
      if (patronym === "") setPatronymInvalid(true)
      if (!(password.length >= 6 && password.length <= 20)) setPasswordInvalid(true)
      if ((password !== secpassword) || secpassword===''){
        setSecpasswordInvalid(true)
      }
      if (loginInvalid === false && emailInvalid === false && passwordInvalid === false && secpasswordInvalid === false && isChecked === true && nameInvalid === false && surnameInvalid === false, patronymInvalid === false ) {
        return Authentification.register( login, email, password, name, surname, patronym)
        .then((res) => {
          if (res.data.success === false) {
            setErrorShow(true)
          } else {
              navigate("/")
              window.location.reload()
          }
        })
      } else {
      return null
    }
  };


  return (
    <>
        <div className="signup">
          <Form className="signupform" onSubmit={handleSubmit}>
            
          <Form.Group className="m-3" controlId="formBasicName">
              <Form.Control
                placeholder="Имя"
                required
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                
              />
            </Form.Group>
            <Form.Group className="m-3" controlId="formBasicSurname">
              <Form.Control
                placeholder="Фамилия"
                required
                type="text"
                value={surname}
                onChange={e => setSurname(e.target.value)}
                
              />
            </Form.Group>
            <Form.Group className="m-3" controlId="formBasicPatronym">
              <Form.Control
                placeholder="Отчество"
                required
                type="text"
                value={patronym}
                onChange={e => setPatronym(e.target.value)}
                
              />
            </Form.Group>
            
            <Form.Group className="m-3" controlId="formBasicLogin">
              <Form.Control
                placeholder="Введите логин"
                required
                type="text"
                value={login}
                onChange={e => setLogin(e.target.value)}
                isInvalid={loginInvalid}
              />
            </Form.Group>

            <Form.Group className="m-3" controlId="formBasicEmail">
              <Form.Control
              placeholder="Введите email"
                required
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                isInvalid={emailInvalid}
              />
            </Form.Group>

            <Form.Group className="m-3" controlId="formBasicPassword">
              <Form.Control
                placeholder="Введите пароль"
                required
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                isInvalid={passwordInvalid}
                isValid={(password.length >= 4 && password.length <= 10)}
              />
            </Form.Group>
            <Form.Group className="m-3" controlId="formBasicSecPassword">
              <Form.Control
                placeholder="Повторите пароль"
                required
                type="password"
                value={secpassword}
                onChange={e => setSecpassword(e.target.value)}
                isInvalid={secpasswordInvalid}
                isValid={(password.length >= 4 && password.length <= 10)}
              />
            </Form.Group>

            <Form.Check
              required
              type="checkbox"
              label="Даю согласие на обработку персональных данных"
              isValid={isChecked}
              isInvalid={!isChecked}
              onChange={checkHandler} />

            <Button
              className="m-3"
              variant="primary"
              type="button"
              onClick={() => onServer(name, surname, patronym, login, email, password)}
            >Зарегистрироваться
            </Button>

          </Form>

        </div>
          {errorShow &&
            <Alert variant="danger" onClose={() => setErrorShow(false)} dismissible style={{ zIndex: 9999, position: "fixed", right: "1vw", bottom: "0" }}>
              <Alert.Heading>Something error</Alert.Heading>
            </Alert>}
    </>
  );

};

export default Signup;