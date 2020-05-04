package com.xbethub.webview.ui.forecasterRating

import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.inputmethod.InputMethodManager
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.R
import com.xbethub.webview.databinding.FragmentForecasterRatingBinding
import com.xbethub.webview.models.ForecasterRating
import com.xbethub.webview.ui.forecasterRating.items.ItemListener
import com.xbethub.webview.ui.forecasterRating.items.ItemAdapter
import com.xbethub.webview.ui.forecasterRating.items.ItemDecoration
import com.xbethub.webview.ui.forecasterRating.items.items.FooterItem
import com.xbethub.webview.ui.forecasterRating.items.items.HeaderItem
import com.xbethub.webview.ui.forecasterRating.items.items.TableHeaderItem
import com.xbethub.webview.ui.forecasterRating.items.items.TableLineItem

class ForecasterRatingFragment: Fragment(), ItemListener {

    private lateinit var vm: ForecasterRatingViewModel
    private lateinit var binding: FragmentForecasterRatingBinding

    private var searchActive = false

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentForecasterRatingBinding.inflate(inflater)
        vm = ViewModelProvider(this).get(ForecasterRatingViewModel::class.java)

        vm.ratingsLiveData.observe(viewLifecycleOwner, Observer { setRatings(it) })
        vm.clearRatingsLiveData.observe(viewLifecycleOwner, Observer { clearRatings() })

        binding.topPanel.searchBtn.setOnClickListener { onSearchBtnClick() }

        updateSearchFieldVisibility()

        initRatingRV()

        return binding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        vm.onCreate()
    }

    private fun addItemDecoration() {
        val topSpace = resources.getDimensionPixelSize(R.dimen.ratingTableTopMargin)
        val sideSpace = resources.getDimensionPixelSize(R.dimen.sideMargin)
        val footerTopSpace = resources.getDimensionPixelSize(R.dimen.forecastsFooterTopSpace)
        val bottomSpace = resources.getDimensionPixelSize(R.dimen.forecastsItemBottomSpace)

        binding.ratingRV.addItemDecoration(
            ItemDecoration(
                topSpace
                , sideSpace
                , 0
                , footerTopSpace
                , bottomSpace
            )
        )
    }


    private fun initRatingRV() {
        addItemDecoration()
        binding.ratingRV.layoutManager = LinearLayoutManager(requireContext(), RecyclerView.VERTICAL, false)
        val adapter = ItemAdapter(this, vm, this)
        binding.ratingRV.adapter = adapter
        adapter.addAll(listOf(HeaderItem(), TableHeaderItem(), FooterItem()))
    }

    private fun setRatings(ratings: List<ForecasterRating>) {
        (binding.ratingRV.adapter as? ItemAdapter)?.let {
            if (it.itemCount != 3) {
                it.removeItems(2, it.itemCount - 3)
            }

            it.addAll(2, ratings.map { TableLineItem(it) })
        }
    }

    private fun clearRatings() {
        (binding.ratingRV.adapter as? ItemAdapter)?.let {
            if (it.itemCount != 2) {
                it.removeItems(1, it.itemCount - 2)
            }
        }
    }

    private fun updateSearchFieldVisibility() {
        binding.topPanel.searchField.visibility = if (searchActive) View.VISIBLE else View.GONE

        if (searchActive) {
            binding.topPanel.searchField.requestFocus()
            showKeyboard()
        }
    }

    fun showKeyboard() {
        val imm = requireContext().getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
        imm.toggleSoftInput(InputMethodManager.SHOW_IMPLICIT, InputMethodManager.HIDE_IMPLICIT_ONLY)
    }

    fun onSearchBtnClick() {
        searchActive = !searchActive
        updateSearchFieldVisibility()
    }
}
