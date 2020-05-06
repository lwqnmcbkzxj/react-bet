import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { AppStateType } from '../../types/types'
import Bookmakers from './Bookmaker'

import { BookmakerType } from '../../types/bookmakers'
import { withRouter, RouteComponentProps  } from 'react-router'
import { getBookmakerFromServer } from '../../redux/bookmakers-reducer'
interface MatchParams {
    bookmakerId: string;
}

interface BookmakerProps extends RouteComponentProps<MatchParams> {}

const BookmakerContainer: FC<BookmakerProps> = ({ ...props }) => {
	const bookmaker = useSelector<AppStateType, BookmakerType>(state => state.bookmakers.currentBookmaker)
	let bookmakerId = props.match.params.bookmakerId ? props.match.params.bookmakerId : 1;
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getBookmakerFromServer(+bookmakerId))		
	}, []);

	return (
		<Bookmakers
			bookmaker={bookmaker}
		/>
	)
}

export default withRouter(BookmakerContainer);