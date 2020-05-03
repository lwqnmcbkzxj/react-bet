import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { AppStateType } from '../../types/types'
import { NewsType } from '../../types/news'
import { getNewsFromServer } from '../../redux/news-reducer'
import News from './News'

const NewsContainer: FC = ({ ...props }) => {
	const news = useSelector<AppStateType, Array<NewsType>>(state => state.news.news)
	
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getNewsFromServer())
	}, []);

	return ( 
		<News news={news}/>
	)
}

export default NewsContainer;