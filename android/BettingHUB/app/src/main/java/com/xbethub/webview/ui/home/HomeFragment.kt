package com.xbethub.webview.ui.home

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageButton
import android.widget.SearchView
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.R
import com.xbethub.webview.ui.home.recycler_view_adapters.ItemDecoration
import com.xbethub.webview.ui.home.recycler_view_adapters.LastForecastsTableAdapter
import com.xbethub.webview.ui.home.recycler_view_adapters.TopUsersTableAdapter

class HomeFragment : Fragment(), View.OnClickListener {

    lateinit var topUsersTable: RecyclerView
    lateinit var lastForecastsTable: RecyclerView
    var searchBarState: Boolean = false //inactive
    override fun onCreateView(
            inflater: LayoutInflater,
            container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View? {

        return inflater.inflate(R.layout.fragment_home, container, false)
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        topUsersTable = view?.findViewById<RecyclerView>(R.id.top_users_list) !!
        lastForecastsTable = view?.findViewById<RecyclerView>(R.id.last_forecasts_table) !!
        topUsersTable.apply {
            setHasFixedSize(true)
            adapter = TopUsersTableAdapter(Array<String>(
                5
            ) { i -> i.toString()})
        }


        lastForecastsTable.addItemDecoration(ItemDecoration(resources.getDimensionPixelSize(R.dimen.homeForecastTopSpace)
            , resources.getDimensionPixelSize(R.dimen.homeForecastBottomSpace)))

        lastForecastsTable.apply {
            setHasFixedSize(true)
            val manager = LinearLayoutManager(context, LinearLayoutManager.VERTICAL, false)
            manager.isAutoMeasureEnabled = true
            layoutManager = manager
//            layoutManager = SpanningLinearLayoutManager(context, LinearLayoutManager.VERTICAL, false)
            adapter = LastForecastsTableAdapter(Array<String>(
                5
            ) { i -> i.toString()})
        }
        view?.findViewById<ImageButton>(R.id.search_button)?.setOnClickListener(this)
    }

    override fun onClick(v: View?) {
        when (v?.id) {
            R.id.search_button -> searchButton(v as ImageButton)
        }
    }
    private fun searchButton(button: ImageButton) {
        searchBarState = !searchBarState
        button.setImageResource(if (searchBarState) R.drawable.ic_search_enabled
                                else R.drawable.ic_search_disabled)
        view?.findViewById<SearchView>(R.id.searchField)?.visibility =
            if (searchBarState) View.VISIBLE else View.GONE
    }
}
