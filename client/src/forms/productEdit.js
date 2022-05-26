import React, { useState, useEffect } from "react"
import Authentification from '../service/authentification';
import axios from "axios"
import { useNavigate } from "react-router-dom"

import "../App.css";
const ProductEdit=()=> {
    const API_URL = "http://localhost:8080/products";
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async() => {
            const user = await Authentification.getCurrentUser()
            if (!user) {
                navigate("/")
                window.location.reload()
            } else {
                const res = await axios.get(API_URL+`/${user.id_user}`);
                setData(res.data.product)
            }
        }
        fetchData()
    }, [navigate])

    const deleteProduct = async (id) => {
        return await axios.post(API_URL+`/${id}/delete`).then(() => {
            window.location.reload()
    })
    }
   

    return (
        <>
        <div className="productadd">
        <h4>Изменить список товаров</h4>

        <div class="cataloglist">
            <div class="row ">
                <div className="column"> 
                    {data && data.map((element) => {
                        return(
                                    <div className="card text-center" key={element.id}>
                                        <img src={API_URL+`/file/${element.photoFileId}`} className="card-img" alt="product" />
                                        <div className="card-body">
                                            <h6 className='card-text'>{element.name}</h6>
                                                <h4 className='card-title'>{element.price} Р.</h4>
                                        </div>
                                        <div className="button" >                    
                                            <button type="button" className="btn btn-outline-danger" onClick={() => deleteProduct(element.id)}>Удалить</button>
                                        </div>
                                    </div>
                            
                            
                        );
                    })}
                </div>
            </div>
        </div>
        
        </div>
        </>
    )
}
export default ProductEdit;