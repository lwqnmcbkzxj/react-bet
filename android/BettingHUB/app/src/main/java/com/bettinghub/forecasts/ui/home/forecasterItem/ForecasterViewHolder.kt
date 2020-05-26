package com.bettinghub.forecasts.ui.home.forecasterItem

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.bettinghub.forecasts.Utils
import com.bettinghub.forecasts.databinding.ItemForecasterBinding
import com.bettinghub.forecasts.models.User

class ForecasterViewHolder(val width: Int, itemView: View): RecyclerView.ViewHolder(itemView) {
    private val binding = ItemForecasterBinding.bind(itemView)
    private var user: User? = null

    init {
        binding.main.layoutParams.width = width
    }

    fun setUser(user: User?) {
        this.user = user

        user?.let {
            binding.userName.text = user.login
            binding.stats.text = Utils.round(user.stats.roi?.toFloat() ?: 0f, 2).toString()

            Utils.loadAvatar(binding.avatar, user.avatar)

            binding.loading.visibility = View.GONE
            binding.loading1.visibility = View.GONE
            binding.loading2.visibility = View.GONE
            binding.statsBlock.visibility = View.VISIBLE
            binding.userName.visibility = View.VISIBLE
        } ?: run {
            binding.loading.visibility = View.VISIBLE
            binding.loading1.visibility = View.VISIBLE
            binding.loading2.visibility = View.VISIBLE
            binding.statsBlock.visibility = View.INVISIBLE
            binding.userName.visibility = View.INVISIBLE
        }
    }

    fun setListener(listener: ForecasterListener) {
        binding.root.setOnClickListener {
            user?.let {
                listener.onForecasterClick(it, adapterPosition)
            }
        }
    }
}
