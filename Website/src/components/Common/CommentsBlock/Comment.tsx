import React, { FC, useState } from 'react';
import s from './CommentsBlock.module.scss';
import classNames from 'classnames'
import userImg from '../../../assets/img/mainpage-users-img.png'
import replyIcon from '../../../assets/img/reply-icon.png'
type CommentPropsType = {
	comment: any
	isReply?: boolean
}


const Comment: FC<CommentPropsType> = ({ comment, isReply = false, ...props }) => {
	let replyBlock = [] as any
	if (comment.comments) {
		for (let commentElem  of comment.comments) {
			replyBlock.push(<Comment comment={commentElem} isReply={true}/>)
		}
	}

	return (
		<div className={classNames(s.comment, {[s.reply]: isReply,[s.lastReply]: !comment.comments })}>
			<div className={s.commentHeader}>
				<img src={userImg} alt="user-img" />

				<div className={s.info}>
					<div className={s.nickName}>{comment.nickname}</div>
					<div className={s.replyBlock}>
						<img src={replyIcon} alt="reply-icon" className={s.replyImg} />
						<div className={s.replyNickname}>Никнейм</div>
						<div className={s.date}>вчера в 16:58</div>
					</div>
				</div>
				<div className={s.likes}>LIKES</div>
			</div>
			<div className={s.contentText}>
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
				labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
				et ea rebum. Stet clita kasd gubergren, no sea.
			</div>
			<div className={s.replyBtn}><button>Ответить</button></div>

			{[...replyBlock]}

		</div>
	)
}
export default Comment;