import React from 'react';
import s from './Preloader.module.scss';
import loader from '../../../assets/img/Preloader.svg';


const Preloader = () => {
    return (
        <div className={s.preloader}>
            <img src={loader} alt="Preloader"/>
        </div>

    );
}

export default Preloader;
