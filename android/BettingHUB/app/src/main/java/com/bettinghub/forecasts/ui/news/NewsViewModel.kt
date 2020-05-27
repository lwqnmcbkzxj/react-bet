package com.bettinghub.forecasts.ui.news

import android.annotation.SuppressLint
import androidx.lifecycle.MutableLiveData
import com.bettinghub.forecasts.BaseViewModel
import com.bettinghub.forecasts.Event
import com.bettinghub.forecasts.models.News
import io.reactivex.Completable
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers
import java.util.concurrent.TimeUnit

class NewsViewModel: BaseViewModel() {
    var page = 1
    val newsLiveData = MutableLiveData<Event<List<News>>>()

    @SuppressLint("CheckResult")
    override fun onCreate() {
        super.onCreate()

        newsLiveData.value = Event.loading()

        Completable.create {
            it.onComplete()
        }.delay(2, TimeUnit.SECONDS)
        .subscribeOn(Schedulers.io())
        .observeOn(AndroidSchedulers.mainThread())
        .subscribe({
            newsLiveData.value = Event.success(List(consts.newsPerPage) { News() })
        }, {
            it.printStackTrace()
        })
    }

    @SuppressLint("CheckResult")
    fun onShowMoreClick() {
        page++

        newsLiveData.value = Event.loading()

        Completable.create {
            it.onComplete()
        }.delay(2, TimeUnit.SECONDS)
            .subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe({
                newsLiveData.value = Event.success(List(consts.newsPerPage) { News() })
            }, {
                it.printStackTrace()
            })
    }
}
