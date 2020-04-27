package com.xbethub.webview.ui.forecast.items.viewHolders

import android.content.Context
import android.view.View
import android.view.inputmethod.InputMethodManager
import androidx.lifecycle.LifecycleOwner
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.databinding.ItemForecastHeaderBinding
import com.xbethub.webview.ui.forecast.ForecastViewModel

class HeaderViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {
    private val binding = ItemForecastHeaderBinding.bind(itemView)
    private val context = itemView.context

    private var searchActive = false

    init {
        updateSearchFieldVisibility()

        binding.topPanel.searchBtn.setOnClickListener { onSearchBtnClick() }
    }


    fun setViewModel(viewModel: ForecastViewModel, viewLifecycleOwner: LifecycleOwner) {
    }

    private fun updateSearchFieldVisibility() {
        binding.topPanel.searchField.visibility = if (searchActive) View.VISIBLE else View.GONE

        if (searchActive) {
            binding.topPanel.searchField.requestFocus()
            showKeyboard()
        }
    }

    fun showKeyboard() {
        val imm = context.getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
        imm.toggleSoftInput(InputMethodManager.SHOW_IMPLICIT, InputMethodManager.HIDE_IMPLICIT_ONLY)
    }

    fun onSearchBtnClick() {
        searchActive = !searchActive
        updateSearchFieldVisibility()
    }
}
