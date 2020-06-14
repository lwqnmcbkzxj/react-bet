import React, { FC, useState, useEffect } from 'react';
import s from './Adverts.module.scss';
import classNames from 'classnames'
import { useSelector } from 'react-redux';
import { AppStateType, BannerType, BannerPositionEnum } from '../../types/types';
import { apiURL } from '../../api/api';

type Props = {
	position: BannerPositionEnum
}

export const Banner: FC<Props> = ({ position, ...props }) => {
	let banners = useSelector<AppStateType, Array<BannerType>>(state => state.app.banners)
		.filter(banner => +banner.position === +position)
	let banner = banners[0];


	let positionsArr = [...Object.keys(BannerPositionEnum)]
	let [positionName, setPositionName] = useState('')

	useEffect(() => {
		positionsArr.map(name => {
			let enumKey = +BannerPositionEnum[name as any]
			if (enumKey === +position) {
				setPositionName(name)
			}
		})
	}, [position]);

	return (

		banner && banner.image ?
			<a href={banner.link} className={classNames(s.banner, s[`banner-${positionName}`])} >
				{banner.is_video ?
					<video controls >
						<source src={apiURL + banner.image} />
					</video>

					: <img src={apiURL + banner.image} alt={banner.title} />}

			</a> :
			null

	)
}
