package com.xbethub.webview.ui.home

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageButton
import android.widget.SearchView
import androidx.fragment.app.Fragment
import androidx.navigation.NavController
import androidx.navigation.Navigation
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.gson.JsonObject
import com.xbethub.webview.App
import com.xbethub.webview.R
import com.xbethub.webview.ui.home.recycler_view_adapters.ItemDecoration
import com.xbethub.webview.ui.home.recycler_view_adapters.LastForecastsTableAdapter
import com.xbethub.webview.ui.home.recycler_view_adapters.TopUsersTableAdapter
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class HomeFragment : Fragment(), View.OnClickListener {

    lateinit var navController: NavController
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
        navController = activity?.let { Navigation.findNavController(it, R.id.nav_host_fragment) }!!
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
        view?.findViewById<Button>(R.id.see_all_forecasts)?.setOnClickListener(this)
        view?.findViewById<Button>(R.id.see_all_top_users_button)?.setOnClickListener(this)
        getLastForecasts()
        getUser()
    }

    fun getUser() {
        (activity?.application as? App)?.getApi()?.getUser()?.enqueue(object: Callback<String> {
            override fun onFailure(call: Call<String>?, t: Throwable?) {
                Log.e("GET_USER", t?.message ?: "FUCK")
            }

            override fun onResponse(call: Call<String>?, response: Response<String>?) {
                Log.i("GET_USER", response?.body().toString() + " " + response?.code().toString())
            }
        })
    }

    private fun getLastForecasts() {
//        "page": "Номер получаемой страницы",
//        "quanity": "Количество элементов на странице",
//        "tf": "Нужный промежуток время",
//        "sport": "Вид спорта",
//        "useSubscribes": "Поиск среди подписок (только при наличии авторизации) ПРИНИМАЕТ 1 либо 0",
//        "useFavorites": "Поиск среду избранного (только при наличии авторизации) ПРИНИМАЕТ 1 либо 0"
//    }
//    Возможные tf:
//    3h – За последние 3 часа
//    6h – за последние 6 часов
//    12h – за последние 12 часов
//    day – за последние 24 часа
//    all – за все время
        val body = JsonObject()
        body.addProperty("page", 0)
        body.addProperty("quanity", 5)
        body.addProperty("tf", "3h")
        body.addProperty("sport", "all")

        (activity?.application as? App)?.getApi()?.getForeCasts(body)?.enqueue(object : Callback<String> {
            override fun onFailure(call: Call<String>?, t: Throwable?) {
                Log.e("LastForecasts", t?.message ?: "WTF")
            }

            override fun onResponse(call: Call<String>?, response: Response<String>?) {
                Log.i("LastForecasts", response?.body().toString() + " " + response?.code().toString())
            }
        })
    }

    override fun onClick(v: View?) {
        when (v?.id) {
            R.id.search_button -> searchButton(v as ImageButton)
            R.id.see_all_forecasts -> navController.navigate(R.id.toForecastFragment)
            R.id.see_all_top_users_button -> navController.navigate(R.id.toForecasterRatingFragment)
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
