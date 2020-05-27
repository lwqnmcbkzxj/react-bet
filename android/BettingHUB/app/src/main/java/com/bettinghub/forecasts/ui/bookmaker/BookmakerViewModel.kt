package com.bettinghub.forecasts.ui.bookmaker

import androidx.lifecycle.*
import com.bettinghub.forecasts.BaseViewModel
import com.bettinghub.forecasts.Event
import com.bettinghub.forecasts.models.Bookmaker
import com.bettinghub.forecasts.models.Comment
import com.bettinghub.forecasts.ui.bookmaker.items.ItemListener
import com.bettinghub.forecasts.ui.bookmaker.items.items.CommentItem
import com.bettinghub.forecasts.ui.bookmaker.items.items.Item
import com.bettinghub.forecasts.ui.bookmaker.items.items.ShowMoreItem

class BookmakerViewModel: BaseViewModel(), ItemListener {
    val commentsLiveData = MutableLiveData<Pair<Int, List<Item>>>()

    val linkClick = MutableLiveData<String>()

    val id = MutableLiveData<Int>()
    val bookmaker = MediatorLiveData<Event<Bookmaker>>()

    init {
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

        bookmaker.addSource(id) {
            requestWithLiveData(bookmaker
                , { backendAPI.bookmaker(it) }
                , {
                    it
                }
            )
        }
    }

    // ItemListener
    override fun onShowMoreBtnClick(showMoreItem: ShowMoreItem, position: Int) {
        commentsLiveData.value = Pair(position, showMoreItem.items)
    }

    override fun onLinkClick(link: String) {
        linkClick.value = link
    }
}
