import React, { FC } from 'react';
import s from './Adverts.module.scss';
import userImgHolder from '../../assets/img/user-no-image.png'
import contentImgHolder from '../../assets/img/content-img-holder.png'
import { Link } from 'react-router-dom';
const AdvertBlock = ({ ...props }) => {
	return (
		<Link to={`/`} className={s.advert_block} >
			<div className={s.advert__header}>
				<div className={s.header__logo}>
					<img src={userImgHolder} alt="company-logo" />
				</div>
				<div className={s.header__title}>
					<div className={s.title__name}>Название рекламной записи</div>
					<div className={s.title__details}>Рекламная запись 18+</div>
				</div>
			</div>
			<div className={s.advert__content}>
				<img src={contentImgHolder} alt="advert-content-img" />
			</div>
		</Link>
	)
}

export default AdvertBlock;