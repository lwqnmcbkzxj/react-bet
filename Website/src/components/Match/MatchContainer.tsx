import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { AppStateType, SportType } from '../../types/types'
import Matches from './Match'

import { MatchType } from '../../types/matches'
import { getMatchFromServer } from '../../redux/matches-reducer'
import { withRouter, RouteComponentProps  } from 'react-router'


interface MatchParams {
    matchId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}


const MatchContainer: FC<Props> = ({ ...props }) => {
	const dispatch = useDispatch()
	const match = useSelector<AppStateType, MatchType>(state => state.matches.currentMatch)

	let matchId = props.match.params.matchId ? props.match.params.matchId : 1;

	useEffect(() => {
		dispatch(getMatchFromServer(+matchId))		
	}, []);


	return (
		<Matches
			match={match}
		/>
	)
}

export default withRouter(MatchContainer);