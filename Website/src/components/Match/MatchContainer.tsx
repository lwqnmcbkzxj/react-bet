import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { AppStateType } from '../../types/types'
import Matches from './Match'

import { MatchType } from '../../types/matches'
// import { getMatchFromServer } from '../../redux/matches-reducer'

const MatchesContainer: FC = ({ ...props }) => {
	const match = useSelector<AppStateType, MatchType>(state => state.matches.currentMatch)

	const dispatch = useDispatch()

	useEffect(() => {
		// dispatch(getMatchFromServer())		
	}, []);


	return (
		<Matches
			match={match}
		/>
	)
}

export default MatchesContainer;