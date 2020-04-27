package com.xbethub.webview.ui.home.recycler_view_adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.cardview.widget.CardView
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.R

class TopUsersTableAdapter(private val myDataset: Array<String>) :
    RecyclerView.Adapter<TopUsersTableAdapter.MyViewHolder>() {
    class MyViewHolder(val cardView: CardView) : RecyclerView.ViewHolder(cardView)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        val cardView = LayoutInflater.from(parent.context).inflate(R.layout.card_avatar, parent, false) as CardView
        return MyViewHolder(cardView)
    }

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {

    }

    override fun getItemCount() = myDataset.size
}
