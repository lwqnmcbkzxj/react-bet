import React, { FC } from 'react';
import s from './Comments.module.css';
import { CommentType } from '../../types/types'
import LiveBtn from '../Header/LiveBtn/LiveBtn';
import Comment from './Comment'

type CommentsPropsType = {
	comments: Array<CommentType>,
	isCommentsBlockVisible: boolean
	toggleCommentsBlockVisibility: () => void
}

const Comments: FC<CommentsPropsType> = ({ comments, isCommentsBlockVisible, toggleCommentsBlockVisibility, ...props }) => {
	// Comments or toggle button
	let renderBlock
	if (isCommentsBlockVisible) {
		renderBlock = comments.map(comment => <Comment key={comment.id} comment={comment} />)
	} else {
		renderBlock = <LiveBtn toggleCommentsBlockVisibility={toggleCommentsBlockVisibility} />
	}
	return (
		<div className={s.commentsHolder}>
			<div className={s.comments}>
				{renderBlock}
			</div>
		</div>
	)
}

export default Comments;