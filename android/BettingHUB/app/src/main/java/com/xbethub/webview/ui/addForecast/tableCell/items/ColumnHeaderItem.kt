package com.xbethub.webview.ui.addForecast.tableCell.items

class ColumnHeaderItem(val name: String): Item {
    override fun getItemType(): ItemType {
        return ItemType.COLUMN_HEADER
    }
}
