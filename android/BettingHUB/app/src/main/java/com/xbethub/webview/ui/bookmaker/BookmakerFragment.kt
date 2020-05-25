package com.xbethub.webview.ui.bookmaker

import android.content.Intent
import android.net.Uri
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
import com.xbethub.webview.R
import com.xbethub.webview.Utils
import com.xbethub.webview.enums.Status
import com.xbethub.webview.ui.bookmaker.items.ItemAdapter
import com.xbethub.webview.ui.bookmaker.items.ItemDecoration
import com.xbethub.webview.ui.bookmaker.items.items.FooterItem
import com.xbethub.webview.ui.bookmaker.items.items.HeaderItem
import com.xbethub.webview.ui.bookmaker.items.items.Item
import com.xbethub.webview.ui.bookmaker.items.items.NewCommentItem
import kotlinx.android.synthetic.main.element_top_panel.*
import kotlinx.android.synthetic.main.fragment_bookmaker.*

class BookmakerFragment : Fragment() {

    private val vm by viewModels<BookmakerViewModel>()
    private val args by navArgs<BookmakerFragmentArgs>()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_bookmaker, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        backBtn.setOnClickListener {
            activity?.onBackPressed()
        }
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

        bookmakerRV.layoutManager =
            LinearLayoutManager(context, RecyclerView.VERTICAL, false)

        val topSpace = resources.getDimensionPixelSize(R.dimen.commentItemTopSpace)
        val sideSpace = resources.getDimensionPixelSize(R.dimen.commentItemSideSpace)
        val itemSpace = resources.getDimensionPixelSize(R.dimen.commentItemSpace)
        //val showMoreTopSpace = resources.getDimensionPixelSize(R.dimen.forecastsShowMoreTopSpace)
        val footerTopSpace = resources.getDimensionPixelSize(R.dimen.forecastsFooterTopSpace)
        val bottomSpace = resources.getDimensionPixelSize(R.dimen.footerBottomMargin)

        bookmakerRV.addItemDecoration(
            ItemDecoration(
                topSpace
                , sideSpace
                , itemSpace
                , footerTopSpace
                , bottomSpace
            )
        )

        bookmakerRV.adapter = ItemAdapter(vm, vm, viewLifecycleOwner)

        val items = ArrayList<Item>()

        vm.linkClick.observe(viewLifecycleOwner, Observer {
            startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(it)))
        })
        vm.bookmaker.observe(viewLifecycleOwner, Observer {
            when (it.status) {
                Status.LOADING -> {

                }
                Status.SUCCESS -> {
                    items.add(HeaderItem(it.data!!))
//                    items.add(NewCommentItem())
                    items.add(FooterItem())

                    (bookmakerRV.adapter as ItemAdapter).addAll(items)
                }
                Status.ERROR -> {

                }
            }
        })
        vm.id.value = args.bookmaker
//        vm.commentsLiveData.observe(viewLifecycleOwner, Observer { addNewComments(it.first, it.second) })
    }


    private fun addNewComments(position: Int, comments: List<Item>) {
//        (bookmakerRV.adapter as ItemAdapter).let {
//            val insertPos = if (position == -1) it.itemCount - 2 else position
//
//            (bookmakerRV.adapter as ItemAdapter).let {
//                it.addAll(insertPos, comments)
//
//                if (position != -1) {
//                    it.removeItem(position + comments.size)
//                }
//            }
//        }
    }
}
