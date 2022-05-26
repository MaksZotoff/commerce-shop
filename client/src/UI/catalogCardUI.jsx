import React from 'react';
import '../App.css'

const CatalogCardUI = (props) => {
    return(
        <div className="card text-center" >
            <img src={props.picture} className="card-img" alt="product" />
            <div className="card-body">
                <h6 className='card-text'>{props.title}</h6>
                <h4 className="card-title">{props.price}</h4>
            </div>
                    <div className="button" >                    
                        <button type="button" className="btn btn-outline-dark">В корзину</button>
                    </div>
        </div>
    );
}
export default CatalogCardUI;