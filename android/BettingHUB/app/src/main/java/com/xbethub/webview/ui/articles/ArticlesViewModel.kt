package com.xbethub.webview.ui.articles

import androidx.lifecycle.MutableLiveData
import com.xbethub.webview.BaseViewModel
import com.xbethub.webview.Event
import com.xbethub.webview.models.Article

class ArticlesViewModel: BaseViewModel() {

    val articles = MutableLiveData<Event<List<Article>>>()

    init {
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
