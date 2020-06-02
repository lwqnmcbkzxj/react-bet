package com.bettinghub.forecasts

import android.content.Context
import androidx.lifecycle.MutableLiveData
import com.bettinghub.forecasts.models.Sport
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers

class Constants(val context: Context) {
    val topForecastersCount = 15
    val lastForecastsCount = 5
    val topMatchesCount = 5
    val topBookmakerCount = 10
    val matchesPerPage = 10
    val forecastsPerPage = 10
    val newsPerPage = 15
    val minBetBankPer = 0.005f;
    val maxBetBankPer = 0.05f;

    val serverTimePattern = "yyyy-MM-dd HH:mm:ss"
    val appTimePattern = "yyyy.MM.dd в HH:mm"

    val sports = MutableLiveData<List<Sport>?>(null)

    init {
        App.appComponent.getBackend().api.sport()
            .subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe({
                val l = ArrayList<Sport>()

                l.add(Sport(0, context.getString(R.string.allSports)))
                l.addAll(it)

                l.sortedWith(Comparator { o1, o2 ->  o1.id.compareTo(o2.id)})

                sports.value = l
            }, {
                sports.value = listOf(Sport(0, context.getString(R.string.allSports)))
            })
    }
}
