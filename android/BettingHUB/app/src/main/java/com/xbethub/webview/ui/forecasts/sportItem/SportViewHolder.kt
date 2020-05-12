package com.xbethub.webview.ui.forecasts.sportItem

import android.graphics.Color
import android.view.View
import android.widget.TextView
import androidx.core.content.res.ResourcesCompat
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.R
import com.xbethub.webview.models.Sport

class SportViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {
    private lateinit var sport: Sport

    fun setSportItem(sportItem: SportItem) {
        sport = sportItem.sport

        val textView = itemView as TextView

        textView.text = sportItem.sport.name

        val activeTypeFace = ResourcesCompat.getFont(itemView.context, R.font.roboto_medium)
        val inactiveTypeFace = ResourcesCompat.getFont(itemView.context, R.font.roboto_regular)

        textView.setTypeface(if (sportItem.active) activeTypeFace else inactiveTypeFace)

        if (sportItem.active) {
            textView.setBackgroundResource(R.drawable.bg_filter)
        } else {
            textView.setBackgroundColor(Color.TRANSPARENT)
        }
    }

    fun setListener(listener: SportListener) {
        itemView.setOnClickListener { listener.onSportItemClick(sport) }
    }
}
