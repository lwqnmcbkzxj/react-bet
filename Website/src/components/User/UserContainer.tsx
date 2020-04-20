import React, { FC } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { AppStateType } from '../../types/types'
import { UserType } from '../../types/users'

import User from './User'
import { withRouter, RouteComponentProps  } from 'react-router'

interface MatchParams {
    userId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const UsersContainer: FC<Props> = ({ ...props }) => {
	const user = useSelector<AppStateType, UserType>(state => state.users.currentUser)

	let userId = props.match.params.userId ? props.match.params.userId : 1;

	return (
		<User
			user={user}
		/>
	)
}

export default withRouter(UsersContainer);