package com.bettinghub.forecasts.ui.forecasterRating.items.viewHolders

import android.os.Build
import android.view.View
import androidx.core.content.ContextCompat
import androidx.core.content.res.ResourcesCompat
import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.Observer
import com.google.android.flexbox.FlexDirection
import com.google.android.flexbox.FlexboxItemDecoration
import com.google.android.flexbox.FlexboxLayoutManager
import com.google.android.flexbox.JustifyContent
import com.bettinghub.forecasts.App
import com.bettinghub.forecasts.R
import com.bettinghub.forecasts.databinding.ItemForecasterRatingHeaderBinding
import com.bettinghub.forecasts.enums.RatingTimeInterval
import com.bettinghub.forecasts.models.Sport
import com.bettinghub.forecasts.ui.forecasterRating.ForecasterRatingViewModel
import com.bettinghub.forecasts.ui.forecasterRating.RatingFilter
import com.bettinghub.forecasts.ui.forecasterRating.items.ItemListener
import com.bettinghub.forecasts.ui.forecasts.sportItem.SportAdapter
import com.bettinghub.forecasts.ui.forecasts.sportItem.SportItem

class HeaderViewHolder(itemView: View): BaseViewHolder(itemView) {
    private val binding = ItemForecasterRatingHeaderBinding.bind(itemView)
    private val context = itemView.context

    private var extraFiltersVisible = false
    private var activeSport: Sport? = null

    init {
        binding.viewHolder = this
        updateExtraFiltersVisibility()
    }

    override fun setViewModel(
        viewModel: ForecasterRatingViewModel,
        viewLifecycleOwner: LifecycleOwner
    ) {
        binding.viewModel = viewModel
        addSportItems(viewModel, viewLifecycleOwner)
        viewModel.filterLiveData.observe(viewLifecycleOwner, Observer { updateFilterViews(it) })
    }

    override fun setListener(listener: ItemListener) {

    }

    private fun updateExtraFiltersVisibility() {
        binding.sportRV.visibility = if (extraFiltersVisible) View.VISIBLE else View.GONE
    }

    private fun updateFilterViews(filter: RatingFilter) {
        // RatingTimeInterval
        val inactiveFont = ResourcesCompat.getFont(context!!, R.font.roboto_regular)
        val activeFont = ResourcesCompat.getFont(context!!, R.font.roboto_medium)

        binding.allTimeBtn.typeface = inactiveFont
        binding.monthBtn.typeface = inactiveFont

        when (filter.timeInterval) {
            RatingTimeInterval.ALL_TIME -> binding.allTimeBtn.typeface = activeFont
            RatingTimeInterval.MONTH -> binding.monthBtn.typeface = activeFont
        }

        // Sport
        (binding.sportRV.adapter as? SportAdapter)?.let { sportAdapter ->
            activeSport?.let {
                sportAdapter.getItem(it.id).active = false
                sportAdapter.notifyItemChanged(it.id)
            }

            activeSport = filter.sport

            activeSport?.let {
                sportAdapter.getItem(it.id).active = true
                sportAdapter.notifyItemChanged(it.id)
            }
        }
    }

    private fun addSportItems(viewModel: ForecasterRatingViewModel, viewLifecycleOwner: LifecycleOwner) {
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
                it?.let { sports ->
                    adapter.addAll(sports.map { SportItem(it) })
                    viewModel.onSportItemClick(it[0])
                }
            })
        }
    }

    fun onExtraFiltersBtnClick() {
        extraFiltersVisible = !extraFiltersVisible;
        updateExtraFiltersVisibility()
    }
}
