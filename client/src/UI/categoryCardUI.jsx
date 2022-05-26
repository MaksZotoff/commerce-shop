import React from 'react';

import '../App.css'

const CategoryCardUI = (props) => {
    return(
        <div className="item" >
            <img src={props.picture} className="item-img" alt="category" />
        </div>
    );
}
export default CategoryCardUI;