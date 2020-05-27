package com.bettinghub.forecasts.ui.addForecast.tableCell

import com.bettinghub.forecasts.ui.addForecast.tableCell.items.CellItem

interface CellItemListener {
    fun onCellItemClick(cellItem: CellItem, position: Int)
}
