package com.xbethub.webview.ui.home.recycler_view_adapters

import android.util.Log
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.xbethub.webview.R
import com.xbethub.webview.databinding.ItemForecastBinding
import com.xbethub.webview.models.Forecast
import com.xbethub.webview.ui.forecasts.items.ForecastListener
import java.text.SimpleDateFormat

class LastForecastsTableAdapter (private val myDataset: ArrayList<Forecast>, private val forecastListener: ForecastListener) :
    RecyclerView.Adapter<LastForecastsTableAdapter.MyViewHolder>() {
    class MyViewHolder(val forecastCard: ConstraintLayout) : RecyclerView.ViewHolder(forecastCard)

    private val TAG = "LastForecastsTableAdapt"
    private val SERVER_TIME_PATTERN = "yyyy-MM-dd HH:mm:ss"
    private val TIME_FORMAT = "yyyy.MM.dd в HH:mm"
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
//        val binding = ItemForecastBinding.inflate(LayoutInflater.from(parent.context))
//        binding.root
        val forecastCard = LayoutInflater.from(parent.context).inflate(R.layout.item_forecast, parent, false) as ConstraintLayout
//        Log.i(TAG, "onCreateViewHolder $viewType")
        return MyViewHolder(forecastCard)
    }

    override fun onViewRecycled(holder: MyViewHolder) {
        super.onViewRecycled(holder)
    }

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        val binding = ItemForecastBinding.bind(holder.forecastCard)
        val forecast = myDataset[position]
        binding.userName.text = forecast.userName
        binding.categoryName.text = forecast.sportName
        binding.eventName.text = forecast.tournament
        binding.teams.text = forecast.text
        binding.betAmount.fieldValue = forecast.betValue
        binding.coefficient.fieldValue = forecast.coefficient
        binding.commentCount.text = forecast.commentCount.toString()
        binding.rating.text = forecast.rating.toString()
        binding.bookmarkCount.text = forecast.favAmmount.toString()
        binding.gameStart.fieldValue = "-"
        try {
            val date = SimpleDateFormat(SERVER_TIME_PATTERN).parse(forecast.time)
            val time = SimpleDateFormat(TIME_FORMAT).format(date)

            binding.gameStart.fieldValue = time
        } catch (e: Exception) {
            e.printStackTrace()
        }
        Glide.with(binding.avatar).load("http://xbethub.com" + forecast.userAvatar).into(binding.avatar)
        val IDK_why_this_need = 0
        holder.forecastCard.setOnClickListener { forecastListener.onForecastClick(forecast = forecast, position = IDK_why_this_need) }
    }

    override fun getItemCount() = myDataset.size
}
