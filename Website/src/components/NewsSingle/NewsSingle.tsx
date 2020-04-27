import React, { FC } from 'react'
import s from './News.module.scss';
import { useDispatch, useSelector} from "react-redux"
import { AppStateType } from '../../types/types'
import { NewsType } from '../../types/news'

type NewsSinglePropsType = {
	news: NewsType
}

const NewsSingle: FC<NewsSinglePropsType> = ({ news, ...props }) => {
	return (
		<div>NEWS SINGLE</div>
	)
}

export default NewsSingle;