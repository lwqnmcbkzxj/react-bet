package com.bettinghub.forecasts.ui.article

import androidx.lifecycle.MediatorLiveData
import androidx.lifecycle.MutableLiveData
import com.bettinghub.forecasts.BaseViewModel
import com.bettinghub.forecasts.Event
import com.bettinghub.forecasts.models.Article

class ArticleViewModel: BaseViewModel() {

    val id = MutableLiveData<Int>()
    val article = MediatorLiveData<Event<Article>>()
    val articles = MediatorLiveData<Event<List<Article>>>()

    init {
        article.addSource(id) {
            requestWithLiveData(article
                , { backendAPI.article(it) }
                , {
                    it
                }
            )
        }
        appData.articles?.let {
            articles.value = Event.success(appData.articles)
        } ?: run {
            requestWithLiveData(articles
                , { backendAPI.articles() }
                , {
                    appData.articles = it.data
                    it.data
                }
            )
        }
    }

}
