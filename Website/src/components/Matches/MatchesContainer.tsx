import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { AppStateType } from '../../types/types'
import Matches from './Matches'

import { MatchType } from '../../types/matches'
import { getMatchesFromServer } from '../../redux/matches-reducer'

const MatchesContainer: FC = ({ ...props }) => {
	const matches = useSelector<AppStateType, Array<MatchType>>(state => state.matches.matches)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getMatchesFromServer())		
	}, []);


	return (
		<Matches
			matches={matches}
		/>
	)
}

export default MatchesContainer;