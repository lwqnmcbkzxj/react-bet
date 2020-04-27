import React, { FC } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { AppStateType } from '../../types/types'
import { NewsType } from '../../types/news'

import News from './News'

const NewsContainer: FC = ({ ...props }) => {
	const news = useSelector<AppStateType, Array<NewsType>>(state => state.news.news)
 
	return ( 
		<News news={news}/>
	)
}

export default NewsContainer;