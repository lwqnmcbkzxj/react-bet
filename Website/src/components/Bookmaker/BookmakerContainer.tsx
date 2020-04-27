import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { AppStateType } from '../../types/types'
import Bookmakers from './Bookmaker'

import { BookmakerType } from '../../types/bookmakers'


const BookmakerContainer: FC = ({ ...props }) => {
	const bookmaker = useSelector<AppStateType, BookmakerType>(state => state.bookmakers.currentBookmaker)

	const dispatch = useDispatch()

	return (
		<Bookmakers
			bookmaker={bookmaker}
		/>
	)
}

export default BookmakerContainer;