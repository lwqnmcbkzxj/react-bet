package com.bettinghub.forecasts.ui.profile.forecasts

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.Observer
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.bettinghub.forecasts.R
import com.bettinghub.forecasts.databinding.FragmentProfileForecastsBinding
import com.bettinghub.forecasts.models.Forecast
import com.bettinghub.forecasts.ui.forecasts.items.ForecastListener
import com.bettinghub.forecasts.ui.forecasts.items.ForecastItemAdapter
import com.bettinghub.forecasts.ui.forecasts.items.ForecastItemDecoration
import com.bettinghub.forecasts.ui.forecasts.items.items.FooterItem
import com.bettinghub.forecasts.ui.forecasts.items.items.ForecastItem
import com.bettinghub.forecasts.ui.forecasts.items.items.Item

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
        val adapter = ForecastItemAdapter(this, null, null, findNavController())
        binding.rv.adapter = adapter

        val items = ArrayList<Item>()

        viewModel.forecastsLiveData.observe(viewLifecycleOwner, Observer {
            it.data?.forEach {
                items.add(ForecastItem(it))
            } ?: return@Observer

            items.add(FooterItem())

            adapter.addAll(items)
        })
        viewModel.id.value = arguments?.getInt("user_id") ?: -1

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
