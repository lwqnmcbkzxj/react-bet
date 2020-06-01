import React, { FC } from 'react'
import s from './Article.module.scss';
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from '../../types/types'
import { ArticleType } from '../../types/article'
import Breadcrumbs from '../Common/Breadcrumbs/Breadcrumbs'
import ElementStats from '../Common/ElementStats/ElementStats';
import GoBackBlock from '../Common/GoBackBlock/GoBackBlock'
import articleImg from '../../assets/img/article-img.png'
import CommentsBlock from '../Common/CommentsBlock/CommentsBlock';
import { formatDate } from '../../utils/formatDate';


type ArticlePropsType = {
	article: ArticleType

	refreshComments: () => void
}
function createMarkup(htmlText: string) {
	return { __html: htmlText };
}
const Article: FC<ArticlePropsType> = ({ article, refreshComments, ...props }) => {
	return (
		<div className={s.articlePage}>
			<GoBackBlock
				link={'articles'}
				linkText={'Статьи'}
			/>

			<Breadcrumbs pathParams={[
				{ text: 'Главная', link: "" },
				{ text: 'Статьи', link: "/articles" },
				{ text: article.title, link: `/articles/${article.id}` }]} />

			<div className={s.article}>
				<div className={s.articleHeader}>
					<div className={s.rightBlock}>
						<div className={s.categoryName}>{article.category_name}</div>
						<div className={s.nickname}>{article.created_by_login}</div>


					</div>
					<div className={s.date}>{formatDate(article.created_at)}</div>
				</div>
				<div className={s.articleTitle}>{article.title}</div>
				{article.image && <img src={article.image} alt="article-img" />}
				<div className={s.articleText} dangerouslySetInnerHTML={{ __html: article.content }}></div>

				<ElementStats
					comments={article.count_comments}
					favourites={0}
					likes={article.rating}

					showComments={false}
					showFavourites={false}

					id={article.id}
					elementType='article' />
			</div>
			<CommentsBlock
				comments={article.comments as any}
				elementId={article.id}
				type="posts"

				refreshComments={refreshComments}
			/>

		</div>
	)
}

export default Article;