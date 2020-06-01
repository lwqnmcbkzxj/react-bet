import React, { FC } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { AppStateType } from '../../types/types'
import { NewsType } from '../../types/news'

import NewsSingle from './NewsSingle'

const NewsSingleContainer: FC = ({ ...props }) => {
	// const currentSingleNews = useSelector<AppStateType, NewsType>(state => state.news.currentSingleNews)
 
	return ( 
		// <NewsSingle news={}/>
		<div></div>
	)
}

export default NewsSingleContainer;