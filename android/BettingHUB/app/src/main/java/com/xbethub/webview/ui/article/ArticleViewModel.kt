package com.xbethub.webview.ui.article

import androidx.lifecycle.LiveData
import androidx.lifecycle.MediatorLiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Transformations
import com.xbethub.webview.BaseViewModel
import com.xbethub.webview.Event
import com.xbethub.webview.models.Article

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
