import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { AppStateType } from '../../types/types'
import Matches from './Matches'

import { MatchType } from '../../types/matches'
import { getMatchesFromServer } from '../../redux/matches-reducer'

const MatchesContainer: FC = ({ ...props }) => {
	const dispatch = useDispatch()
	const matches = useSelector<AppStateType, Array<MatchType>>(state => state.matches.matches)

	const page = useSelector<AppStateType, number>(state => state.app.paginationObject.matches.page)
	const limit = useSelector<AppStateType, number>(state => state.app.paginationObject.matches.limit)


	useEffect(() => {
		dispatch(getMatchesFromServer(page, limit))		
	}, [page, limit]);
	

	return (
		<Matches
			matches={matches}
		/>
	)
}

export default MatchesContainer;