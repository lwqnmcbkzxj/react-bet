package com.xbethub.webview.ui.home.forecasterItem

import android.graphics.Matrix
import android.graphics.drawable.Drawable
import android.view.View
import android.widget.ImageView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bumptech.glide.load.DataSource
import com.bumptech.glide.load.engine.GlideException
import com.bumptech.glide.request.RequestListener
import com.bumptech.glide.request.target.Target
import com.xbethub.webview.R
import com.xbethub.webview.Utils
import com.xbethub.webview.databinding.ItemForecasterBinding
import com.xbethub.webview.models.User

class ForecasterItemViewHolder(val width: Int, itemView: View): RecyclerView.ViewHolder(itemView) {
    private val binding = ItemForecasterBinding.bind(itemView)

    init {
        binding.main.layoutParams.width = width
    }

    fun setUser(user: User?) {
        user?.let {
            binding.userName.text = user.login
            binding.stats.text = Utils.round(user.stats.roi.toDouble(), 2).toString()

            it.avatar?.let {
                Glide.with(binding.avatar).load("http://xbethub.com" + it).addListener(object : RequestListener<Drawable> {

                    override fun onLoadFailed(
                        e: GlideException?,
                        model: Any?,
                        target: Target<Drawable>?,
                        isFirstResource: Boolean
                    ): Boolean {
                        binding.avatar.scaleType = ImageView.ScaleType.FIT_CENTER
                        binding.avatar.setImageResource(R.drawable.default_avatar)

                        return true
                    }
                    override fun onResourceReady(
                        resource: Drawable?,
                        model: Any?,
                        target: Target<Drawable>?,
                        dataSource: DataSource?,
                        isFirstResource: Boolean
                    ): Boolean {
                        resource?.let {
                            val w = resource.intrinsicWidth.toFloat()
                            val h = resource.intrinsicHeight.toFloat()
                            val matrix = Matrix()

                            val scale = Math.max( width / w, width / h)

                            matrix.setScale(scale, scale)

                            binding.avatar.scaleType = ImageView.ScaleType.MATRIX
                            binding.avatar.imageMatrix = matrix
                        }

                        return false
                    }
                }).into(binding.avatar)
            } ?: run {
                binding.avatar.scaleType = ImageView.ScaleType.FIT_CENTER
                binding.avatar.setImageResource(R.drawable.default_avatar)
            }

            binding.loading.visibility = View.GONE
        } ?: run {
            binding.loading.visibility = View.VISIBLE
        }
    }
}
