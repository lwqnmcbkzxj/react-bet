package com.xbethub.webview.ui.home.forecasterItem

import android.view.LayoutInflater
import android.view.ViewGroup
import com.xbethub.webview.R
import com.xbethub.webview.models.User
import com.xbethub.webview.ui.RecyclerViewAdapterBase

class ForecasterItemAdapter(val itemWidth: Int, listener: ForecasterItemListener)
    : RecyclerViewAdapterBase<ForecasterItemListener, User?, ForecasterItemViewHolder>(listener) {

    override fun setListener(holder: ForecasterItemViewHolder, listener: ForecasterItemListener) {

    }

    override fun setModel(holder: ForecasterItemViewHolder, model: User?) {
            holder.setUser(model)
    }

    override fun createView(parent: ViewGroup, viewType: Int): ForecasterItemViewHolder {
        return ForecasterItemViewHolder(itemWidth
            , LayoutInflater.from(parent.context).inflate(R.layout.item_forecaster, parent, false))
    }
}
