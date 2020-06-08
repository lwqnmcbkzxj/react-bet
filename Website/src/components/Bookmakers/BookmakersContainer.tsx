import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { AppStateType } from '../../types/types'
import Bookmakers from './Bookmakers'
import { getBookmakersFromServer } from '../../redux/bookmakers-reducer'
import { BookmakerType } from '../../types/bookmakers'


const BookmakersContainer: FC = ({ ...props }) => {
	const dispatch = useDispatch()
	const bookmakers = useSelector<AppStateType, Array<BookmakerType>>(state => state.bookmakers.bookmakers)

	const page = useSelector<AppStateType, number>(state => state.app.paginationObject.bookmakers.page)
	const limit = useSelector<AppStateType, number>(state => state.app.paginationObject.bookmakers.limit)


	useEffect(() => {
		dispatch(getBookmakersFromServer(page, limit))		
	}, [page, limit]);


	return (
		bookmakers[0].id ?
		<Bookmakers
			bookmakers={bookmakers}
		/> : <></>
	)
}

export default BookmakersContainer;