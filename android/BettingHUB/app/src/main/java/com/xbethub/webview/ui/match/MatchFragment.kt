package com.xbethub.webview.ui.match

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.Observer
import androidx.navigation.fragment.navArgs
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.App
import com.xbethub.webview.R
import com.xbethub.webview.Utils
import com.xbethub.webview.enums.Status
import com.xbethub.webview.models.User
import com.xbethub.webview.ui.forecasterRating.ForecasterRating
import com.xbethub.webview.ui.match.items.ItemAdapter
import com.xbethub.webview.ui.match.items.ItemDecoration
import com.xbethub.webview.ui.match.items.items.*
import kotlinx.android.synthetic.main.element_top_panel.*
import kotlinx.android.synthetic.main.fragment_match.*

class MatchFragment: Fragment() {

    val vm by viewModels<MatchViewModel>()
    val args by navArgs<MatchFragmentArgs>()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_match, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        vm.ratingsLiveData.observe(viewLifecycleOwner, Observer {
            when (it.status) {
                Status.LOADING -> onForecastersLoading()
                Status.SUCCESS -> onForecastersLoaded(it.data)
                Status.ERROR -> onForecastersLoadingError(it.error)
            }
        })
        vm.clearRatingsLiveData.observe(viewLifecycleOwner, Observer { clearRatings() })

        searchField.visibility = View.GONE
        searchBtn.setOnClickListener {
            searchField.visibility = if (searchField.visibility == View.GONE) {
                searchField.requestFocus()
                Utils.showKeyboard(requireContext())
                View.VISIBLE
            } else {
                View.GONE
            }
        }

        matchRV.layoutManager =
            LinearLayoutManager(context, RecyclerView.VERTICAL, false)

        val topSpace = resources.getDimensionPixelSize(R.dimen.commentItemTopSpace)
        val sideSpace = resources.getDimensionPixelSize(R.dimen.commentItemSideSpace)
        val itemSpace = resources.getDimensionPixelSize(R.dimen.commentItemSpace)
        //val showMoreTopSpace = resources.getDimensionPixelSize(R.dimen.forecastsShowMoreTopSpace)
        val footerTopSpace = resources.getDimensionPixelSize(R.dimen.forecastsFooterTopSpace)
        val bottomSpace = resources.getDimensionPixelSize(R.dimen.footerBottomMargin)

        matchRV.addItemDecoration(
            ItemDecoration(
                topSpace
                , sideSpace
                , itemSpace
                , footerTopSpace
                , bottomSpace
            )
        )

        matchRV.adapter = ItemAdapter(vm, vm, viewLifecycleOwner)

        val items = ArrayList<Item>()

        items.add(HeaderItem(args.match))
//        items.add(ForecasterTableHeaderItem())
//        items.add(NewCommentItem())
        items.add(FooterItem())

        (matchRV.adapter as ItemAdapter).addAll(items)

        vm.commentsLiveData.observe(viewLifecycleOwner, Observer { addNewComments(it.first, it.second) })
    }

    private fun clearRatings() {
//        matchRV.post {
//            (matchRV.adapter as? ItemAdapter)?.let {
//                if (it.itemCount > 3) {
//                    it.removeItems(2, it.itemCount - 3)
//                }
//            }
//        }
    }

    private val consts = App.appComponent.getConstants()

    private fun onForecastersLoading() {
//        clearRatings()
//        matchRV.post {
//            (matchRV.adapter as? ItemAdapter)?.let { adapter ->
//                adapter.addAll(2
//                    , List(consts.topForecastersCount) { i ->
//                        ForecasterTableLineItem(ForecasterRating(null, i, i + 1 == consts.topForecastersCount))
//                    }
//                )
//            }
//        }
    }

    private fun onForecastersLoaded(forecasters: List<User>?) {
//        forecasters?.let {
//            matchRV.post {
//                (matchRV.adapter as? ItemAdapter)?.let { adapter ->
//                    val items = List(forecasters.size) { i ->
//                        ForecasterTableLineItem(ForecasterRating(forecasters[i], i, i + 1 == consts.topForecastersCount))
//                    }
//
//                    if (adapter.getItems().any { it.getType() == ItemType.FORECASTER_TABLE_LINE }) {
//                        adapter.replaceItems(2, items)
//                    } else {
//                        adapter.insertItems(items, 2)
//                    }
//                }
//            }
//        }
    }

    private fun onForecastersLoadingError(error: Throwable?) {
        println(error)
    }

    private fun addNewComments(position: Int, comments: List<Item>) {
//        (matchRV.adapter as ItemAdapter).let {
//            val insertPos = if (position == -1) it.itemCount - 2 else position
//
//            (matchRV.adapter as ItemAdapter).let {
//                it.addAll(insertPos, comments)
//
//                if (position != -1) {
//                    it.removeItem(position + comments.size)
//                }
//            }
//        }
    }

}
