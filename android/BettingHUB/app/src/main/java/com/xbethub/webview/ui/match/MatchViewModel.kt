package com.xbethub.webview.ui.match

import androidx.lifecycle.MediatorLiveData
import androidx.lifecycle.MutableLiveData
import com.xbethub.webview.BaseViewModel
import com.xbethub.webview.Event
import com.xbethub.webview.enums.Direction
import com.xbethub.webview.models.Comment
import com.xbethub.webview.models.Event as Match
import com.xbethub.webview.models.User
import com.xbethub.webview.ui.match.items.ItemListener
import com.xbethub.webview.ui.match.items.items.CommentItem
import com.xbethub.webview.ui.match.items.items.Item
import com.xbethub.webview.ui.match.items.items.ShowMoreItem

class MatchViewModel: BaseViewModel(), ItemListener {

    val commentsLiveData = MutableLiveData<Pair<Int, List<Item>>>()
    val ratingsLiveData = MutableLiveData<Event<List<User>>>()
    val clearRatingsLiveData = MutableLiveData<Void?>()
    val id = MutableLiveData<Int>()
    val match = MediatorLiveData<Event<Match>>()

    init {
        appData.lastTopForecasters?.let {
            ratingsLiveData.value = Event.success(it)
        } ?: run {
            requestWithLiveData(ratingsLiveData
                , { backendAPI.users(consts.topForecastersCount, 1, Direction.DESC.backendValue) }
                , {
                    appData.lastTopForecasters = it.data
                    it.data
                })
        }
        match.addSource(id) {
            requestWithLiveData(match
                , { backendAPI.match(it) }
                , {
                    it
                })
        }

        val comments = arrayListOf<Item>(
            CommentItem(0, Comment("0"))
            , CommentItem(1, Comment("1"))
            , CommentItem(2, Comment("2"))
            , CommentItem(3, Comment("3"))
            , CommentItem(3, Comment("4"))
            , CommentItem(3, Comment("5"))
            , ShowMoreItem(arrayListOf(
                CommentItem(3, Comment("6"))
                , CommentItem(3, Comment("7"))
                , CommentItem(3, Comment("8"))
                , CommentItem(3, Comment("9"))
                , CommentItem(3, Comment("10"))
                , CommentItem(2, Comment("11"))
                , CommentItem(2, Comment("12"))
            ))
//                        , CommentItem(3, Comment("6"))
//                        , CommentItem(3, Comment("7"))
//                        , CommentItem(3, Comment("8"))
//                        , CommentItem(3, Comment("9"))
//                        , CommentItem(3, Comment("10"))
//                    , CommentItem(2, Comment("11"))
//                    , CommentItem(2, Comment("12"))
            , CommentItem(1, Comment("13"))
            , CommentItem(0, Comment("14"))
            , CommentItem(0, Comment("15"))
        )

        commentsLiveData.value = Pair(-1, comments)
    }

    // ItemListener
    override fun onShowMoreBtnClick(showMoreItem: ShowMoreItem, position: Int) {
        commentsLiveData.value = Pair(position, showMoreItem.items)
    }
}
