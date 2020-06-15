import React, { FC, useState, useEffect } from 'react';
import s from './CommentsBlock.module.scss';
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import replyIcon from '../../../assets/img/reply-icon.png'
import LikesBlock from '../ElementStats/LikesBlock'
import SendComment from './SendComment';
import { formatDate } from '../../../utils/formatDate';
import { CommentType, AppStateType } from '../../../types/types';
import { apiURL } from '../../../api/api';
import { getUserImg } from '../../../utils/getUserImg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { UserType } from '../../../types/me';
import { deleteComment } from '../../../redux/comments-reducer';


type CommentPropsType = {
	comment: CommentType
	comments: Array<CommentType>

	sendCommentFunc: (text: string, reply_id: number) => void
	deleteCommentFunc: (comment_id: number) => void
}


const Comment: FC<CommentPropsType> = ({ comment, comments, sendCommentFunc, deleteCommentFunc, ...props }) => {
	const loggedUser = useSelector<AppStateType, UserType>(state => state.me.userInfo)

	const [replyVisible, setReplyVisible] = useState(false)
	const toggleReplyVisible = () => {
		setReplyVisible(!replyVisible)
	}
	const [optionsVisible, setOptionsVisible] = useState(false)
	const toggleOptionsVisible = () => {
		setOptionsVisible(!optionsVisible)
	}


	let replyBlock = [] as any
	comments.map(commentEl => {
		if (commentEl.replies_to === comment.id) {
			replyBlock.push(
				<Comment
					comment={commentEl}
					comments={comments}
					sendCommentFunc={sendCommentFunc}
					deleteCommentFunc={deleteCommentFunc}
			/>)
		}
	})


	const actionsBlockRef = React.createRef<HTMLDivElement>()
	const commentFieldRef =  React.createRef<HTMLDivElement>()
	useEffect(() => {
		document.addEventListener('click', (e: any) => {
			if (actionsBlockRef.current && !actionsBlockRef.current.contains(e.target) && commentFieldRef.current && !commentFieldRef.current.contains(e.target)) {
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
				<Link to={`/forecasters/${comment.user_id}`}>
					<img src={getUserImg(comment.user_avatar)} alt="user-img" />
				</Link>

				<div className={s.info}>
					<Link to={`/forecasters/${comment.user_id}`} className={s.nickName}>{comment.user_name}</Link>
					<div className={s.replyBlock}>
						<img src={replyIcon} alt="reply-icon" className={s.replyImg} />
						<div className={s.replyNickname}>{comment.replies_to_name}</div>
						<div className={s.date}>{formatDate(comment.created_at)}</div>
					</div>
				</div>
				<LikesBlock likes={comment.rating} elementType={'comment'} id={comment.id} likesActive={comment.vote}/>
			</div>
			<div className={s.contentText}>{comment.text}</div>


			<div className={s.commentActions} ref={actionsBlockRef}>
				<div className={s.replyBtn} onClick={toggleReplyVisible}><button>Ответить</button></div>
				{comment.user_id === loggedUser.id && <div className={s.commentOptions}>
					<button onClick={toggleOptionsVisible}><FontAwesomeIcon icon={faEllipsisH}/></button>
				</div>}

				{optionsVisible && 
					<div className={s.optionsPopup} >
						<button onClick={() => { deleteCommentFunc(comment.id) }}>Удалить</button>
					</div>}
			</div>
			
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