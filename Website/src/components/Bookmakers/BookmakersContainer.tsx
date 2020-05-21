import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { AppStateType } from '../../types/types'
import Bookmakers from './Bookmakers'
import { getBookmakersFromServer } from '../../redux/bookmakers-reducer'
import { BookmakerType } from '../../types/bookmakers'


const BookmakersContainer: FC = ({ ...props }) => {
	const bookmakers = useSelector<AppStateType, Array<BookmakerType>>(state => state.bookmakers.bookmakers)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getBookmakersFromServer())		
	}, []);


	return (
		bookmakers[0].id ?
		<Bookmakers
			bookmakers={bookmakers}
		/> : <></>
	)
}

export default BookmakersContainer;