package com.xbethub.webview.ui.home

import android.annotation.SuppressLint
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageButton
import android.widget.SearchView
import androidx.fragment.app.Fragment
import androidx.navigation.NavController
import androidx.navigation.Navigation
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.App
import com.xbethub.webview.R
import com.xbethub.webview.backend.BettingHubBackend
import com.xbethub.webview.backend.requests.ForecastsListRequest
import com.xbethub.webview.enums.Sport
import com.xbethub.webview.enums.TimeInterval
import com.xbethub.webview.models.Forecast
import com.xbethub.webview.ui.forecasts.items.ForecastListener
import com.xbethub.webview.ui.home.recycler_view_adapters.ItemDecoration
import com.xbethub.webview.ui.home.recycler_view_adapters.LastForecastsTableAdapter
import com.xbethub.webview.ui.home.recycler_view_adapters.TopUsersTableAdapter
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class HomeFragment : Fragment(), View.OnClickListener, ForecastListener {

    lateinit var navController: NavController
    lateinit var topUsersTable: RecyclerView
    lateinit var lastForecastsTable: RecyclerView
    private val forecasts = ArrayList<Forecast>()
    var searchBarState: Boolean = false //inactive
    override fun onCreateView(
            inflater: LayoutInflater,
            container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View? {

        return inflater.inflate(R.layout.fragment_home, container, false)
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        navController = activity?.let { Navigation.findNavController(it, R.id.nav_host_fragment) }!!
        topUsersTable = view?.findViewById<RecyclerView>(R.id.top_users_list) !!
        lastForecastsTable = view?.findViewById<RecyclerView>(R.id.last_forecasts_table) !!
        topUsersTable.apply {
            setHasFixedSize(true)
            adapter = TopUsersTableAdapter(Array<String>(
                5
            ) { i -> i.toString()})
        }


        lastForecastsTable.addItemDecoration(ItemDecoration(resources.getDimensionPixelSize(R.dimen.homeForecastTopSpace)
            , resources.getDimensionPixelSize(R.dimen.homeForecastBottomSpace)))

//        lastForecastsTable.apply {
//            setHasFixedSize(true)
//            val manager = LinearLayoutManager(context, LinearLayoutManager.VERTICAL, false)
//            manager.isAutoMeasureEnabled = true
//            layoutManager = manager
////            layoutManager = SpanningLinearLayoutManager(context, LinearLayoutManager.VERTICAL, false)
//            adapter = LastForecastsTableAdapter(Array<String>(
//                5
//            ) { i -> i.toString()})
//        }
        view?.findViewById<ImageButton>(R.id.search_button)?.setOnClickListener(this)
        view?.findViewById<Button>(R.id.see_all_forecasts)?.setOnClickListener(this)
        view?.findViewById<Button>(R.id.see_all_top_users_button)?.setOnClickListener(this)
        getLastForecasts()
//        getUser()
    }

    @SuppressLint("CheckResult")
    private fun getLastForecasts() {
        val forecastsListRequest = ForecastsListRequest(0, 5, timeInterval = TimeInterval.ALL.backendValue, sport = Sport.ALL.backendValue, useSubscribes = 0, useFavorites = 0)
        BettingHubBackend().api.forecastList(forecastsListRequest)
            .subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe({
                forecasts.clear()
                forecasts.addAll(it)
                for (forecast in forecasts) {
                    Log.i("Forecasts", forecast.toString())
                }
                lastForecastsTable.apply {
                    setHasFixedSize(true)
                    val manager = LinearLayoutManager(context, LinearLayoutManager.VERTICAL, false)
                    manager.isAutoMeasureEnabled = true
                    layoutManager = manager
//            layoutManager = SpanningLinearLayoutManager(context, LinearLayoutManager.VERTICAL, false)
                    adapter = LastForecastsTableAdapter(forecasts, forecastListener = this@HomeFragment)

                }
//                forecastsLiveData.value = forecasts
            }, {
                Log.e("Forecast", it.message ?: "WTF?!")
                it.printStackTrace()
            })

    }

    override fun onClick(v: View?) {
        when (v?.id) {
            R.id.search_button -> searchButton(v as ImageButton)
            R.id.see_all_forecasts -> navController.navigate(R.id.toForecastFragment)
            R.id.see_all_top_users_button -> navController.navigate(R.id.toForecasterRatingFragment)
        }
    }
    private fun searchButton(button: ImageButton) {
        searchBarState = !searchBarState
        button.setImageResource(if (searchBarState) R.drawable.ic_search_enabled
                                else R.drawable.ic_search_disabled)
        view?.findViewById<SearchView>(R.id.searchField)?.visibility =
            if (searchBarState) View.VISIBLE else View.GONE
    }
    override fun onForecastClick(forecast: Forecast, position: Int) {
        navController.navigate(HomeFragmentDirections.toForecastFragment(forecast))
    }
}
