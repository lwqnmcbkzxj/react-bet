import React, { FC, useState, useEffect } from 'react';
import s from './CommentsBlock.module.scss';
import SendComment from './SendComment'
import Comment from './Comment'
import { CommentType } from '../../../types/types';
import { sendComment, deleteComment } from '../../../redux/comments-reducer'

import { useDispatch, useSelector } from "react-redux"

import { getForecastComments } from '../../../redux/forecasts-reducer'
import BorderedSelectors from '../Selectors/BorderedSelector/BorderedSelector';

import { CommentsEnum } from '../../../types/types'

type CommentsBlockPropsType = {
	comments: Array<CommentType>

	type: string
	elementId: number

	commentsFunctions: {
		refreshComments: () => void
		commentFilter: string
		setCommentFilter: (filterName: any) => void
	}
}

const CommentsBlock: FC<CommentsBlockPropsType> = ({ type, elementId, comments = [], commentsFunctions, ...props }) => {
	const dispatch = useDispatch()


	const handleTabChange = (tabName: any) => {
		commentsFunctions.setCommentFilter(tabName)
	}
	
	
	let commentsWord = ""
	if (comments.length === 1)
		commentsWord = 'комментарий'
	else if (comments.length >= 2 && comments.length <= 4)
		commentsWord = 'комментария'
	else
		commentsWord = 'комментариев'


	const sendCommentDispatch = async (text: string, reply_id?: number) => {
		await dispatch(sendComment(elementId, type, text, reply_id))
		commentsFunctions.refreshComments()
	}

	const deleteCommentDispatch = async (comment_id: number) => {
		await dispatch(deleteComment(comment_id))
		commentsFunctions.refreshComments()
	}



	return (
		<div className={s.commentsBlock}>
			<div className={s.commentsHeader}>{comments.length} {commentsWord}</div>

			<BorderedSelectors
				listName="commentsSelector"
				changeVisibleTab={handleTabChange}
				selectors={[
					{ name: CommentsEnum.rating, text: "По популярности" },
					{ name: CommentsEnum.by_order, text: "По порядку" },
				]}
				initialValue={commentsFunctions.commentFilter}
			/>
			
			<SendComment sendCommentFunc={sendCommentDispatch} style={{ marginTop: '20px' }}/>

			{comments.map((comment, counter) =>
				!comment.replies_to &&
				<Comment
					comment={comment}
					comments={comments}
					key={counter}

					deleteCommentFunc={deleteCommentDispatch}
					sendCommentFunc={sendCommentDispatch}
				/>
			)}

			{comments.length > 0 && <SendComment active={true} sendCommentFunc={sendCommentDispatch} />}
			{comments.length === 0 && <div className={s.noComments}>Дискуссия еще не началась,	оставьте первый комментарий</div>}
		</div>
	)
}
export default CommentsBlock;