package com.bettinghub.forecasts.ui.home

import android.animation.ValueAnimator
import android.os.Bundle
import android.util.DisplayMetrics
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.view.updateLayoutParams
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.NavController
import androidx.navigation.Navigation
import com.bettinghub.forecasts.App
import com.bettinghub.forecasts.R
import com.bettinghub.forecasts.Utils
import com.bettinghub.forecasts.databinding.FragmentHomeNewBinding
import com.bettinghub.forecasts.enums.Status
import com.bettinghub.forecasts.models.*
import com.bettinghub.forecasts.ui.forecasts.items.ForecastListener
import com.bettinghub.forecasts.ui.forecasts.items.items.ForecastItem
import com.bettinghub.forecasts.ui.home.bookmakerItem.*
import com.bettinghub.forecasts.ui.home.bookmakerItem.items.BookmakerItem
import com.bettinghub.forecasts.ui.home.bookmakerItem.items.BookmakerTableItemBase
import com.bettinghub.forecasts.ui.home.bookmakerItem.items.HeaderBookmakerTableItem
import com.bettinghub.forecasts.ui.home.forecasterItem.ForecasterAdapter
import com.bettinghub.forecasts.ui.home.forecasterItem.ForecasterItemDecoration
import com.bettinghub.forecasts.ui.home.forecasterItem.ForecasterListener
import com.bettinghub.forecasts.ui.home.matchItem.MatchItemAdapter
import com.bettinghub.forecasts.ui.home.matchItem.MatchItemListener
import com.bettinghub.forecasts.ui.home.matchItem.items.HeaderMatchTableItem
import com.bettinghub.forecasts.ui.home.matchItem.items.MatchItem
import com.bettinghub.forecasts.ui.home.matchItem.items.MatchTableItemBase
import com.bettinghub.forecasts.ui.profile.forecasts.ForecastAdapter

class HomeFragment : Fragment(), ForecastListener, ForecasterListener
    , BookmakerItemListener, MatchItemListener {
    private val consts = App.appComponent.getConstants()
    lateinit var binding: FragmentHomeNewBinding
    lateinit var navController: NavController
    lateinit var vm: HomeViewModel

    lateinit var forecastRVAdapter: ForecastAdapter
    lateinit var forecasterRVAdapter: ForecasterAdapter
    lateinit var matchRVAdapter: MatchItemAdapter
    lateinit var bookmakerRVAdapter: BookmakerItemAdapter

    private var searchActive = false

    val rvHeight by lazy {
        binding.topBookmakers.bookmakerRV.height
    }

    override fun onCreateView(
            inflater: LayoutInflater,
            container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View? {
        binding = FragmentHomeNewBinding.inflate(inflater)

        binding.topBookmakers.title.setOnClickListener {
            binding.topBookmakers.bookmakerRV.let {
                if (it.visibility == View.VISIBLE) {
                    binding.topBookmakers.bookmakerExpand.animate().rotation(0f).duration = 400
                    ValueAnimator.ofInt(rvHeight, 0).let { anim ->
                        anim.duration = 400
                        anim.addUpdateListener { anim ->
                            (anim.animatedValue as Int).let { value ->
                                if (value == 0) {
                                    binding.topBookmakers.topFrame.setBackgroundResource(R.drawable.bg_cornered_frame_7dp)
                                    it.visibility = View.GONE
                                } else {
                                    it.updateLayoutParams {
                                        height = value
                                    }
                                }
                            }

                        }
                        anim.start()
                    }
                } else {
                    binding.topBookmakers.bookmakerExpand.animate().rotation(180f).duration = 400
                    ValueAnimator.ofInt(0, rvHeight).let { anim ->
                        anim.duration = 400
                        anim.addUpdateListener { anim ->
                            (anim.animatedValue as Int).let { value ->
                                if (value == 0) {
                                    binding.topBookmakers.topFrame.setBackgroundResource(R.drawable.bg_top_cornered_frame_7dp)
                                    it.visibility = View.VISIBLE
                                } else {
                                    it.updateLayoutParams {
                                        height = value
                                    }
                                }
                            }

                        }
                        anim.start()
                    }
//                    it.visibility = View.VISIBLE
                }
            }
        }
        binding.topPanel.searchBtn.setOnClickListener { onSearchBtnClick() }
        binding.topForecasters.seeAllForecasters.setOnClickListener { onSeeAllForecastersBtnClick() }
        binding.lastForecasts.seeAllForecastsBtn.setOnClickListener { onSeeAllForecastsBtnClick() }
        binding.topBookmakers.seeAllBookmakersBtn.setOnClickListener { onSeeAllBookmakersBtnClick() }
        binding.topMatches.seeAllBookmakersBtn.setOnClickListener { onSeeAllMatchesBtnClick() }

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

        vm.matchesLiveData.observe(viewLifecycleOwner, Observer {
            when (it.status) {
                Status.LOADING -> onMatchesLoading()
                Status.SUCCESS -> onMatchesLoaded(it.data)
                Status.ERROR -> onMatchesLoadingError(it.error)
            }
        })

        vm.bookmakersLiveData.observe(viewLifecycleOwner, Observer {
            when (it.status) {
                Status.LOADING -> onBookmakersLoading()
                Status.SUCCESS -> onBookmakersLoaded(it.data)
                Status.ERROR -> onBookmakersLoadingError(it.error)
            }
        })

        updateSearchFieldVisibility()

        initForecasterRV()
        initForecastRV()
        initMatchesRV()
        initBookmakersRV()

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

    private fun onMatchesLoading() {
        binding.topMatches.matchesRV.post {
            matchRVAdapter.addAll(List(consts.topMatchesCount) { MatchItem(null, it == consts.topMatchesCount - 1) })
        }
    }

    private fun onMatchesLoaded(matches: List<Event>?) {
        matches?.let {
            binding.topMatches.matchesRV.post {
                matchRVAdapter.replaceItems(1, matches.mapIndexed { index, match -> MatchItem(match, index == consts.topMatchesCount - 1) })
            }

            if (matches.size < consts.topMatchesCount) {
                binding.topMatches.matchesRV.post {
                    val diff = consts.topMatchesCount - matches.size
                    matchRVAdapter.removeItems(matchRVAdapter.itemCount - diff, diff)
                }
            }
        }
    }

    private fun onMatchesLoadingError(error: Throwable?) {

    }

    private fun onBookmakersLoading() {
        binding.topBookmakers.bookmakerRV.post {
            bookmakerRVAdapter.addAll(List(3) { BookmakerItem(null, it == 3 - 1) })
        }
    }

    private fun onBookmakersLoaded(bookmakers: List<Bookmaker>?) {
        bookmakers?.let {
            binding.topBookmakers.bookmakerRV.post {
                bookmakerRVAdapter.replaceItems(1, bookmakers.mapIndexed { index, bookmaker -> BookmakerItem(bookmaker, index == 3 - 1) }.take(3))
            }

            if (bookmakers.size < 3) {
                binding.topBookmakers.bookmakerRV.post {
                    val diff = consts.topBookmakerCount - bookmakers.size
                    bookmakerRVAdapter.removeItems(bookmakerRVAdapter.itemCount - diff, diff)
                }
            }
        }
    }

    private fun onBookmakersLoadingError(error: Throwable?) {

    }

    private fun initForecastRV() {
        val topSpace = resources.getDimensionPixelSize(R.dimen.forecastsItemTopSpace)
        val sideSpace = resources.getDimensionPixelSize(R.dimen.forecastSideMargin)
        val itemSpace = resources.getDimensionPixelSize(R.dimen.forecastsItemSpace)
        val showMoreTopSpace = resources.getDimensionPixelSize(R.dimen.forecastsShowMoreTopSpace)
        val footerTopSpace = resources.getDimensionPixelSize(R.dimen.forecastsFooterTopSpace)
        val bottomSpace = resources.getDimensionPixelSize(R.dimen.footerBottomMargin)

        binding.lastForecasts.forecastRV.addItemDecoration(
            com.bettinghub.forecasts.ui.forecasts.items.ForecastItemDecoration(
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

    private fun initMatchesRV() {
        val items = ArrayList<MatchTableItemBase>()

        items.add(HeaderMatchTableItem())
        matchRVAdapter = MatchItemAdapter(this)
        matchRVAdapter.addAll(items)

        binding.topMatches.matchesRV.isNestedScrollingEnabled = false
        binding.topMatches.matchesRV.adapter = matchRVAdapter
    }

    private fun initBookmakersRV() {
        val items = ArrayList<BookmakerTableItemBase>()

        items.add(HeaderBookmakerTableItem())
        bookmakerRVAdapter = BookmakerItemAdapter(this)
        bookmakerRVAdapter.addAll(items)

        binding.topBookmakers.bookmakerRV.isNestedScrollingEnabled = false
        binding.topBookmakers.bookmakerRV.adapter = bookmakerRVAdapter
    }

    private fun initTopMatches() {
        val items = ArrayList<MatchTableItemBase>()

        items.add(HeaderMatchTableItem())

//        for (i in 0..4) {
//            items.add(
//                MatchItem(Event(), i == 4)
//            )
//        }

        val adapter = MatchItemAdapter(this)

        binding.topMatches.matchesRV.isNestedScrollingEnabled = false
        binding.topMatches.matchesRV.adapter = adapter

        adapter.addAll(items)
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        vm.onCreate()

//        initTopBookmakers()
//        initTopMatches()
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
        if (navController.currentDestination!!.id != R.id.forecasterRatingFragment) {
            navController.navigate(HomeFragmentDirections.toForecasterRatingFragment())
        }
    }

    private fun onSeeAllForecastsBtnClick() {
        if (navController.currentDestination!!.id != R.id.forecastsFragment) {
            navController.navigate(HomeFragmentDirections.toForecastsFragment())
        }
    }

    private fun onSeeAllBookmakersBtnClick() {
        if (navController.currentDestination!!.id != R.id.bookmakerRatingFragment) {
            navController.navigate(HomeFragmentDirections.toBookmakerRatingFragment())
        }
    }

    private fun onSeeAllMatchesBtnClick() {
        if (navController.currentDestination!!.id != R.id.topMatchesFragment) {
            navController.navigate(HomeFragmentDirections.toTopMatchesFragment())
        }
    }

    // ForecastListener
    override fun onForecastClick(forecast: Forecast, position: Int) {
        if (navController.currentDestination!!.id != R.id.forecastFragment) {
            navController.navigate(HomeFragmentDirections.toForecastFragment(forecast))
        }
    }

    // ForecasterListener
    override fun onForecasterClick(user: User, position: Int) {
        if (navController.currentDestination!!.id != R.id.profileFragment) {
            navController.navigate(HomeFragmentDirections.toProfileFragment(user))
        }
    }

    // BookmakerItemListener
    override fun onBookmakerClick(bookmaker: Bookmaker, position: Int) {
        if (navController.currentDestination!!.id != R.id.bookmakerFragment) {
            navController.navigate(HomeFragmentDirections.toBookmakerFragment(bookmaker.id))
        }
    }

    override fun onMatchClick(match: Event, position: Int) {
        if (navController.currentDestination!!.id != R.id.matchFragment) {
            navController.navigate(HomeFragmentDirections.toMatchFragment(match))
        }
    }
}
