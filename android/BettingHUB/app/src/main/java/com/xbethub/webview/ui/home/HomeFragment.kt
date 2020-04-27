package com.xbethub.webview.ui.home

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.R
import com.xbethub.webview.ui.recycler_view_adapters.LastForecastsTableAdapter
import com.xbethub.webview.ui.recycler_view_adapters.SpanningLinearLayoutManager
import com.xbethub.webview.ui.recycler_view_adapters.TopUsersTableAdapter

class HomeFragment : Fragment() {

    lateinit var topUsersTable: RecyclerView
    lateinit var lastForecastsTable: RecyclerView

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
    }
}
