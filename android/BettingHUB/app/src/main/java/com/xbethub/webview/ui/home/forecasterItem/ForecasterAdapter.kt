package com.xbethub.webview.ui.home.forecasterItem

import android.view.LayoutInflater
import android.view.ViewGroup
import com.xbethub.webview.R
import com.xbethub.webview.models.User
import com.xbethub.webview.ui.RecyclerViewAdapterBase

class ForecasterAdapter(val itemWidth: Int, listener: ForecasterListener)
    : RecyclerViewAdapterBase<ForecasterListener, User?, ForecasterViewHolder>(listener) {

    override fun setListener(holder: ForecasterViewHolder, listener: ForecasterListener) {

    }

    override fun setModel(holder: ForecasterViewHolder, model: User?) {
            holder.setUser(model)
    }

    override fun createView(parent: ViewGroup, viewType: Int): ForecasterViewHolder {
        return ForecasterViewHolder(itemWidth
            , LayoutInflater.from(parent.context).inflate(R.layout.item_forecaster, parent, false))
    }
}
