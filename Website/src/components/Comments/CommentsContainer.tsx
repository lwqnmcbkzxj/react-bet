import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppStateType, CommentType } from '../../types/types'
import Comments from './Comments'

import { toggleCommentsBlockVisibility, } from '../../redux/app-reducer'
import { getLiveComments } from '../../redux/comments-reducer'

const CommentsContainer: FC = ({ ...props }) => {
	const dispatch = useDispatch()
	const comments = useSelector<AppStateType, Array<CommentType>>(state => state.comments.liveComments);
	const isGetting = useSelector<AppStateType, boolean>(state => state.comments.isGetting);
	const isCommentsBlockVisible = useSelector<AppStateType, boolean>(state => state.app.isCommentsBlockVisible);


	useEffect(() => {
		setTimeout(() => {
			if (!isGetting) {
				getComments()
			}
			let interval = setInterval(() => {
				getComments()
			}, 30000);

			return () => clearInterval(interval);
		}, 2000)
	}, [isGetting]);


	const getComments = () => {
		let currentDate = Date.now()
		dispatch(getLiveComments(currentDate))
	}

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