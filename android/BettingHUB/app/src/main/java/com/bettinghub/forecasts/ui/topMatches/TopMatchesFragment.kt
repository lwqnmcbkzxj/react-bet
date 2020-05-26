package com.bettinghub.forecasts.ui.topMatches

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.Observer
import androidx.navigation.fragment.findNavController
import com.bettinghub.forecasts.App
import com.bettinghub.forecasts.R
import com.bettinghub.forecasts.Utils
import com.bettinghub.forecasts.enums.Status
import com.bettinghub.forecasts.models.Event
import com.bettinghub.forecasts.ui.topMatches.items.ItemDecoration
import com.bettinghub.forecasts.ui.topMatches.items.MatchItemAdapter
import com.bettinghub.forecasts.ui.topMatches.items.MatchItemListener
import com.bettinghub.forecasts.ui.topMatches.items.items.FooterMatchTableItem
import com.bettinghub.forecasts.ui.topMatches.items.items.HeaderMatchTableItem
import com.bettinghub.forecasts.ui.topMatches.items.items.MatchItem
import com.bettinghub.forecasts.ui.topMatches.items.items.MatchTableItemBase
import kotlinx.android.synthetic.main.element_top_panel.*
import kotlinx.android.synthetic.main.element_top_panel.view.*
import kotlinx.android.synthetic.main.fragment_top_matches.*

class TopMatchesFragment : Fragment() {

    val viewModel by viewModels<TopMatchesViewModel>()
    lateinit var matchRVAdapter: MatchItemAdapter
    private val consts = App.appComponent.getConstants()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_top_matches, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        searchField.visibility = View.GONE
        topPanel.searchBtn.setOnClickListener {
            searchField.visibility = if (searchField.visibility == View.GONE) {
                searchField.requestFocus()
                Utils.showKeyboard(requireContext())
                View.VISIBLE
            } else {
                View.GONE
            }
        }
        val topSpace = resources.getDimensionPixelSize(R.dimen.ratingTableTopMargin)
        val sideSpace = resources.getDimensionPixelSize(R.dimen.sideMargin)
        val footerTopSpace = resources.getDimensionPixelSize(R.dimen.forecastsFooterTopSpace)
        val bottomSpace = resources.getDimensionPixelSize(R.dimen.footerBottomMargin)
        matchesRV.addItemDecoration(
            ItemDecoration(
                topSpace
                , sideSpace
                , 0
                , footerTopSpace
                , bottomSpace
            )
        )
        matchesRV.isNestedScrollingEnabled = false
        val items = mutableListOf<MatchTableItemBase>()

        viewModel.matchesLiveData.observe(viewLifecycleOwner, Observer {
            when (it.status) {
                Status.LOADING -> onBookmakersLoading()
                Status.SUCCESS -> onBookmakersLoaded(it.data)
                Status.ERROR -> onBookmakersLoadingError(it.error)
            }
        })

        items.add(HeaderMatchTableItem())

//        for (i in 0..2) {
//            items.add(
//                BookmakerItem(i == 2)
//            )
//        }

        items.add(FooterMatchTableItem())

        matchRVAdapter = MatchItemAdapter(object : MatchItemListener {
            override fun onMatchClick(match: Event) {
                val navController = findNavController()
                if (navController.currentDestination!!.id != R.id.bookmakerFragment) {
                    navController.navigate(TopMatchesFragmentDirections.toMatchFragment(match))
                }
            }
        }).apply {
            addAll(items)
        }
        matchesRV.adapter = matchRVAdapter
    }

    private fun onBookmakersLoading() {
        matchesRV.post {
            matchRVAdapter.addAll(List(consts.topMatchesCount) { MatchItem(null, it == consts.topMatchesCount - 1) })
        }
    }

    private fun onBookmakersLoaded(matches: List<Event>?) {
        matches?.let {
            matchesRV.post {
                matchRVAdapter.replaceItems(1, matches.mapIndexed { index, match -> MatchItem(match, index == consts.topMatchesCount - 1) })
            }

            if (matches.size < consts.topMatchesCount) {
                matchesRV.post {
                    val diff = consts.topMatchesCount - matches.size
                    matchRVAdapter.removeItems(matchRVAdapter.itemCount - diff, diff)
                }
            }
        }
    }

    private fun onBookmakersLoadingError(error: Throwable?) {

    }
}
