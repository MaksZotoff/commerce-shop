import React from 'react';
import '../App.css'

const ProductCardUI = (props) => {
    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={props.picture} className="img-fluid rounded-start" alt="product" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h3 className='card-title'>{props.title}</h3>
                        <h5 className='card-title'>{props.price}</h5>

                        <p className="card-text">{props.text}</p>

                        <div className="button" >                    
                            <button type="button" className="btn btn-outline-dark">В корзину</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductCardUI;