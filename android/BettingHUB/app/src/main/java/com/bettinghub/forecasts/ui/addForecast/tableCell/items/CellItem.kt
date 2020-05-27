package com.bettinghub.forecasts.ui.addForecast.tableCell.items

class CellItem(val value: String): Item {
    override fun getItemType(): ItemType {
        return ItemType.CELL
    }
}
