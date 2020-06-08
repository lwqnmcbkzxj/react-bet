package com.bettinghub.forecasts.ui.article.viewHolders

import android.view.View
import androidx.databinding.ViewDataBinding
import androidx.navigation.NavController
import androidx.recyclerview.widget.RecyclerView
import com.bettinghub.forecasts.App
import com.bettinghub.forecasts.R
import com.bettinghub.forecasts.backend.BettingHubBackend
import com.bettinghub.forecasts.databinding.ItemComment0LevelBinding
import com.bettinghub.forecasts.models.Comment
import com.bettinghub.forecasts.ui.LoginFragmentDirections
import com.bettinghub.forecasts.ui.article.ItemListener
import com.bettinghub.forecasts.ui.article.items.CommentItem
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers
import kotlinx.android.synthetic.main.item_comment_0_level.view.*
import java.text.SimpleDateFormat

open class CommentViewHolder(itemView: View, val navController: NavController): RecyclerView.ViewHolder(itemView) {
    lateinit var comment: Comment

    fun setCommentItem(commentItem: CommentItem) {

        this.comment = commentItem.comment
        val time = SimpleDateFormat("yyyy.MM.dd в HH:mm").format(
            SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS").parse(comment.createdAt)!!
        )
        itemView.time.text = time
        itemView.text.text = comment.text
        itemView.rating.text = comment.rating.toString()
        itemView.replyBtn.setOnClickListener {
            if (App.appComponent.getAppData().activeUser == null) {
                navController.navigate(LoginFragmentDirections.actionGlobalLoginFragment(R.id.profileFragment))
                return@setOnClickListener
            }
            itemView.commentLayout.visibility = if(itemView.commentLayout.visibility == View.GONE) View.VISIBLE else View.GONE
        }
        itemView.downVoteBtn.setOnClickListener {
            if (App.appComponent.getAppData().activeUser == null) {
                navController.navigate(LoginFragmentDirections.actionGlobalLoginFragment(R.id.profileFragment))
                return@setOnClickListener
            }
            BettingHubBackend().api.dislikeComment(comment.id, "Bearer ${App.appComponent.getAppData().activeUser?.accessToken}")
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe({
                    if (it.isSuccessful) {
                        if (comment.vote != "dislike") {
                            comment.rating--
                            if (comment.vote == "like") {
                                comment.rating--
                            }
                        } else {
                            comment.rating++
                        }
                        itemView.rating.text = comment.rating.toString()
                        comment.vote = if (comment.vote == "dislike") null else "dislike"
                    }
                }, {
                    it.printStackTrace()
                })
        }
        itemView.upVoteBtn.setOnClickListener {
            if (App.appComponent.getAppData().activeUser == null) {
                navController.navigate(LoginFragmentDirections.actionGlobalLoginFragment(R.id.profileFragment))
                return@setOnClickListener
            }
            BettingHubBackend().api.likeComment(comment.id, "Bearer ${App.appComponent.getAppData().activeUser?.accessToken}")
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe({
                    if (it.isSuccessful) {
                        if (comment.vote != "like") {
                            comment.rating++
                            if (comment.vote == "dislike") {
                                comment.rating++
                            }
                        } else {
                            comment.rating--
                        }
                        itemView.rating.text = comment.rating.toString()
                        comment.vote = if (comment.vote == "like") null else "like"
                    }
                }, {
                    it.printStackTrace()
                })
        }
    }

    fun setListener(listener: ItemListener) {
        itemView.addCommentBtn.setOnClickListener {
            listener.onAddComment(itemView.commentEditText.text.toString(), comment.id) {
                itemView.commentLayout.visibility = View.GONE
                itemView.commentEditText.setText("")
            }
        }
    }
}
