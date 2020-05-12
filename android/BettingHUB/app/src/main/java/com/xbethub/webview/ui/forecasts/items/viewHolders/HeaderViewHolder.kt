package com.xbethub.webview.ui.forecasts.items.viewHolders

import android.content.Context
import android.os.Build
import android.view.View
import android.view.inputmethod.InputMethodManager
import android.widget.AdapterView
import android.widget.ArrayAdapter
import androidx.core.content.ContextCompat
import androidx.core.content.res.ResourcesCompat
import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.RecyclerView
import com.google.android.flexbox.FlexDirection
import com.google.android.flexbox.FlexboxItemDecoration
import com.google.android.flexbox.FlexboxLayoutManager
import com.google.android.flexbox.JustifyContent
import com.xbethub.webview.App
import com.xbethub.webview.R
import com.xbethub.webview.Utils
import com.xbethub.webview.databinding.ItemForecastsHeaderBinding
import com.xbethub.webview.enums.ForecastType
import com.xbethub.webview.enums.TimeInterval
import com.xbethub.webview.models.Sport
import com.xbethub.webview.ui.forecasts.ForecastFilter
import com.xbethub.webview.ui.forecasts.ForecastsViewModel
import com.xbethub.webview.ui.forecasts.sportItem.SportAdapter
import com.xbethub.webview.ui.forecasts.sportItem.SportItem

class HeaderViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {
    private val binding = ItemForecastsHeaderBinding.bind(itemView)
    private val context = itemView.context

    private var extraFiltersVisible = false

    private var activeSport: Sport? = null
    private var activeTimeInterval: TimeInterval? = null

    init {
        updateExtraFiltersVisibility()

        binding.viewHolder = this
        binding.timeIntervalSpinner.adapter = ArrayAdapter(context!!, R.layout.row_time_interval, R.id.text
            , TimeInterval.values().map { itemView.resources.getString(it.stringRes) })
    }

    fun setViewModel(viewModel: ForecastsViewModel, viewLifecycleOwner: LifecycleOwner) {
        binding.viewModel = viewModel
        addSportItems(viewModel, viewLifecycleOwner)
        viewModel.forecastFilterLiveData.observe(viewLifecycleOwner, Observer { updateFilterViews(it) })

        binding.timeIntervalSpinner.onItemSelectedListener = object: AdapterView.OnItemSelectedListener {
            override fun onItemSelected(
                parent: AdapterView<*>?,
                view: View?,
                position: Int,
                id: Long
            ) {
                viewModel.onTimeIntervalSelected(TimeInterval.values()[position])
            }

            override fun onNothingSelected(parent: AdapterView<*>?) {
            }
        }
    }

    private fun addSportItems(viewModel: ForecastsViewModel, viewLifecycleOwner: LifecycleOwner) {
        val flexboxLayoutManager = FlexboxLayoutManager(context!!, FlexDirection.ROW)

        flexboxLayoutManager.justifyContent = JustifyContent.FLEX_START

        binding.sportRV.layoutManager = flexboxLayoutManager

        val paddingDecoration = FlexboxItemDecoration(context)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            paddingDecoration.setDrawable(context!!.getDrawable(R.drawable.flex_divider))
        } else {
            paddingDecoration.setDrawable(ContextCompat.getDrawable(context!!, R.drawable.flex_divider))
        }

        binding.sportRV.addItemDecoration(paddingDecoration)

        val adapter = SportAdapter(viewModel)
        binding.sportRV.adapter = adapter

        val constants = App.appComponent.getConstants()

        constants.sports.value?.let { sports ->
            adapter.addAll(sports.map { SportItem(it) })
            viewModel.onSportItemClick(sports[0])
        } ?: run {
            constants.sports.observe(viewLifecycleOwner, Observer {
                it?.let {
                    sports -> adapter.addAll(sports.map { SportItem(it) })
                    viewModel.onSportItemClick(sports[0])
                }
            })
        }
    }

    private fun updateFilterViews(forecastFilter: ForecastFilter) {
        // FilterType
        val inactiveFont = ResourcesCompat.getFont(context!!, R.font.roboto_regular)
        val activeFont = ResourcesCompat.getFont(context!!, R.font.roboto_medium)

        binding.subscriptionsBtn.typeface = inactiveFont
        binding.allForecastsBtn.typeface = inactiveFont
        binding.paidBtn.typeface = inactiveFont

        when (forecastFilter.forecastType) {
            ForecastType.SUBSCRIPTION -> binding.subscriptionsBtn.typeface = activeFont
            ForecastType.ALL -> binding.allForecastsBtn.typeface = activeFont
            ForecastType.PAID -> binding.paidBtn.typeface = activeFont
        }

        // Sport
        (binding.sportRV.adapter as? SportAdapter)?.let { sportAdapter ->
            activeSport?.let {
                sportAdapter.getItem(it.id).active = false
                sportAdapter.notifyItemChanged(it.id)
            }

            activeSport = forecastFilter.sport

            activeSport?.let {
                sportAdapter.getItem(it.id).active = true
                sportAdapter.notifyItemChanged(it.id)
            }
        }

        // TimeInterval
        activeTimeInterval = forecastFilter.timeInterval
        binding.timeIntervalSpinner.setSelection(activeTimeInterval!!.ordinal)
    }

    private fun updateExtraFiltersVisibility() {
        binding.extraFilterFields.visibility = if (extraFiltersVisible) View.VISIBLE else View.GONE
    }

    fun onExtraFiltersBtnClick() {
        extraFiltersVisible = !extraFiltersVisible;
        updateExtraFiltersVisibility()
    }
}
