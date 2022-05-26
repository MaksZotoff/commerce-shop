import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';
import authentification from "../service/authentification";
    const API_PRODUCT = "http://localhost:8080/products";
    const API = "http://localhost:8080";

const ProductList = () => {
    
    const [product, setProduct] = useState([]);
    const [idProduct, setIdProduct] = useState("");
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [file, setFile] = useState(null)

    const [user, setUser]= useState(undefined);
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        const fetchData = async() => {
            const searchProduct = new URLSearchParams(document.location.search);
            const result = await axios.get(API_PRODUCT + `/${searchProduct.get('name')}`)
            const user = await authentification.getCurrentUser()
            setProduct(result.data.product);
            
            if (user !== null) {
                setAdmin(user.roles.includes("Admin"))
                setUser(user);
            }
        }
        fetchData()
    }, [setUser])

    const onServer = async() => {
        const id_user = user.id_user;

        let formData = new FormData();
        formData.append("file", file)

        const result = await axios.post(API + "/products/upload", formData)
        const fileId = result.data.fileId;

        await axios.post(API + "/products/add", {
            id_user,
            name,
            price,
            fileId
        }).then(() => {
            window.location.reload()
        })
        }

    const addCart = async(id) => {
        const cart = localStorage.getItem("cart")
        const id_user = user.id_user;
        let products = []
        if (cart) {
            products = JSON.parse(cart)
        }
        products.push(id)
        console.log(products)
        products = [...new Set(products)]
        console.log(products)
        localStorage.setItem('cart', JSON.stringify(products))
    }

    return (
        <>
            <div className="productlist">
                <h1>Каталог товаров</h1>
                <div className="row ">
                    <div className="columncat">
                        <div className="column"> 
                            {product && product.map((element) => {
                                return(
                                    <div className="card text-center" key={element.id} >
                                        <img src={API_PRODUCT+`/file/${element.photoFileId}`} className="card-img" alt="product" />
                                        <div className="card-body">
                                            <h6 className='card-text'>{element.name}</h6>
                                                <h4 className='card-title'>{element.price} Р.</h4>
                                        </div>
                                        <div className="button" >                    
                                            <button type="button" className="btn btn-outline-dark" onClick={() => addCart(element.id)}>В корзину</button>
                                        </div>
                                    </div>                        
                                    );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductList;
