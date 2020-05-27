package com.xbethub.webview.ui.addForecast.table

import android.view.View
import androidx.core.content.res.ResourcesCompat
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.R
import com.xbethub.webview.Utils
import com.xbethub.webview.databinding.ItemOutcomeTableBinding
import com.xbethub.webview.ui.addForecast.tableCell.CellAdapter
import com.xbethub.webview.ui.addForecast.tableCell.CellItemListener
import com.xbethub.webview.ui.addForecast.tableCell.items.CellItem
import com.xbethub.webview.ui.addForecast.tableCell.items.ColumnHeaderItem
import com.xbethub.webview.ui.addForecast.tableCell.items.Item

class TableViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {
    private val binding = ItemOutcomeTableBinding.bind(itemView)
    private lateinit var table: Table
    private var cellListener: CellListener? = null
    private var tableVisible = true

    init {
        val activeTypeFace = ResourcesCompat.getFont(itemView.context, R.font.roboto_medium)
        val inactiveTypeFace = ResourcesCompat.getFont(itemView.context, R.font.roboto_regular)

        binding.titleBlock.setOnClickListener {
            tableVisible = !tableVisible

            val typeface = if (tableVisible) activeTypeFace else inactiveTypeFace
            val visibility = if (tableVisible) View.VISIBLE else View.GONE

            binding.title.typeface = typeface
            binding.value.typeface = typeface
            binding.collapseLabel.visibility = visibility
            binding.tableCV.visibility = visibility
        }
    }

    fun setTable(table: Table) {
        this.table = table

        binding.title.text = table.title
        binding.value.text = "+" + table.value;

        binding.tableRV.layoutManager = GridLayoutManager(itemView.context, table.columHeaders.size, RecyclerView.VERTICAL, false)
        binding.tableRV.isNestedScrollingEnabled = false

        val verticalDivider = DividerItemDecoration(itemView.context, RecyclerView.VERTICAL)
        val horizontalDivider = DividerItemDecoration(itemView.context, RecyclerView.HORIZONTAL)

        verticalDivider.setDrawable(Utils.getDrawable(itemView.context, R.drawable.table_divider_vertical))
        horizontalDivider.setDrawable(Utils.getDrawable(itemView.context, R.drawable.table_divider_horizontal))

        binding.tableRV.addItemDecoration(horizontalDivider)
        binding.tableRV.addItemDecoration(verticalDivider)

        val cellAdapter = CellAdapter(object : CellItemListener {
            override fun onCellItemClick(cellItem: CellItem, position: Int) {
                if (cellItem.value.isEmpty()) {
                    return
                }

                cellListener?.onCellClick(cellItem.value, table.columHeaders[position % table.columHeaders.size])
            }
        })

        binding.tableRV.adapter = cellAdapter

        val items = ArrayList<Item>()

        for (columnHeader in table.columHeaders) {
            items.add(ColumnHeaderItem(columnHeader))
        }

        for (cell in table.cells) {
            items.add(CellItem(cell))
        }

        cellAdapter.addAll(items)
    }

    fun setCellListener(listener: CellListener) {
        cellListener = listener;
    }
}
