package com.xbethub.webview.ui.forecasterRating

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.App
import com.xbethub.webview.R
import com.xbethub.webview.Utils
import com.xbethub.webview.databinding.FragmentForecasterRatingBinding
import com.xbethub.webview.enums.Status
import com.xbethub.webview.models.User
import com.xbethub.webview.ui.forecasterRating.items.ItemListener
import com.xbethub.webview.ui.forecasterRating.items.ItemAdapter
import com.xbethub.webview.ui.forecasterRating.items.ItemDecoration
import com.xbethub.webview.ui.forecasterRating.items.items.FooterItem
import com.xbethub.webview.ui.forecasterRating.items.items.HeaderItem
import com.xbethub.webview.ui.forecasterRating.items.items.TableHeaderItem
import com.xbethub.webview.ui.forecasterRating.items.items.TableLineItem
import com.xbethub.webview.ui.home.HomeFragmentDirections

class ForecasterRatingFragment: Fragment(), ItemListener {
    private val consts = App.appComponent.getConstants()
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

        vm.ratingsLiveData.observe(viewLifecycleOwner, Observer {
            when (it.status) {
                Status.LOADING -> onForecastersLoading()
                Status.SUCCESS -> onForecastersLoaded(it.data)
                Status.ERROR -> onForecastersLoadingError(it.error)
            }
        })
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

    private fun onForecastersLoading() {
        clearRatings()

        binding.ratingRV.post {
            (binding.ratingRV.adapter as? ItemAdapter)?.let { adapter ->
                adapter.addAll(2
                    , List(consts.topForecastersCount) { i ->
                        TableLineItem(ForecasterRating(null, i, i + 1 == consts.topForecastersCount))
                    }
                )
            }
        }
    }

    private fun onForecastersLoaded(forecasters: List<User>?) {
        forecasters?.let {
            binding.ratingRV.post {
                (binding.ratingRV.adapter as? ItemAdapter)?.let { adapter ->
                    val items = List(forecasters.size) { i ->
                        TableLineItem(ForecasterRating(forecasters[i], i, i + 1 == consts.topForecastersCount))
                    }

                    if (adapter.itemCount > 3) {
                        adapter.replaceItems(2, items)
                    } else {
                        adapter.insertItems(items, 2)
                    }
                }
            }
        }
    }

    private fun onForecastersLoadingError(error: Throwable?) {

    }

    private fun addItemDecoration() {
        val topSpace = resources.getDimensionPixelSize(R.dimen.ratingTableTopMargin)
        val sideSpace = resources.getDimensionPixelSize(R.dimen.sideMargin)
        val footerTopSpace = resources.getDimensionPixelSize(R.dimen.forecastsFooterTopSpace)
        val bottomSpace = resources.getDimensionPixelSize(R.dimen.footerBottomMargin)

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
        binding.ratingRV.itemAnimator = null
        binding.ratingRV.layoutManager = LinearLayoutManager(requireContext(), RecyclerView.VERTICAL, false)
        val adapter = ItemAdapter(this, vm, this)
        binding.ratingRV.adapter = adapter
        adapter.addAll(listOf(HeaderItem(), TableHeaderItem(), FooterItem()))
    }

    private fun setRatings(ratings: List<ForecasterRating>) {
        binding.ratingRV.post {
            (binding.ratingRV.adapter as? ItemAdapter)?.let {
                if (it.itemCount != 3) {
                    it.removeItems(2, it.itemCount - 3)
                }

                it.addAll(2, ratings.map { TableLineItem(it) })
            }
        }
    }

    private fun clearRatings() {
        binding.ratingRV.post {
            (binding.ratingRV.adapter as? ItemAdapter)?.let {
                if (it.itemCount > 3) {
                    it.removeItems(2, it.itemCount - 3)
                }
            }
        }
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

    override fun onForecasterClick(forecaster: User) {
        val navController = findNavController()
        if (navController.currentDestination!!.id != R.id.profileFragment) {
            navController.navigate(ForecasterRatingFragmentDirections.toProfileFragment(forecaster))
        }
    }
}
