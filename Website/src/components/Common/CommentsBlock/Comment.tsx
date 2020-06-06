import React, { FC, useState, useEffect } from 'react';
import s from './CommentsBlock.module.scss';
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import userImg from '../../../assets/img/user-no-image.png'
import replyIcon from '../../../assets/img/reply-icon.png'
import LikesBlock from '../ElementStats/LikesBlock'
import SendComment from './SendComment';
import { formatDate } from '../../../utils/formatDate';
import { CommentType } from '../../../types/types';
type CommentPropsType = {
	comment: CommentType
	comments: Array<CommentType>

	sendCommentFunc: (text: string, reply_id: number) => void
}


const Comment: FC<CommentPropsType> = ({ comment, comments, sendCommentFunc, ...props }) => {
	const [replyVisible, setReplyVisible] = useState(false)
	const toggleReplyVisible = () => {
		setReplyVisible(!replyVisible)
	}
	let replyBlock = [] as any
	comments.map(commentEl => {
		if (commentEl.replies_to === comment.id) {
			replyBlock.push(
				<Comment
					comment={commentEl}
					comments={comments}
					sendCommentFunc={sendCommentFunc}
			/>)
		}
	})


	const replyBtnRef = React.createRef<HTMLDivElement>()
	const commentFieldRef =  React.createRef<HTMLDivElement>()
	useEffect(() => {
		document.addEventListener('click', (e: any) => {
			if (replyBtnRef.current && !replyBtnRef.current.contains(e.target) && commentFieldRef.current && !commentFieldRef.current.contains(e.target)) {
				setReplyVisible(false)
				e.stopPropagation()
			}
		})
		return () => {
			document.removeEventListener('click', () => { })
		};
	}, [replyVisible]);

	return (
		<div className={classNames(s.comment, { [s.reply]: comment.replies_to, [s.lastReply]: !comment.replies_to })}>
			
			<div className={s.commentHeader}>
				<Link to={`/forecasters/${comment.user_id}`}><img src={userImg} alt="user-img" /></Link>

				<div className={s.info}>
					<Link to={`/forecasters/${comment.user_id}`} className={s.nickName}>{comment.user_name}</Link>
					<div className={s.replyBlock}>
						<img src={replyIcon} alt="reply-icon" className={s.replyImg} />
						<div className={s.replyNickname}>{comment.replies_to_name}</div>
						<div className={s.date}>{formatDate(comment.created_at)}</div>
					</div>
				</div>
				<LikesBlock likes={comment.rating} elementType={'comment'} id={comment.id}/>
			</div>
			<div className={s.contentText}>{comment.text}</div>
			<div className={s.replyBtn} onClick={toggleReplyVisible} ref={replyBtnRef}><button>Ответить</button></div>
			{replyVisible &&
				<SendComment
				active={true}
				replyCommentId={comment.id as any}
				toggleReplyVisible={toggleReplyVisible}
				sendCommentFunc={sendCommentFunc}
				
				commentFieldRef={commentFieldRef}
				/>}

			{replyBlock.length ? <div className={s.repliesBlock}>
				{[...replyBlock]}
			</div> : null}

		</div>
	)
}
export default Comment;