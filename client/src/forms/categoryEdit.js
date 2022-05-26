import React, { useState, useEffect } from "react"
import Authentification from '../service/authentification';
import axios from "axios"
import { useNavigate } from "react-router-dom"

import "../App.css";
const CategoryEdit=()=> {
    const API_URL = "http://localhost:8080/categorys";
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
                setData(res.data.category)
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
        <h4>Изменить список категорий</h4>

        <div class="cataloglist">
            <div class="row ">
                <div className="column"> 
                    {data && data.map((element) => {
                        return(
                                    <div className="card text-center" key={element.id}>
                                        <img src={API_URL+`/file/${element.photoFileId}`} className="card-img" alt="product" />
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
export default CategoryEdit;