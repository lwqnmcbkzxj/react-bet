package com.xbethub.webview.ui.addForecast.tableCell

import com.xbethub.webview.ui.addForecast.tableCell.items.CellItem

interface CellItemListener {
    fun onCellItemClick(cellItem: CellItem, position: Int)
}
