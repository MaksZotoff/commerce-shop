import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import Authentification from '../service/authentification';
import axios from "axios"
import "../App.css";

const CategoryAdd=()=> {
    const [file, setPhoto] = useState(null)

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
    };

    const onServer = async () => {
        const user = await Authentification.getCurrentUser()
        const id_user = user.id_user;

        let formData = new FormData();
        formData.append("file", file)
                
        const result = await axios.post("http://localhost:8080/categorys/upload", formData )        
        const photoFileId = result.data.fileId;

        await axios.post("http://localhost:8080/categorys/add", {
            id_user,
            photoFileId
        }).then(() => {
            console.log('success')
        })
    }

    return (
        <>
        <div className="productadd">
        <h4>Добавить категорию</h4>

        <div className="productform">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formFile" className="m-3">
                        <Form.Label>Фотография</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={e => setPhoto(e.target.files[0])}/>
                    </Form.Group>

                    <Button
                        className="m-3"
                        variant="outline-primary"
                        type="button"
                        onClick={() => onServer()}>
                        Добавить
                    </Button>
                </Form>
        </div>

        </div>
        </>
    )
}
export default CategoryAdd;