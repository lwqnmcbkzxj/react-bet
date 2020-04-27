package com.xbethub.webview.ui.forecast

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.xbethub.webview.models.Comment
import com.xbethub.webview.ui.forecast.items.ItemListener
import com.xbethub.webview.ui.forecast.items.items.CommentItem
import com.xbethub.webview.ui.forecast.items.items.Item
import com.xbethub.webview.ui.forecast.items.items.ShowMoreItem

class ForecastViewModel: ViewModel(), ItemListener {
    val commentsLiveData = MutableLiveData<Pair<Int, List<Item>>>()

    fun onCreate() {
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
