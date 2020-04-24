import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { AppStateType } from '../../types/types'
import Bookmakers from './Bookmakers'

import { BookmakerType } from '../../types/bookmakers'


const BookmakersContainer: FC = ({ ...props }) => {
	const bookmakers = useSelector<AppStateType, Array<BookmakerType>>(state => state.bookamkers.bookmakers)

	const dispatch = useDispatch()

	// useEffect(() => {
	// 	dispatch(getMatchesFromServer(1, 15))		
	// }, []);


	return (
		<Bookmakers
			bookmakers={bookmakers}
		/>
	)
}

export default BookmakersContainer;