package com.xbethub.webview.ui.home

import android.annotation.SuppressLint
import android.os.Bundle
import android.util.DisplayMetrics
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.navigation.NavController
import androidx.navigation.Navigation
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.R
import com.xbethub.webview.Utils
import com.xbethub.webview.backend.requests.ForecastsRequest
import com.xbethub.webview.databinding.FragmentHomeNewBinding
import com.xbethub.webview.enums.TimeInterval
import com.xbethub.webview.models.Forecast
import com.xbethub.webview.ui.forecasts.items.ForecastListener
import com.xbethub.webview.ui.forecasts.items.items.ForecastItem
import com.xbethub.webview.ui.home.bookmakerItem.*
import com.xbethub.webview.ui.home.bookmakerItem.items.BookmakerItem
import com.xbethub.webview.ui.home.bookmakerItem.items.BookmakerTableItemBase
import com.xbethub.webview.ui.home.bookmakerItem.items.HeaderBookmakerTableItem
import com.xbethub.webview.ui.home.forecasterItem.ForecasterItem
import com.xbethub.webview.ui.home.forecasterItem.ForecasterItemAdapter
import com.xbethub.webview.ui.home.forecasterItem.ForecasterItemDecoration
import com.xbethub.webview.ui.home.forecasterItem.ForecasterItemListener
import com.xbethub.webview.ui.home.matchItem.MatchItemAdapter
import com.xbethub.webview.ui.home.matchItem.MatchItemListener
import com.xbethub.webview.ui.home.matchItem.items.HeaderMatchTableItem
import com.xbethub.webview.ui.home.matchItem.items.MatchItem
import com.xbethub.webview.ui.home.matchItem.items.MatchTableItemBase
import com.xbethub.webview.ui.home.recycler_view_adapters.ItemDecoration
import com.xbethub.webview.ui.profile.forecasts.ForecastAdapter

class HomeFragment : Fragment(), View.OnClickListener, ForecastListener, ForecasterItemListener
    , BookmakerItemListener, MatchItemListener {
    lateinit var binding: FragmentHomeNewBinding
    lateinit var navController: NavController
    lateinit var lastForecastsTable: RecyclerView
    private val forecasts = ArrayList<Forecast>()

    private var searchActive = false

    override fun onCreateView(
            inflater: LayoutInflater,
            container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View? {
        binding = FragmentHomeNewBinding.inflate(inflater)

        binding.topPanel.searchBtn.setOnClickListener { onSearchBtnClick() }
        binding.topForecasters.seeAllForecasters.setOnClickListener { onSeeAllForecastersBtnClick() }
        binding.topPanel.bankBalance.root.visibility = View.GONE

        updateSearchFieldVisibility()

        return binding.root
    }

    private fun initTopForecasters() {
        val itemSpace = resources.getDimensionPixelSize(R.dimen.forecaterItemSpace)
        val sideSpace= resources.getDimensionPixelSize(R.dimen.sideMargin)

        binding.topForecasters.forecasterRV
            .addItemDecoration(ForecasterItemDecoration(itemSpace))

        val displayMetrics = DisplayMetrics()
        requireActivity().windowManager.defaultDisplay.getMetrics(displayMetrics)

        val itemWidth = (displayMetrics.widthPixels - itemSpace * 3 - 2 * sideSpace) / 4

        val adapter = ForecasterItemAdapter(itemWidth,this)
        binding.topForecasters.forecasterRV.adapter = adapter

        val items = ArrayList<ForecasterItem>()

        for (i in 1..10) {
            items.add(ForecasterItem())
        }

        adapter.addAll(items)
    }

    private fun initTopBookmakers() {
        val items = ArrayList<BookmakerTableItemBase>()

        items.add(HeaderBookmakerTableItem())

        for (i in 0..2) {
            items.add(
                BookmakerItem(i == 2)
            )
        }

        val adapter = BookmakerItemAdapter(this)

        binding.topBookmakers.bookmakerRV.isNestedScrollingEnabled = false
        binding.topBookmakers.bookmakerRV.adapter = adapter

        adapter.addAll(items)
    }

    private fun initTopMatches() {
        val items = ArrayList<MatchTableItemBase>()

        items.add(HeaderMatchTableItem())

        for (i in 0..4) {
            items.add(
                MatchItem(i == 4)
            )
        }

        val adapter = MatchItemAdapter(this)

        binding.topMatches.matchesRV.isNestedScrollingEnabled = false
        binding.topMatches.matchesRV.adapter = adapter

        adapter.addAll(items)
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        initTopForecasters()
        initTopBookmakers()
        initTopMatches()

        navController = activity?.let { Navigation.findNavController(it, R.id.nav_host_fragment) }!!

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
//        view?.findViewById<Button>(R.id.see_all_forecasts)?.setOnClickListener(this)
//        view?.findViewById<Button>(R.id.see_all_top_users_button)?.setOnClickListener(this)
        getLastForecasts()
//        getUser()
    }

    private fun addItemDecoration() {
        val topSpace = resources.getDimensionPixelSize(R.dimen.forecastsItemTopSpace)
        val sideSpace = resources.getDimensionPixelSize(R.dimen.forecastSideMargin)
        val itemSpace = resources.getDimensionPixelSize(R.dimen.forecastsItemSpace)
        val showMoreTopSpace = resources.getDimensionPixelSize(R.dimen.forecastsShowMoreTopSpace)
        val footerTopSpace = resources.getDimensionPixelSize(R.dimen.forecastsFooterTopSpace)
        val bottomSpace = resources.getDimensionPixelSize(R.dimen.footerBottomMargin)

        binding.lastForecasts.forecastRV.addItemDecoration(
            com.xbethub.webview.ui.forecasts.items.ItemDecoration(
                topSpace
                , sideSpace
                , itemSpace
                , showMoreTopSpace
                , footerTopSpace
                , bottomSpace
            )
        )
    }

    @SuppressLint("CheckResult")
    private fun getLastForecasts() {

        addItemDecoration()

        val forecasts = ArrayList<ForecastItem>()

        for (i in 1..5) {
            forecasts.add(ForecastItem(null))
        }

        val adapter = ForecastAdapter(this)

        binding.lastForecasts.forecastRV.isNestedScrollingEnabled = false
        binding.lastForecasts.forecastRV.adapter = adapter

        adapter.addAll(forecasts)
//        val forecastsListRequest =ForecastsRequest(1, 0
//            , TimeInterval.ALL.backendValue, 15)

//        BettingHubBackend().api.forecasts(forecastsListRequest)
//            .subscribeOn(Schedulers.io())
//            .observeOn(AndroidSchedulers.mainThread())
//            .subscribe({
//                forecasts.clear()
//                forecasts.addAll(it)
//                for (forecast in forecasts) {
//                    Log.i("Forecasts", forecast.toString())
//                }
//                lastForecastsTable.apply {
//                    setHasFixedSize(true)
//                    val manager = LinearLayoutManager(context, LinearLayoutManager.VERTICAL, false)
//                    manager.isAutoMeasureEnabled = true
//                    layoutManager = manager
////            layoutManager = SpanningLinearLayoutManager(context, LinearLayoutManager.VERTICAL, false)
//                    adapter = LastForecastsTableAdapter(forecasts, forecastListener = this@HomeFragment)
//
//                }
////                forecastsLiveData.value = forecasts
//            }, {
//                Log.e("Forecast", it.message ?: "WTF?!")
//                it.printStackTrace()
//            })

    }

    override fun onClick(v: View?) {
//        when (v?.id) {
//            R.id.see_all_forecasts -> navController.navigate(HomeFragmentDirections.toForecastsFragment())
//            R.id.see_all_top_users_button -> navController.navigate(R.id.toForecasterRatingFragment)
//        }
    }


    override fun onForecastClick(forecast: Forecast, position: Int) {
        navController.navigate(HomeFragmentDirections.toForecastFragment(forecast))
    }

    private fun updateSearchFieldVisibility() {
        binding.topPanel.searchField.visibility = if (searchActive) View.VISIBLE else View.GONE

        if (searchActive) {
            binding.topPanel.searchField.requestFocus()
            Utils.showKeyboard(requireContext())
        }
    }

    fun onSearchBtnClick() {
        searchActive = !searchActive
        updateSearchFieldVisibility()
    }

    fun onSeeAllForecastersBtnClick() {
        navController.navigate(HomeFragmentDirections.toForecasterRatingFragment())
    }
}
