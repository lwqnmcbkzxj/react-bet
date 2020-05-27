package com.bettinghub.forecasts.ui.bookmakerRating

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
import com.bettinghub.forecasts.models.Bookmaker
import com.bettinghub.forecasts.ui.bookmakerRating.items.BookmakerItemAdapter
import com.bettinghub.forecasts.ui.bookmakerRating.items.BookmakerItemListener
import com.bettinghub.forecasts.ui.bookmakerRating.items.ItemDecoration
import com.bettinghub.forecasts.ui.bookmakerRating.items.items.BookmakerItem
import com.bettinghub.forecasts.ui.bookmakerRating.items.items.BookmakerTableItemBase
import com.bettinghub.forecasts.ui.bookmakerRating.items.items.FooterBookmakerTableItem
import com.bettinghub.forecasts.ui.bookmakerRating.items.items.HeaderBookmakerTableItem
import kotlinx.android.synthetic.main.element_top_panel.*
import kotlinx.android.synthetic.main.element_top_panel.view.*
import kotlinx.android.synthetic.main.fragment_bookmaker_rating.*

class BookmakerRatingFragment : Fragment() {

    val viewModel by viewModels<BookmakerRatingViewModel>()
    lateinit var bookmakerRVAdapter: BookmakerItemAdapter
    private val consts = App.appComponent.getConstants()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_bookmaker_rating, container, false)
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
        ratingRV.addItemDecoration(
            ItemDecoration(
                topSpace
                , sideSpace
                , 0
                , footerTopSpace
                , bottomSpace
            )
        )
        ratingRV.isNestedScrollingEnabled = false
        val items = mutableListOf<BookmakerTableItemBase>()

        viewModel.bookmakersLiveData.observe(viewLifecycleOwner, Observer {
            when (it.status) {
                Status.LOADING -> onBookmakersLoading()
                Status.SUCCESS -> onBookmakersLoaded(it.data)
                Status.ERROR -> onBookmakersLoadingError(it.error)
            }
        })

        items.add(HeaderBookmakerTableItem())

//        for (i in 0..2) {
//            items.add(
//                BookmakerItem(i == 2)
//            )
//        }

        items.add(FooterBookmakerTableItem())

        bookmakerRVAdapter = BookmakerItemAdapter(object : BookmakerItemListener {
            override fun onBookmakerClick(bookmaker: Bookmaker) {
                val navController = findNavController()
                if (navController.currentDestination!!.id != R.id.bookmakerFragment) {
                    navController.navigate(BookmakerRatingFragmentDirections.toBookmakerFragment(bookmaker.id))
                }
            }
        }).apply {
            addAll(items)
        }
        ratingRV.adapter = bookmakerRVAdapter
    }

    private fun onBookmakersLoading() {
        ratingRV.post {
            bookmakerRVAdapter.addAll(List(consts.topBookmakerCount) { BookmakerItem(null, it == consts.topBookmakerCount - 1) })
        }
    }

    private fun onBookmakersLoaded(bookmakers: List<Bookmaker>?) {
        bookmakers?.let {
            ratingRV.post {
                bookmakerRVAdapter.replaceItems(1, bookmakers.mapIndexed { index, bookmaker -> BookmakerItem(bookmaker, index == consts.topBookmakerCount - 1) })
            }

            if (bookmakers.size < consts.topBookmakerCount) {
                ratingRV.post {
                    val diff = consts.topBookmakerCount - bookmakers.size
                    bookmakerRVAdapter.removeItems(bookmakerRVAdapter.itemCount - diff, diff)
                }
            }
        }
    }

    private fun onBookmakersLoadingError(error: Throwable?) {

    }
}
