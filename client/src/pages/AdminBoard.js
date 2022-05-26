import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductAdd from '../forms/productAdd'
import ProductEdit from "../forms/productEdit";
import CategoryAdd from '../forms/categoryAdd';
import CategoryEdit from '../forms/categoryEdit.js';
import { useNavigate } from "react-router-dom"
import '../App.css';

const AdminBoard= ()=>{

    return(
        <>
        <div className="adminboard">
            <ProductAdd/>
            <CategoryAdd/>
        </div>
        <ProductEdit/>
        <CategoryEdit/>
        </>

    )
    

} 
export default AdminBoard;
