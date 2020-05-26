package com.bettinghub.forecasts.ui.articles

import androidx.lifecycle.MutableLiveData
import com.bettinghub.forecasts.BaseViewModel
import com.bettinghub.forecasts.Event
import com.bettinghub.forecasts.models.Article

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
