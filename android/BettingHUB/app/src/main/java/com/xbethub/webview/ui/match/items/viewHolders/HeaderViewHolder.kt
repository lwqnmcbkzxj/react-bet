package com.xbethub.webview.ui.match.items.viewHolders

import android.graphics.Color
import android.graphics.DashPathEffect
import android.graphics.PathDashPathEffect
import android.view.View
import androidx.lifecycle.LifecycleOwner
import androidx.recyclerview.widget.RecyclerView
import com.github.mikephil.charting.components.XAxis
import com.github.mikephil.charting.components.XAxis.XAxisPosition
import com.github.mikephil.charting.data.BarData
import com.github.mikephil.charting.data.BarDataSet
import com.github.mikephil.charting.data.BarEntry
import com.github.mikephil.charting.formatter.ValueFormatter
import com.xbethub.webview.databinding.ItemMatchHeaderBinding
import com.xbethub.webview.ui.bookmaker.BookmakerViewModel
import com.xbethub.webview.ui.match.items.items.HeaderItem

class HeaderViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {
    private val SERVER_TIME_PATTERN = "yyyy-MM-dd HH:mm:ss"
    private val TIME_FORMAT = "yyyy.MM.dd в HH:mm"

    private val binding = ItemMatchHeaderBinding.bind(itemView)
    private val context = itemView.context

    fun setHeaderItem(headerItem: HeaderItem) {
        val match = headerItem.match

        binding.barChart.data = BarData(BarDataSet(listOf(BarEntry(0f, 80f), BarEntry(1f, 42f), BarEntry(2f, 30f), BarEntry(3f, 50f), BarEntry(4f, 58f), BarEntry(5f, 10f)), null).apply {
            color = Color.parseColor("#D5D8DD")
        }).apply {
            barWidth = 0.5f
            setDrawValues(false)
        }
        binding.barChart.setDrawGridBackground(false)
        val xAxis = binding.barChart.xAxis
        xAxis.position = XAxisPosition.BOTTOM
        xAxis.enableAxisLineDashedLine(5f, 2.5f, 0f)
        xAxis.setDrawGridLines(false)
        xAxis.granularity = 1f
        xAxis.labelCount = 7
        xAxis.valueFormatter = object : ValueFormatter() {
            override fun getFormattedValue(value: Float) = when(value) {
                0f -> "П1"
                1f -> "X"
                2f -> "П2"
                3f -> "ТБ"
                4f -> "ТМ"
                5f -> "Другое"
                else -> ""
            }
        }

        binding.barChart.axisLeft.granularity = 20f
        binding.barChart.axisLeft.setDrawGridLines(true)
        binding.barChart.axisLeft.enableGridDashedLine(5f, 2.5f, 0f)
        binding.barChart.axisRight.isEnabled = false

        binding.barChart.legend.isEnabled = false
        binding.barChart.description.isEnabled = false
    }

    fun setViewModel(viewModel: BookmakerViewModel, viewLifecycleOwner: LifecycleOwner) {
    }
}
