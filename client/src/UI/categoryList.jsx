import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';

const CategoryList = () => {
    const API_CATEGORY = "http://localhost:8080/categorys";
    const [category, setCategory] = useState([]);
    useEffect(() => {
        const fetchData = async() => {
            const result = await axios.get(API_CATEGORY+`/all`);
            setCategory(result.data.category);
        }
        fetchData()
    }, [setCategory])

    return (
        <>
            <div className="categorylist">
                <h1>Категории товаров</h1>
                <div className="row ">
                    <div className="columncat">
                        <div className="column"> 
                            {category && category.map((element) => {
                                return(
                                    <div className="card text-center" id='categoryid' key={element.id}>
                                        <img src={API_CATEGORY+`/file/${element.photoFileId}`} 
                                            className="card-img w-100" 
                                            alt="category" 
                                            
                                        />
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

export default CategoryList;