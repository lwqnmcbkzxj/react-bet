package com.xbethub.webview.ui.profile.forecasts

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.R
import com.xbethub.webview.databinding.FragmentProfileForecastsBinding
import com.xbethub.webview.models.Forecast
import com.xbethub.webview.ui.forecast.ForecastViewModel
import com.xbethub.webview.ui.forecasts.items.ForecastListener
import com.xbethub.webview.ui.forecasts.items.ForecastItemAdapter
import com.xbethub.webview.ui.forecasts.items.ForecastItemDecoration
import com.xbethub.webview.ui.forecasts.items.items.FooterItem
import com.xbethub.webview.ui.forecasts.items.items.ForecastItem
import com.xbethub.webview.ui.forecasts.items.items.Item

class ForecastsFragment: Fragment(), ForecastListener {

    private lateinit var binding: FragmentProfileForecastsBinding

    val viewModel by viewModels<ForecastsViewModel>()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentProfileForecastsBinding.inflate(inflater)

        addItemDecoration()

        binding.rv.layoutManager = LinearLayoutManager(requireContext(), RecyclerView.VERTICAL, false)
        val adapter = ForecastItemAdapter(this, null, null)
        binding.rv.adapter = adapter

        val items = ArrayList<Item>()

        viewModel.forecastsLiveData.observe(viewLifecycleOwner, Observer {
            println(it.data?.size)
            it.data?.forEach {
                items.add(ForecastItem(it))
            } ?: return@Observer

            items.add(FooterItem())

            adapter.addAll(items)
        })
        viewModel.id.value = requireArguments().getInt("user_id")



        return binding.root
    }

    private fun addItemDecoration() {
        val topSpace = resources.getDimensionPixelSize(R.dimen.forecastsItemTopSpace)
        val sideSpace = resources.getDimensionPixelSize(R.dimen.forecastSideMargin)
        val itemSpace = resources.getDimensionPixelSize(R.dimen.forecastsItemSpace)
        val showMoreTopSpace = resources.getDimensionPixelSize(R.dimen.forecastsShowMoreTopSpace)
        val footerTopSpace = resources.getDimensionPixelSize(R.dimen.forecastsFooterTopSpace)
        val bottomSpace = resources.getDimensionPixelSize(R.dimen.footerBottomMargin)

        binding.rv.addItemDecoration(
            ForecastItemDecoration(
                topSpace
                , sideSpace
                , itemSpace
                , showMoreTopSpace
                , footerTopSpace
                , bottomSpace
            )
        )
    }

    // ForecastListener
    override fun onForecastClick(forecast: Forecast, position: Int) {

    }
}
