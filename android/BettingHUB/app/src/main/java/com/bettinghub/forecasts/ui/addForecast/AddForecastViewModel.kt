package com.bettinghub.forecasts.ui.addForecast

import android.annotation.SuppressLint
import androidx.lifecycle.MutableLiveData
import com.bettinghub.forecasts.BaseViewModel
import com.bettinghub.forecasts.Event
import com.bettinghub.forecasts.Utils
import com.bettinghub.forecasts.models.*
import com.bettinghub.forecasts.ui.addForecast.table.Table
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.Disposable
import io.reactivex.schedulers.Schedulers

class AddForecastViewModel: BaseViewModel() {
    val tablesLiveData = MutableLiveData<Event<List<Table>>>()
    val sportsLiveData = MutableLiveData<Event<List<Sport>>>()
    val bookmakersLiveData = MutableLiveData<Event<List<Bookmaker>>>()
    val championshipsLiveData = MutableLiveData<Event<List<Championship>>>()
    val teamsLiveData = MutableLiveData<Event<List<Team>>>()

    val betRawLiveData = MutableLiveData<Int>()
    val betPerLiveData = MutableLiveData<Float>()

    val balanceLiveData = MutableLiveData<Int>()

    private var userRequest: Disposable? = null

    private var bet: Int = 0

    @SuppressLint("CheckResult")
    override fun onCreate() {
        super.onCreate()

        val table = Table("Тоталы"
            , "5"
            , listOf("БК", "Тотал", "ИТБ1", "ИМТ1", "Еще")
            , listOf("", "1.1", "1.2", "1.3", "1.4"
                , "", "2.1", "2.2", "2.3", "2.4"
                , "", "3.1", "3.2", "3.3", "3.4"
            )
        )

        tablesLiveData.value = Event.success(listOf(table, table))

        sportsLiveData.value = Event.success(listOf(Sport(1, "Футбол")
                                                    , Sport(2, "Теннис")
                                                    , Sport(3, "Баскетбол")
                                                    , Sport(4, "Хоккей")
                                                    )
                                            )


        bookmakersLiveData.value = Event.success(listOf(Bookmaker(0, "1XСТАВКА", 0f, 0, "", "", "")
                                                        , Bookmaker(1, "BETCITY", 0f, 0, "", "", "")
                                                        , Bookmaker(2, "ЛигаСтавок", 0f, 0, "", "", "")
                                                        )

                                                )
        championshipsLiveData.value = Event.success(listOf(Championship(0, "Чемпионат-1", 0, "", "")
                                                           , Championship(0, "Чемпионат-2", 0, "", "")
                                                           , Championship(0, "Чемпионат-3", 0, "", "")
                                                            )
                                                    )

        teamsLiveData.value = Event.success(listOf(Team("Virtus Pro")
                                                   , Team("Navi")
                                                   , Team("G2")
                                                    )
                                            )

        appData.activeUser?.let {
            if (it.user == null) {
                userRequest = backendAPI.user("Bearer ${appData.activeUser?.accessToken}")
                    .subscribeOn(Schedulers.io())
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribe({
                        userRequest = null
                        appData.activeUser!!.user = it

                        it.balance?.toFloatOrNull()?.toInt()?.let {
                            bet = (consts.maxBetBankPer * it).toInt()
                            onBetRawChanged(bet)
                            balanceLiveData.value = it
                        }

                        onBetRawChanged(bet)
                    }, {
                        userRequest = null
                        it.printStackTrace()
                    })
            }
        }
    }

    override fun onDestroy() {
        super.onDestroy()

        userRequest?.dispose()
    }

    fun onBetRawChanged(value: Int) {
        appData.activeUser?.user?.balance?.toFloatOrNull()?.toInt()?.let { balance ->
            val newRawValue = Utils.clamp(value, (balance * consts.minBetBankPer).toInt(), (balance * consts.maxBetBankPer).toInt())

            bet = newRawValue
            betRawLiveData.value = bet
            betPerLiveData.value = Utils.round(bet.toFloat() / balance.toFloat() * 100f, 2)
        }
    }

    fun onBerPerChanged(value: Float) {
        appData.activeUser?.user?.balance?.toFloatOrNull()?.toInt()?.let { balance ->
            val newPerValue = Utils.clamp(value / 100f, consts.minBetBankPer ,  consts.maxBetBankPer)

            bet = (newPerValue * balance).toInt()
            betRawLiveData.value = bet
            betPerLiveData.value = newPerValue * 100f
        }
    }
}
