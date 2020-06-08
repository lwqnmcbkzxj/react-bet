package com.bettinghub.forecasts.ui.forecast

import androidx.lifecycle.MutableLiveData
import com.bettinghub.forecasts.BaseViewModel
import com.bettinghub.forecasts.Event
import com.bettinghub.forecasts.models.Comment
import com.bettinghub.forecasts.models.User
import com.bettinghub.forecasts.ui.forecast.items.ItemListener
import com.bettinghub.forecasts.ui.forecast.items.items.CommentItem
import com.bettinghub.forecasts.ui.forecast.items.items.Item
import com.bettinghub.forecasts.ui.forecast.items.items.ShowMoreItem

class ForecastViewModel : BaseViewModel(), ItemListener {
    val commentsLiveData = MutableLiveData<Event<Pair<Int, List<Item>>>>()
    val forecasterClick = MutableLiveData<User>()
    val commentAdded = MutableLiveData<Event<Comment>>()

    var id = -1

    fun onCreate(id: Int) {
        this.id = id
        requestWithLiveData(commentsLiveData, {
            backendAPI.forecastComments("Bearer ${appData.activeUser?.accessToken}", id)
        }, {
            Pair(-1, getComments(it))
        })
    }

    fun getComments(
        allComments: List<Comment>,
        repliesTo: Int? = null,
        level: Int = 0
    ): List<CommentItem> {
        return allComments.filter { it.repliesTo == repliesTo }.let {
            val comments = mutableListOf<CommentItem>()
            it.forEach { comment ->
                comments.add(CommentItem(level, comment))
                if (level < 3) {
                    comments.addAll(getComments(allComments, comment.id, level + 1))
                }
            }
            comments
        }
    }

    // ItemListener
    override fun onShowMoreBtnClick(showMoreItem: ShowMoreItem, position: Int) {
//        commentsLiveData.value = Pair(position, showMoreItem.items)
    }

    override fun onForecasterClick(user: User) {
        forecasterClick.value = user
        forecasterClick.value = null
    }

    override fun onAddComment(text: String, repliesTo: Int?, successCallback: (() -> Unit)?) {
        requestWithLiveData(commentAdded, {
            backendAPI.forecastComment("Bearer ${appData.activeUser?.accessToken}", id, mapOf("text" to text, "replies_to" to repliesTo?.toString()))
        }, {
            successCallback?.invoke()
            it
        })
    }
}
