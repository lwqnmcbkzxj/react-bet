package com.xbethub.webview.ui.forecasts

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.NavController
import androidx.navigation.Navigation
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.App
import com.xbethub.webview.R
import com.xbethub.webview.Utils
import com.xbethub.webview.databinding.FragmentForecastsBinding
import com.xbethub.webview.models.Forecast
import com.xbethub.webview.ui.forecasts.items.ItemDecoration
import com.xbethub.webview.ui.forecasts.items.ForecastListener
import com.xbethub.webview.ui.forecasts.items.ItemAdapter
import com.xbethub.webview.ui.forecasts.items.items.*


class ForecastsFragment : Fragment(), ForecastListener {

    private lateinit var navController: NavController
    private lateinit var binding: FragmentForecastsBinding
    private lateinit var vm: ForecastsViewModel

    private var searchActive = false

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentForecastsBinding.inflate(inflater)
        binding.lifecycleOwner = this


        binding.topPanel.bankBalance.balance = "1 500 xB"
        binding.topPanel.bankBalance.root.visibility = if (App.appComponent.getAppData().activeUser == null) View.GONE else View.VISIBLE
        binding.topPanel.searchBtn.setOnClickListener { onSearchBtnClick() }

        addItemDecoration()

        navController = activity?.let { Navigation.findNavController(it, R.id.nav_host_fragment) }!!

        vm = ViewModelProvider(this).get(ForecastsViewModel::class.java)
        vm.forecastsLiveData.observe(viewLifecycleOwner, Observer { addForecasts(it) })
        vm.forecastsClearLiveData.observe(viewLifecycleOwner, Observer { removeAllForecasts() })

        updateSearchFieldVisibility()

        return binding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        vm.onCreate()
    }

    private fun addItemDecoration() {
        val topSpace = resources.getDimensionPixelSize(R.dimen.forecastsItemTopSpace)
        val sideSpace = resources.getDimensionPixelSize(R.dimen.forecastSideMargin)
        val itemSpace = resources.getDimensionPixelSize(R.dimen.forecastsItemSpace)
        val showMoreTopSpace = resources.getDimensionPixelSize(R.dimen.forecastsShowMoreTopSpace)
        val footerTopSpace = resources.getDimensionPixelSize(R.dimen.forecastsFooterTopSpace)
        val bottomSpace = resources.getDimensionPixelSize(R.dimen.footerBottomMargin)

        binding.forecastRV.addItemDecoration(
            ItemDecoration(
                topSpace
                , sideSpace
                , itemSpace
                , showMoreTopSpace
                , footerTopSpace
                , bottomSpace
            )
        )
    }

    private fun removeAllForecasts() {
        binding.forecastRV.post {
            (binding.forecastRV.adapter as? ItemAdapter)?.let {
                if (it.itemCount - 3 > 0) {
                    it.removeItems(1, it.itemCount - 3)
                }
            }
        }
    }

    private fun addForecasts(forecasts: List<Forecast?>) {
        if (binding.forecastRV.adapter == null) {
            val items = ArrayList<Item>()

            binding.forecastRV.layoutManager =
                LinearLayoutManager(context, RecyclerView.VERTICAL, false)
            val adapter =
                ItemAdapter(
                    this, vm, this
                )
            binding.forecastRV.adapter = adapter

            items.add(HeaderItem())
            items.addAll(forecasts.map { ForecastItem(it) })
            items.add(ShowMoreBtnItem())
            items.add(FooterItem())

            (binding.forecastRV.adapter as ItemAdapter).addAll(items)
        } else {
            binding.forecastRV.post {
                (binding.forecastRV.adapter as ItemAdapter).let { itemAdapter ->
                    itemAdapter.addAll(itemAdapter.itemCount - 2, forecasts.map { ForecastItem(it) })
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

    // ForecastListener
    override fun onForecastClick(forecast: Forecast, position: Int) {
        navController.navigate(ForecastsFragmentDirections.toForecastFragment(forecast))
    }
}
