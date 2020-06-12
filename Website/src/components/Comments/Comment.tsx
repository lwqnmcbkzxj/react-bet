import React, { FC, useEffect, useState } from 'react';
import s from './Comments.module.scss';
import { Link } from 'react-router-dom';
import { CommentType } from '../../types/types'
import { getTimeSinceSending } from '../../utils/commentTime'
import { apiURL } from '../../api/api';

import userImgHolder from '../../assets/img/user-no-image.png'

type CommentPropsType = {
	comment: CommentType
}
const Comment: FC<CommentPropsType> = ({ comment, ...props }) => {
	let referentLink = comment.reference_to
	if (referentLink === 'posts')
		referentLink = 'articles'
	return (
		<div className={s.comment}>
			<div className={s.commentInfo}>
				<Link className={s.commentatorInfo} to={`/forecasters/${comment.user_id}`}>
					<img src={comment.user_avatar ? apiURL + comment.user_avatar : userImgHolder} alt="comentatorImg" />
					<div className={s.comentatorName}>{comment.user_name}</div>

				</Link>
				<p className={s.publishDate}>{getTimeSinceSending(Date.parse(comment.created_at))}</p>
			</div>
			<p className={s.text}>{comment.text}</p>
			<Link to={`/${referentLink}/${comment.referent_id}`}><p className={s.articleName}>{comment.referent_title}</p></Link>
		</div>
	)
}
export default Comment;
