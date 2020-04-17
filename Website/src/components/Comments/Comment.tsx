import React, { FC } from 'react';
import s from './Comments.module.css';
import { NavLink } from 'react-router-dom';
import { CommentType } from '../../types/types'
import { getTimeSinceSending } from '../../utils/commentTime'

type CommentPropsType = {
	comment: CommentType
}
const Comment: FC<CommentPropsType> = ({ comment, ...props }) => {

	return (
		<div className={s.comment}>
			<div className={s.commentInfo}>
				<NavLink className={s.commentatorInfo} to={`/users/${comment.userId}`}>
					<img src={comment.userImg} alt="comentatorImg" />
					<div className={s.comentatorName}>{comment.userName}</div>

				</NavLink>
				<p className={s.publishDate}>{getTimeSinceSending(comment.publishDate)}</p>
			</div>
			<p className={s.text}>{comment.text}</p>
			<p className={s.articleName}>{comment.articleName}</p>
		</div>
	)
}
export default Comment;
