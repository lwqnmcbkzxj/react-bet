package com.xbethub.webview.ui.forecasts

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.NavController
import androidx.navigation.Navigation
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.R
import com.xbethub.webview.databinding.FragmentForecastsBinding
import com.xbethub.webview.models.Forecast
import com.xbethub.webview.ui.forecasts.items.ItemDecoration
import com.xbethub.webview.ui.forecasts.items.ForecastListener
import com.xbethub.webview.ui.forecasts.items.ItemAdapter
import com.xbethub.webview.ui.forecasts.items.items.*


class ForecastsFragment : Fragment(),
    ForecastListener {

    private lateinit var navController: NavController
    private lateinit var binding: FragmentForecastsBinding
    private lateinit var vm: ForecastsViewModel

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentForecastsBinding.inflate(inflater)
        binding.fragment = this
        binding.lifecycleOwner = this

        addItemDecoration()

        navController = activity?.let { Navigation.findNavController(it, R.id.nav_host_fragment) }!!

        vm = ViewModelProviders.of(this).get(ForecastsViewModel::class.java)
        vm.forecastsLiveData.observe(viewLifecycleOwner, Observer { addForecasts(it) })

        binding.viewModel = vm

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
        val footerTopSpace = resources.getDimensionPixelSize(R.dimen.forecastsShowMoreTopSpace)
        val bottomSpace = resources.getDimensionPixelSize(R.dimen.forecastsItemBottomSpace)

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

    private fun addForecasts(forecasts: List<Forecast>) {
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
            (binding.forecastRV.adapter as ItemAdapter).let { itemAdapter ->
                itemAdapter.addAll(itemAdapter.itemCount - 2, forecasts.map { ForecastItem(it) })
            }
        }
    }

    // ForecastListener
    override fun onForecastClick(forecast: Forecast, position: Int) {

    }
}
