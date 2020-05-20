package com.xbethub.webview.ui.match.items.viewHolders

import android.annotation.SuppressLint
import android.graphics.Bitmap
import android.graphics.Color
import android.graphics.DashPathEffect
import android.graphics.PathDashPathEffect
import android.graphics.drawable.Drawable
import android.view.View
import androidx.lifecycle.LifecycleOwner
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bumptech.glide.request.target.CustomTarget
import com.bumptech.glide.request.transition.Transition
import com.github.mikephil.charting.components.XAxis
import com.github.mikephil.charting.components.XAxis.XAxisPosition
import com.github.mikephil.charting.data.BarData
import com.github.mikephil.charting.data.BarDataSet
import com.github.mikephil.charting.data.BarEntry
import com.github.mikephil.charting.formatter.ValueFormatter
import com.xbethub.webview.App
import com.xbethub.webview.R
import com.xbethub.webview.databinding.ItemMatchHeaderBinding
import com.xbethub.webview.ui.bookmaker.BookmakerViewModel
import com.xbethub.webview.ui.match.items.items.HeaderItem
import java.lang.ref.WeakReference
import java.text.SimpleDateFormat
import java.util.*
import java.util.concurrent.TimeUnit
import kotlin.concurrent.schedule
import kotlin.math.abs

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
        Date(System.currentTimeMillis() + TimeUnit.SECONDS.toMillis(5)).let {
            binding.date.text = dateFormat.format(it)
            binding.time.text = timeFormat.format(it)
            val bindingWR = WeakReference(binding)
            Timer().schedule(0, 1000) {
                val timeToEvent = it.time - System.currentTimeMillis()
                val hours = TimeUnit.MILLISECONDS.toHours(timeToEvent)
                val minutes = TimeUnit.MILLISECONDS.toMinutes(timeToEvent)
                val seconds = TimeUnit.MILLISECONDS.toSeconds(timeToEvent)
                val sb = StringBuilder()
                if (hours > 23) {
                    val days = TimeUnit.HOURS.toDays(hours)
                    sb.append(days).append("д : ")
                }
                if (hours > 0) {
                    println(abs(hours))
                    sb.append(hours % 24).append("ч : ")
                }
                if (minutes > 0) {
                    sb.append(minutes % 60).append("м : ")
                }
                if (seconds > 0) {
                    sb.append(seconds % 60).append("c")
                } else {
                    sb.append("0ч : 0м : 0с")
                }
                bindingWR.get().let {
                    if (it != null) {
                        it.timeToEvent.post {
                            it.timeToEvent.text = sb.toString()
                        }
                    } else {
                        cancel()
                    }
                }
            }
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
        if (match.championship.sportId == 5) {
            binding.team1Image.setImageResource(R.drawable.sport_other)
            binding.team2Image.setImageResource(R.drawable.sport_other)
        } else {
            Glide.with(itemView.context).asDrawable().load("http://betting-hub.sixhands.co${match.championship.sportImage}").into(object : CustomTarget<Drawable>() {
                override fun onLoadCleared(placeholder: Drawable?) {

                }

                override fun onResourceReady(resource: Drawable, transition: Transition<in Drawable>?) {
                    binding.team1Image.setImageDrawable(resource)
                    binding.team2Image.setImageDrawable(resource)
                }
            })
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
