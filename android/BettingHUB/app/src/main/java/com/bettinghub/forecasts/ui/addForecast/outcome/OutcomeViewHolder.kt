package com.bettinghub.forecasts.ui.addForecast.outcome

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.bettinghub.forecasts.databinding.ItemOutcomeBinding

class OutcomeViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {
    private val binding = ItemOutcomeBinding.bind(itemView)
    private lateinit var outcomeItem: OutcomeItem

    fun setOutcomeItem(outcomeItem: OutcomeItem) {
        this.outcomeItem = outcomeItem
        binding.outcome.text = outcomeItem.outcome
    }

    fun setListener(outcomeListener: OutcomeListener) {
        binding.removeBtn.setOnClickListener {
            outcomeListener.onRemoveOutcomeItemClick(outcomeItem, adapterPosition)
        }
    }
}
