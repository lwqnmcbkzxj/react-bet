import React, { FC, useState } from 'react';
import s from './CommentsBlock.module.scss';
import '../../App.scss'

type CommentsBlockPropsType = {
}
const CommentsBlock: FC<CommentsBlockPropsType> = ({ ...props }) => {
	return (
		<div className={s.commentsBlock}>
			<div className="commentsCount">16 комментариев</div>
			<input type="text" placeholder="Написать комментарий"/>
		</div>
	)
}
export default CommentsBlock;