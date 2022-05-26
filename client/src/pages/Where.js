import React from 'react';

import map from '../media/map.png';
import instagramIcon from '../media/icon_instagram.png';
import vkIcon from '../media/icon_vk.png';
import '../App.css';

const Where = () => {
    return (
        <div className='where'>
        <div className='mapside'>
            <img src={map} alt="map" />
        </div>

        <div className='contact'>
            <p>Адрес: г. Иваново, ул. Шевченко, д. 2.</p>
            <p>Телефон: +7 930 341 84 61</p>
            <p>Email: Marya.ivanova.17@inbox.ru</p>

            <div className='social'>
                <h3>Мы в социальных сетях:</h3>
                <div className='social-icon'>
                    <img src={instagramIcon} alt="instagram-icon" />
                    <img src={vkIcon} alt="vk-icon" />                    
                </div>
                    
            </div>
        </div>
        </div>
    );
};

export default Where;