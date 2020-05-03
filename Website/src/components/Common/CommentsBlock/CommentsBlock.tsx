import React, { FC, useState } from 'react';
import s from './CommentsBlock.module.scss';
import SendComment from './SendComment'
import Comment from './Comment'
type CommentsBlockPropsType = {
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

const CommentsBlock: FC<CommentsBlockPropsType> = ({ ...props }) => {
	let comments = [{
		nickname: "Никнейм-1",
		comments: [
			{
				nickname: "Никнейм-1-ответ",
				comments: [
					{
						nickname: "Никнейм-1-ответ-ответ",
					}
				]
			}
		]
	},
	{
		nickname: "Никнейм-2",
	},
	{
		nickname: "Никнейм-3",
	},
	{
		nickname: "Никнейм-4",
	},
	{
		nickname: "Никнейм-5",
	},]

	return (
		<div className={s.commentsBlock}>
			<div className={s.commentsHeader}>{getComemntsLength(comments)} комментариев</div>
			<SendComment />

			{comments.map((comment, counter) =>
				<Comment
					comment={comment}
					key={counter}

				/>
			)}

			{comments.length > 0 && <SendComment />}
		</div>
	)
}
export default CommentsBlock;