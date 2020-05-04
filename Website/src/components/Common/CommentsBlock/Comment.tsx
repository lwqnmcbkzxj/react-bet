import React, { FC, useState } from 'react';
import s from './CommentsBlock.module.scss';
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import userImg from '../../../assets/img/mainpage-users-img.png'
import replyIcon from '../../../assets/img/reply-icon.png'
import LikesBlock from '../ElementStats/LikesBlock'
import SendComemnt from './SendComment';
type CommentPropsType = {
	comment: any
	isReply?: boolean
}


const Comment: FC<CommentPropsType> = ({ comment, isReply = false, ...props }) => {
	const [replyVisible, setReplyVisible] = useState(false)
	const toggleReplyVisible = () => {
		setReplyVisible(!replyVisible)
	}
	let replyBlock = [] as any
	if (comment.comments) {
		for (let commentElem  of comment.comments) {
			replyBlock.push(<Comment comment={commentElem} isReply={true}/>)
		}
	}

	return (
		<div className={classNames(s.comment, { [s.reply]: isReply, [s.lastReply]: !comment.comments })}>
			
			<div className={s.commentHeader}>
				<Link to="/forecasters/1"><img src={userImg} alt="user-img" /></Link>

				<div className={s.info}>
					<Link to="/forecasters/1" className={s.nickName}>{comment.nickname}</Link>
					<div className={s.replyBlock}>
						<img src={replyIcon} alt="reply-icon" className={s.replyImg} />
						<div className={s.replyNickname}>Никнейм</div>
						<div className={s.date}>вчера в 16:58</div>
					</div>
				</div>
				<LikesBlock likes={5} elementType={'comment'} id={1}/>
				{/* <LikesBlock likes={comment.likes} elementType={'comment'} id={comment.id}/> */}
			</div>
			<div className={s.contentText}>
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
				labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
				et ea rebum. Stet clita kasd gubergren, no sea.
			</div>
			<div className={s.replyBtn} onClick={toggleReplyVisible}><button>Ответить</button></div>
			{replyVisible && <SendComemnt active={true} replyCommentId={1} toggleReplyVisible={toggleReplyVisible}/>}

			{[...replyBlock]}

		</div>
	)
}
export default Comment;