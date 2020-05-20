package com.xbethub.webview.ui.match.items.viewHolders

import android.annotation.SuppressLint
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
import com.xbethub.webview.App
import com.xbethub.webview.databinding.ItemMatchHeaderBinding
import com.xbethub.webview.ui.bookmaker.BookmakerViewModel
import com.xbethub.webview.ui.match.items.items.HeaderItem
import java.text.SimpleDateFormat
import java.util.*
import java.util.concurrent.TimeUnit

class HeaderViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {

    val serverDateFormat = SimpleDateFormat(App.appComponent.getConstants().serverTimePattern)
    val timeFormat = SimpleDateFormat("HH:mm")
    val dateFormat = SimpleDateFormat("dd.MM.yyyy")

    private val binding = ItemMatchHeaderBinding.bind(itemView)

    @SuppressLint("ClickableViewAccessibility")
    fun setHeaderItem(headerItem: HeaderItem) {
        val match = headerItem.match

        binding.team1Name.text = match.team1.name
        binding.team2Name.text = match.team2.name
        Date(System.currentTimeMillis() + TimeUnit.HOURS.toMillis(1)).let {
            binding.date.text = dateFormat.format(it)
            binding.time.text = timeFormat.format(it)
            val timeToEvent = it.time - System.currentTimeMillis()
            val hours = TimeUnit.MILLISECONDS.toHours(timeToEvent)
            val minutes = TimeUnit.MILLISECONDS.toMinutes(timeToEvent)
            val seconds = TimeUnit.MILLISECONDS.toSeconds(timeToEvent)
            val sb = StringBuilder()
            if (hours >= 24) {
                val days = TimeUnit.HOURS.toDays(hours)
                sb.append(days).append("д : ")
            }
            if (hours >= 0) {
                sb.append(hours % 24).append("ч : ")
            }
            if (minutes >= 0) {
                sb.append(minutes % 60).append("м : ")
            }
            sb.append(seconds % 60).append("c")
            binding.timeToEvent.text = sb.toString()
        }
        binding.league.text = match.championship.championship

        binding.barChart.data = BarData(BarDataSet(listOf(BarEntry(0f, 80f), BarEntry(1f, 42f), BarEntry(2f, 30f), BarEntry(3f, 50f), BarEntry(4f, 58f), BarEntry(5f, 10f)), null).apply {
            color = Color.parseColor("#D5D8DD")
        }).apply {
            barWidth = 0.5f
            setDrawValues(false)
        }
        binding.barChart.setDrawGridBackground(false)
        binding.barChart.setOnTouchListener { _, _ ->
            true
        }
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
