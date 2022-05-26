import React from 'react';
import '../App.css'

const AboutCardUI = (props) => {
    return (
        <div className="card mt-2">
            <div className="row ">
                <div className="col">
                    <img src={props.picture} className="img-fluid rounded-start" />
                </div>

                <div className="col">
                    <div className="card-body">
                        <p className="card-text">{props.text}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AboutCardUI;