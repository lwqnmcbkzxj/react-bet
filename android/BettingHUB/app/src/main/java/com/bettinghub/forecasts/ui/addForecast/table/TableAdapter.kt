package com.bettinghub.forecasts.ui.addForecast.table

import android.view.LayoutInflater
import android.view.ViewGroup
import com.bettinghub.forecasts.R
import com.bettinghub.forecasts.ui.RecyclerViewAdapterBase

class TableAdapter(listener: CellListener) : RecyclerViewAdapterBase<CellListener, Table, TableViewHolder>(listener) {

    override fun setListener(holder: TableViewHolder, listener: CellListener) {
        holder.setCellListener(listener)
    }

    override fun setModel(holder: TableViewHolder, model: Table) {
        holder.setTable(model)
    }

    override fun createView(parent: ViewGroup, viewType: Int): TableViewHolder {
        return TableViewHolder(LayoutInflater.from(parent.context)
            .inflate(R.layout.item_outcome_table, parent, false))
    }
}
