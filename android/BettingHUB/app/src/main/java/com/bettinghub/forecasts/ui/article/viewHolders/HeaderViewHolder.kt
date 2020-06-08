package com.bettinghub.forecasts.ui.article.viewHolders

import android.annotation.SuppressLint
import android.view.View
import androidx.core.content.ContextCompat
import androidx.lifecycle.LifecycleOwner
import androidx.navigation.NavController
import androidx.recyclerview.widget.RecyclerView
import com.bettinghub.forecasts.App
import com.bumptech.glide.Glide
import com.bettinghub.forecasts.R
import com.bettinghub.forecasts.backend.BettingHubBackend
import com.bettinghub.forecasts.databinding.ItemForecastHeaderBinding
import com.bettinghub.forecasts.models.User
import com.bettinghub.forecasts.ui.LoginFragmentDirections
import com.bettinghub.forecasts.ui.article.ItemListener
import com.bettinghub.forecasts.ui.article.items.HeaderItem
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers
import kotlinx.android.synthetic.main.article_list_item.view.*
import kotlinx.android.synthetic.main.article_list_item_header.view.*
import kotlinx.android.synthetic.main.article_list_item_header.view.downVoteButton
import kotlinx.android.synthetic.main.article_list_item_header.view.imageView
import kotlinx.android.synthetic.main.article_list_item_header.view.likeCount
import kotlinx.android.synthetic.main.article_list_item_header.view.recommendations
import kotlinx.android.synthetic.main.article_list_item_header.view.title
import kotlinx.android.synthetic.main.article_list_item_header.view.upVoteButton
import java.text.SimpleDateFormat

class HeaderViewHolder(itemView: View, val navController: NavController) : RecyclerView.ViewHolder(itemView) {

    val imageView = itemView.imageView!!
    val recommendations = itemView.recommendations!!
    val commentCount = itemView.commentCount1!!
    val likeCount = itemView.likeCount!!
    val downVoteButton = itemView.downVoteButton!!
    val upVoteButton = itemView.upVoteButton!!
    val title = itemView.title!!
    private var user: User? = null

    @SuppressLint("SimpleDateFormat", "SetTextI18n")
    fun setHeaderItem(headerItem: HeaderItem) {
        val article = headerItem.article

        recommendations.text = article.content
        commentCount.text = article.commentCount.toString()
        likeCount.text = article.rating.toString()
        title.text = article.title
        var liked = false
        var disliked = false
        downVoteButton.setOnClickListener {
            if (App.appComponent.getAppData().activeUser == null) {
                navController.navigate(LoginFragmentDirections.actionGlobalLoginFragment(R.id.profileFragment))
                return@setOnClickListener
            }
            BettingHubBackend().api.dislikeArticle(article.id, "Bearer ${App.appComponent.getAppData().activeUser?.accessToken}")
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe({
                    if (it.isSuccessful) {
                        if (!disliked) {
                            article.rating--
                            if (liked) {
                                article.rating--
                                liked = false
                            }
                        } else {
                            article.rating++
                        }
                        likeCount.text = article.rating.toString()
                        disliked = !disliked
                    }
                }, {
                    it.printStackTrace()
                })
        }
        upVoteButton.setOnClickListener {
            if (App.appComponent.getAppData().activeUser == null) {
                navController.navigate(LoginFragmentDirections.actionGlobalLoginFragment(R.id.profileFragment))
                return@setOnClickListener
            }
            BettingHubBackend().api.likeArticle(article.id, "Bearer ${App.appComponent.getAppData().activeUser?.accessToken}")
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe({
                    if (it.isSuccessful) {
                        if (!liked) {
                            article.rating++
                            if (disliked) {
                                article.rating++
                                disliked = false
                            }
                        } else {
                            article.rating--
                        }
                        likeCount.text = article.rating.toString()
                        liked = !liked
                    }
                }, {
                    it.printStackTrace()
                })
        }
    }
}
