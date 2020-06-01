import React, { FC, useState } from 'react';
import s from './CommentsBlock.module.scss';
import SendComment from './SendComment'
import Comment from './Comment'
import { CommentType } from '../../../types/types';
import { toggleAuthFormVisiblility, sendComment } from '../../../redux/app-reducer'

import { useDispatch, useSelector } from "react-redux"

import { getForecastComments } from '../../../redux/forecasts-reducer'

type CommentsBlockPropsType = {
	comments: Array<CommentType>

	type: string
	elementId: number
	refreshComments: () => void
}

const getComemntsLength = (comments: any) => {
	let commentsCounter = 0;
	if (comments.length)
		for (let comment of comments) {
			commentsCounter++;

			if (comment.comments) {
				commentsCounter += getComemntsLength(comment.comments)
			}
		}
	return commentsCounter
}

const CommentsBlock: FC<CommentsBlockPropsType> = ({ type, elementId, refreshComments, comments = [], ...props }) => {
	const dispatch = useDispatch()

	let commentsWord = ""
	if (comments.length === 1)
		commentsWord = 'комментарий'
	else if (comments.length >= 2 && comments.length <= 4)
		commentsWord = 'комментария'
	else 
		commentsWord = 'комментариев'
	

	const sendCommentDispatch = async (text: string, reply_id?: number) => {
		await dispatch(sendComment(elementId, type, text, reply_id))
		refreshComments()
	}
	
	
		
	return (
		<div className={s.commentsBlock}>
			<div className={s.commentsHeader}>{comments.length} {commentsWord}</div>
			<SendComment sendCommentFunc={sendCommentDispatch} />

			{comments.map((comment, counter) =>
				!comment.replies_to &&
				<Comment
					comment={comment}
					comments={comments}
					key={counter}

					
					sendCommentFunc={sendCommentDispatch}
				/>
			)}

			{comments.length > 0 && <SendComment active={true} sendCommentFunc={sendCommentDispatch} />}
			{comments.length === 0 && <div className={s.noComments}>Дискуссия еще не началась,	оставьте первый комментарий</div>}
		</div>
	)
}
export default CommentsBlock;