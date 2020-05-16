package com.xbethub.webview.ui.bookmakerRating

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.xbethub.webview.R
import com.xbethub.webview.Utils
import com.xbethub.webview.ui.bookmakerRating.items.BookmakerItemAdapter
import com.xbethub.webview.ui.bookmakerRating.items.BookmakerItemListener
import com.xbethub.webview.ui.bookmakerRating.items.ItemDecoration
import com.xbethub.webview.ui.bookmakerRating.items.items.BookmakerItem
import com.xbethub.webview.ui.bookmakerRating.items.items.BookmakerTableItemBase
import com.xbethub.webview.ui.bookmakerRating.items.items.FooterBookmakerTableItem
import com.xbethub.webview.ui.bookmakerRating.items.items.HeaderBookmakerTableItem
import kotlinx.android.synthetic.main.element_top_panel.*
import kotlinx.android.synthetic.main.element_top_panel.view.*
import kotlinx.android.synthetic.main.fragment_bookmaker_rating.*

class BookmakerRatingFragment : Fragment() {

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

        items.add(HeaderBookmakerTableItem())

        for (i in 0..2) {
            items.add(
                BookmakerItem(i == 2)
            )
        }

        items.add(FooterBookmakerTableItem())

        ratingRV.adapter = BookmakerItemAdapter(object : BookmakerItemListener {

        }).apply {
            addAll(items)
        }
    }
}
