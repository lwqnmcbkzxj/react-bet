package com.xbethub.webview.ui

import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView


abstract class RecyclerViewAdapterBase<L, M, VH: RecyclerView.ViewHolder>(private val listener: L)
    : RecyclerView.Adapter<VH> () {

    private val models = ArrayList<M>()

    fun addAll(data: Collection<M>) {
        models.addAll(data)

        val addedSize = data.size
        val oldSize = models.size - addedSize

        notifyItemRangeChanged(oldSize, addedSize)
    }

    fun addAll(position: Int, data: Collection<M>) {
        models.addAll(position, data)

        val addedSize = data.size

        notifyItemRangeChanged(position, addedSize)
    }

    fun clearAndAddAll(data: Collection<M>) {
        models.clear()
        models.addAll(data)
        notifyDataSetChanged()
    }

    fun moveItem(fromPosition: Int, toPosition: Int) {
        val item = models.removeAt(fromPosition)
        models.add(toPosition, item)
        notifyItemMoved(fromPosition, toPosition)
    }

    fun addItem(item: M) {
        models.add(item)
        notifyItemInserted(models.size - 1)
    }

    fun insertItem(position: Int, item: M) {
        models.add(position, item)
        notifyItemInserted(position)
    }

    fun insertItems(items: List<M>, position: Int) {
        models.addAll(position, items)
        notifyItemRangeInserted(position, items.size)
    }

    fun removeItem(position: Int) {
        models.removeAt(position)
        notifyItemRemoved(position)
    }

    fun replaceItem(position: Int, item: M) {
        models[position] = item
        notifyItemChanged(position)
    }

    fun replaceItems(position: Int, items: List<M>) {
        val count = items.size

        models.subList(position, (position + count).coerceAtMost(models.size)).clear()
        models.addAll(position, items)

        notifyItemRangeChanged(position, count)
    }

    fun removeItems(position: Int, count: Int) {
        models.subList(position, position + count).clear()
        notifyItemRangeRemoved(position, count)
    }

    protected abstract fun setListener(holder: VH, listener: L)

    protected abstract fun setModel(holder: VH, model: M)

    protected abstract fun createView(parent: ViewGroup, viewType: Int): VH

    fun getItem(position: Int): M {
        return models[position]
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): VH {
        val holder: VH = createView(parent, viewType)
        setListener(holder, listener)
        return holder
    }

    override fun getItemCount(): Int {
        return models.size;
    }

    override fun onBindViewHolder(holder: VH, position: Int) {
        setModel(holder, getItem(position));
    }
}
