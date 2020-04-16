import React, { FC } from 'react';
import { useDispatch, useSelector} from "react-redux";
import { AppStateType, CommentType } from '../../types/types'
import Comments from './Comments'

import { toggleCommentsBlockVisibility } from '../../redux/app-reducer'


const CommentsContainer: FC = ({ ...props }) => {
	const comments = useSelector<AppStateType, Array<CommentType>>(state => state.liveComments.comments);
	const isCommentsBlockVisible = useSelector<AppStateType, boolean>(state => state.app.isCommentsBlockVisible);


	const dispatch = useDispatch()
	const toggleCommentsBlockVisibilityDispatch = () => {
		dispatch(toggleCommentsBlockVisibility())
	}

	return (
		<Comments
			comments={comments}
			isCommentsBlockVisible={isCommentsBlockVisible}
			toggleCommentsBlockVisibility={toggleCommentsBlockVisibilityDispatch}
		/>
	)
}

export default CommentsContainer;