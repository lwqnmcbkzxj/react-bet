import React, { FC } from 'react';
import s from './Comments.module.scss';
import { Link } from 'react-router-dom';
import { CommentType } from '../../types/types'
import { getTimeSinceSending } from '../../utils/commentTime'

type CommentPropsType = {
	comment: CommentType
}
const Comment: FC<CommentPropsType> = ({ comment, ...props }) => {

	return (
		<div className={s.comment}>
			{/* <div className={s.commentInfo}>
				<Link className={s.commentatorInfo} to={`/forecasters/${comment.userId}`}>
					<img src={comment.userImg} alt="comentatorImg" />
					<div className={s.comentatorName}>{comment.userName}</div>

				</Link>
				<p className={s.publishDate}>{getTimeSinceSending(comment.publishDate)}</p>
			</div>
			<p className={s.text}>{comment.text}</p>
			<Link to={`/articles/${5}`}><p className={s.articleName}>{comment.articleName}</p></Link> */}
		</div>
	)
}
export default Comment;
