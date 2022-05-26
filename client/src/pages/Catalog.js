
import React, { useState, useEffect } from "react";
import axios from "axios";
import Authentification from '../service/authentification';
import { useNavigate } from "react-router-dom"
import '../App.css';

import CategoryList from '../UI/categoryList';
import CatalogList from '../UI/catalogList'
    
const API_PRODUCT = "http://localhost:8080/products";

const Catalog = () => {
    const [data, setData] = useState([]);
    const [user, setUser] = useState(undefined);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async() => {
            const res = await axios.get(API_PRODUCT+`/all`);
            const user = await Authentification.getCurrentUser()
            setData(res.data.product)
            if (user !== null) {
                setUser(user);
            }
        }
        fetchData()
    }, [setUser])

    return (
        <>
            <div className='catalog'>
                <CategoryList />
                <CatalogList />
            </div>
        </>
    );
};


export default Catalog;