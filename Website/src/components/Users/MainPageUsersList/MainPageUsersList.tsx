import React, { FC } from 'react';
import { useDispatch, useSelector } from "react-redux"
import s from './MainPageUsersList.module.scss';
import classNames from 'classnames'
import { UserType } from '../../../types/users'
import { AppStateType } from '../../../types/types'
import { MainPageUsersPlaceholder } from '../../Common/Placeholders/UsersPlaceholder'

import statsImg from '../../../assets/img/Icon ionic-md-stats.png'
import userImg from '../../../assets/img/user-img.png'

import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';

type UsersListPropsType = {
	users: Array<UserType>
	limit?: number
}
const UsersList: FC<UsersListPropsType> = ({ users, limit = 0, ...props }) => {
	const isFetching = useSelector<AppStateType, boolean>(state => state.users.isFetching)

	const params = {
		scrollbar: {
			el: '.swiper-scrollbar',
			hide: false,
			background: '#FFFFFF',
			draggable: true,
		},
		breakpoints: {
			1920: {
				slidesPerView: 5,
				spaceBetween: 70
			},
			1024: {
				slidesPerView: 5,
				spaceBetween: 40
			},
			768: {
				slidesPerView: 4,
				spaceBetween: 35
			},
			640: {
				slidesPerView: 4,
				spaceBetween: 30
			},
			480: {
				slidesPerView: 4,
				spaceBetween: 25
			},
			320: {
				slidesPerView: 4,
				spaceBetween: 20,
			},
			300: {
				slidesPerView: 3,
				spaceBetween: 15,
			}
		}
	}

	let elements = [] as any
	users.map((user, counter) => {
		if (counter < limit || limit === 0) {
			elements.push(
				isFetching ? <div className={s.user}><MainPageUsersPlaceholder /></div>
					:
					<div className={s.user}>
						<img className={s.userImg} src={userImg} alt="user-img" />
						<div className={s.nickName}>Никнейм</div>
						<div className={s.stats}>
							<img src={statsImg} alt="stats-img" />
							<p className={classNames(s.profit, { [s.positive]: true, [s.negative]: false })}>+250.4%</p>
						</div>
					</div>)
		}
	})

	return (
		<Swiper {...params}>
			{[...elements]}

		</Swiper >
	)
}
export default UsersList;