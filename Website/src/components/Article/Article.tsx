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
import { apiURL } from '../../api/api';
import SimilarArticles from './SimilarArticles/SimilarArticles'

type ArticlePropsType = {
	article: ArticleType
	similarArticles: Array<ArticleType>

	commentsFunctions: {
		refreshComments: () => void
		commentFilter: string
		setCommentFilter: (filterName: any) => void
	}
}

const Article: FC<ArticlePropsType> = ({ article, commentsFunctions, similarArticles, ...props }) => {
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
				{article.image && <img src={apiURL + article.image} alt="article-img" />}
				<div className={s.articleText} dangerouslySetInnerHTML={{ __html: article.content }}></div>

				<ElementStats
					likes={article.rating}
					likesActive={article.vote}

					comments={article.count_comments}
					showComments={false}

					favourites={0}
					showFavourites={false}

					id={article.id}
					elementType='article'
				/>
			</div>
			<SimilarArticles articles={similarArticles}/>
			<CommentsBlock
				comments={article.comments as any}
				elementId={article.id}
				type="posts"
				commentsFunctions={commentsFunctions}
			/>

		</div>
	)
}

export default Article;