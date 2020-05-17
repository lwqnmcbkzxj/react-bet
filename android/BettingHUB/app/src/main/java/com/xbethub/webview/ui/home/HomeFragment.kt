package com.xbethub.webview.ui.home

import android.os.Bundle
import android.util.DisplayMetrics
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.NavController
import androidx.navigation.Navigation
import com.xbethub.webview.App
import com.xbethub.webview.R
import com.xbethub.webview.Utils
import com.xbethub.webview.databinding.FragmentHomeNewBinding
import com.xbethub.webview.enums.Status
import com.xbethub.webview.models.Bookmaker
import com.xbethub.webview.models.Forecast
import com.xbethub.webview.models.Match
import com.xbethub.webview.models.User
import com.xbethub.webview.ui.forecasts.items.ForecastListener
import com.xbethub.webview.ui.forecasts.items.items.ForecastItem
import com.xbethub.webview.ui.home.bookmakerItem.*
import com.xbethub.webview.ui.home.bookmakerItem.items.BookmakerItem
import com.xbethub.webview.ui.home.bookmakerItem.items.BookmakerTableItemBase
import com.xbethub.webview.ui.home.bookmakerItem.items.HeaderBookmakerTableItem
import com.xbethub.webview.ui.home.forecasterItem.ForecasterAdapter
import com.xbethub.webview.ui.home.forecasterItem.ForecasterItemDecoration
import com.xbethub.webview.ui.home.forecasterItem.ForecasterListener
import com.xbethub.webview.ui.home.matchItem.MatchItemAdapter
import com.xbethub.webview.ui.home.matchItem.MatchItemListener
import com.xbethub.webview.ui.home.matchItem.items.HeaderMatchTableItem
import com.xbethub.webview.ui.home.matchItem.items.MatchItem
import com.xbethub.webview.ui.home.matchItem.items.MatchTableItemBase
import com.xbethub.webview.ui.profile.forecasts.ForecastAdapter

class HomeFragment : Fragment(), ForecastListener, ForecasterListener
    , BookmakerItemListener, MatchItemListener {
    private val consts = App.appComponent.getConstants()
    lateinit var binding: FragmentHomeNewBinding
    lateinit var navController: NavController
    lateinit var vm: HomeViewModel

    lateinit var forecastRVAdapter: ForecastAdapter
    lateinit var forecasterRVAdapter: ForecasterAdapter

    private var searchActive = false

    override fun onCreateView(
            inflater: LayoutInflater,
            container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View? {
        binding = FragmentHomeNewBinding.inflate(inflater)

        binding.topPanel.searchBtn.setOnClickListener { onSearchBtnClick() }
        binding.topForecasters.seeAllForecasters.setOnClickListener { onSeeAllForecastersBtnClick() }
        binding.lastForecasts.seeAllForecastsBtn.setOnClickListener { onSeeAllForecastsBtnClick() }
        binding.topBookmakers.seeAllBookmakersBtn.setOnClickListener { onSeeAllBookmakersBtnClick() }

        binding.topPanel.bankBalance.root.visibility = View.GONE

        navController = activity?.let { Navigation.findNavController(it, R.id.nav_host_fragment) }!!

        vm = ViewModelProvider(this).get(HomeViewModel::class.java)

        vm.forecastersLiveData.observe(viewLifecycleOwner, Observer {
            when (it.status) {
                Status.LOADING -> onForecastersLoading()
                Status.SUCCESS -> onForecastersLoaded(it.data)
                Status.ERROR -> onForecastersLoadingError(it.error)
            }
        })

        vm.forecastsLiveData.observe(viewLifecycleOwner, Observer {
            when (it.status) {
                Status.LOADING -> onForecastsLoading()
                Status.SUCCESS -> onForecastsLoaded(it.data)
                Status.ERROR -> onForecastsLoadingError(it.error)
            }
        })

        updateSearchFieldVisibility()

        initForecasterRV()
        initForecastRV()

        return binding.root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        vm.onDestroy()
    }

    private fun onForecastersLoading() {
        binding.topForecasters.forecasterRV.post {
            forecasterRVAdapter.clearAndAddAll(List(consts.topForecastersCount) {null})
        }
    }

    private fun onForecastersLoaded(forecasters: List<User>?) {
        forecasters?.let {
            binding.topForecasters.forecasterRV.post {
                if (forecasterRVAdapter.itemCount > 0) {
                    forecasterRVAdapter.replaceItems(0, forecasters)
                } else {
                    forecasterRVAdapter.addAll(forecasters)
                }
            }

        }
    }

    private fun onForecastersLoadingError(error: Throwable?) {

    }

    private fun initForecasterRV() {
        val itemSpace = resources.getDimensionPixelSize(R.dimen.forecaterItemSpace)
        val sideSpace= resources.getDimensionPixelSize(R.dimen.sideMargin)

        binding.topForecasters.forecasterRV
            .addItemDecoration(ForecasterItemDecoration(itemSpace))

        val displayMetrics = DisplayMetrics()
        requireActivity().windowManager.defaultDisplay.getMetrics(displayMetrics)

        val itemWidth = (displayMetrics.widthPixels - itemSpace * 3 - 2 * sideSpace) / 4

        forecasterRVAdapter = ForecasterAdapter(itemWidth, this)
        binding.topForecasters.forecasterRV.adapter = forecasterRVAdapter
    }

    private fun onForecastsLoading() {
        binding.lastForecasts.forecastRV.post {
            forecastRVAdapter.addAll(List(consts.lastForecastsCount) { ForecastItem(null) })
        }
    }

    private fun onForecastsLoaded(forecasts: List<Forecast>?) {
        forecasts?.let {
            binding.lastForecasts.forecastRV.post {
                forecastRVAdapter.replaceItems(0, forecasts.map { forecast -> ForecastItem(forecast) })
            }

            if (forecasts.size < consts.lastForecastsCount) {
                binding.lastForecasts.forecastRV.post {
                    val diff = consts.lastForecastsCount - forecasts.size
                    forecastRVAdapter.removeItems(forecastRVAdapter.itemCount - diff, diff)
                }
            }
        }
    }

    private fun onForecastsLoadingError(error: Throwable?) {

    }

    private fun initForecastRV() {
        val topSpace = resources.getDimensionPixelSize(R.dimen.forecastsItemTopSpace)
        val sideSpace = resources.getDimensionPixelSize(R.dimen.forecastSideMargin)
        val itemSpace = resources.getDimensionPixelSize(R.dimen.forecastsItemSpace)
        val showMoreTopSpace = resources.getDimensionPixelSize(R.dimen.forecastsShowMoreTopSpace)
        val footerTopSpace = resources.getDimensionPixelSize(R.dimen.forecastsFooterTopSpace)
        val bottomSpace = resources.getDimensionPixelSize(R.dimen.footerBottomMargin)

        binding.lastForecasts.forecastRV.addItemDecoration(
            com.xbethub.webview.ui.forecasts.items.ForecastItemDecoration(
                topSpace
                , sideSpace
                , itemSpace
                , showMoreTopSpace
                , footerTopSpace
                , bottomSpace
            )
        )

        forecastRVAdapter = ForecastAdapter(this)

        binding.lastForecasts.forecastRV.isNestedScrollingEnabled = false
        binding.lastForecasts.forecastRV.adapter = forecastRVAdapter
    }

    private fun initTopBookmakers() {
        val items = ArrayList<BookmakerTableItemBase>()

        items.add(HeaderBookmakerTableItem())

        for (i in 0..2) {
            items.add(
                BookmakerItem(Bookmaker(), i == 2)
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
                MatchItem(Match(), i == 4)
            )
        }

        val adapter = MatchItemAdapter(this)

        binding.topMatches.matchesRV.isNestedScrollingEnabled = false
        binding.topMatches.matchesRV.adapter = adapter

        adapter.addAll(items)
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        vm.onCreate()

        initTopBookmakers()
        initTopMatches()
    }

    private fun updateSearchFieldVisibility() {
        binding.topPanel.searchField.visibility = if (searchActive) View.VISIBLE else View.GONE

        if (searchActive) {
            binding.topPanel.searchField.requestFocus()
            Utils.showKeyboard(requireContext())
        }
    }

    private fun onSearchBtnClick() {
        searchActive = !searchActive
        updateSearchFieldVisibility()
    }

    private fun onSeeAllForecastersBtnClick() {
        navController.navigate(HomeFragmentDirections.toForecasterRatingFragment())
    }

    private fun onSeeAllForecastsBtnClick() {
        navController.navigate(HomeFragmentDirections.toForecastsFragment())
    }

    private fun onSeeAllBookmakersBtnClick() {
        navController.navigate(HomeFragmentDirections.toBookmakerRatingFragment())
    }

    // ForecastListener
    override fun onForecastClick(forecast: Forecast, position: Int) {
        navController.navigate(HomeFragmentDirections.toForecastFragment(forecast))
    }

    // ForecasterListener
    override fun onForecasterClick(user: User, position: Int) {
        navController.navigate(HomeFragmentDirections.toProfileFragment(user))
    }

    // BookmakerItemListener
    override fun onBookmakerClick(bookmaker: Bookmaker, position: Int) {
        navController.navigate(HomeFragmentDirections.toBookmakerFragment(bookmaker))
    }

    override fun onMatchClick(match: Match, position: Int) {
        navController.navigate(HomeFragmentDirections.toMatchFragment(match))
    }
}
