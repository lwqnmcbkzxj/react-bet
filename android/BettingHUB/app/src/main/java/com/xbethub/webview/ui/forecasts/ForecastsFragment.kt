package com.xbethub.webview.ui.forecasts

import android.app.Activity
import android.content.Context
import android.os.Build
import android.os.Bundle
import android.os.IBinder
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.inputmethod.InputMethodManager
import android.widget.ArrayAdapter
import androidx.core.content.ContextCompat
import androidx.core.content.ContextCompat.getSystemService
import androidx.core.content.res.ResourcesCompat
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.NavController
import androidx.navigation.Navigation
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.android.flexbox.FlexDirection
import com.google.android.flexbox.FlexboxItemDecoration
import com.google.android.flexbox.FlexboxLayoutManager
import com.google.android.flexbox.JustifyContent
import com.xbethub.webview.R
import com.xbethub.webview.databinding.FragmentForecastsBinding
import com.xbethub.webview.enums.ForecastType
import com.xbethub.webview.enums.Sport
import com.xbethub.webview.enums.TimeInterval
import com.xbethub.webview.models.Forecast
import com.xbethub.webview.models.ForecastFilter
import com.xbethub.webview.ui.forecasts.forecastItem.ForecastAdapter
import com.xbethub.webview.ui.forecasts.forecastItem.ForecastItemDecoration
import com.xbethub.webview.ui.forecasts.forecastItem.ForecastListener
import com.xbethub.webview.ui.forecasts.sportItem.SportAdapter
import com.xbethub.webview.ui.forecasts.sportItem.SportItem


class ForecastsFragment : Fragment(),
    ForecastListener {

    private lateinit var navController: NavController
    private lateinit var binding: FragmentForecastsBinding
    private lateinit var vm: ForecastsViewModel

    private var extraFiltersVisible = false
    private var searchActive = false

    private var activeSport: Sport? = null
    private var activeTimeInterval: TimeInterval? = null

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentForecastsBinding.inflate(inflater)
        binding.fragment = this
        binding.lifecycleOwner = this
        binding.forecastRV.isNestedScrollingEnabled = false
        binding.timeIntervalSpinner.adapter = ArrayAdapter(context!!, R.layout.row_time_interval, R.id.text
            , TimeInterval.values().map { this.getString(it.stringRes) })

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            binding.showMoreBtn.elevation = 0f
        }

        addForecastItemDecoration()

        navController = activity?.let { Navigation.findNavController(it, R.id.nav_host_fragment) }!!

        vm = ViewModelProviders.of(this).get(ForecastsViewModel::class.java)
        vm.forecastsLiveData.observe(viewLifecycleOwner, Observer { addForecasts(it) })
        vm.forecastFilterLiveData.observe(viewLifecycleOwner, Observer { updateFilterViews(it) })

        binding.viewModel = vm

        addSportItems()
        updateExtraFiltersVisibility()
        updateSearchFieldVisibility()

        return binding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        vm.onCreate()
    }

    private fun addForecastItemDecoration() {
        val topSpace = resources.getDimensionPixelSize(R.dimen.forecastItemTopSpace)
        val sideSpace = resources.getDimensionPixelSize(R.dimen.forecastSideMargin)
        val itemSpace = resources.getDimensionPixelSize(R.dimen.forecastItemSpace)

        binding.forecastRV.addItemDecoration(
            ForecastItemDecoration(
                topSpace,
                sideSpace,
                itemSpace
            )
        )
    }

    private fun addForecasts(forecasts: List<Forecast>) {
        if (binding.forecastRV.adapter == null) {
            binding.forecastRV.layoutManager =
                LinearLayoutManager(context, RecyclerView.VERTICAL, false)
            val adapter =
                ForecastAdapter(
                    this
                )
            binding.forecastRV.adapter = adapter
        }

        (binding.forecastRV.adapter as ForecastAdapter).addAll(forecasts)
    }

    private fun addSportItems() {
        val flexboxLayoutManager = FlexboxLayoutManager(context!!, FlexDirection.ROW)

        flexboxLayoutManager.justifyContent = JustifyContent.FLEX_START

        binding.sportRV.layoutManager = flexboxLayoutManager

        val paddingDecoration = FlexboxItemDecoration(context)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            paddingDecoration.setDrawable(context!!.getDrawable(R.drawable.flex_divider))
        } else {
            paddingDecoration.setDrawable(ContextCompat.getDrawable(context!!, R.drawable.flex_divider))
        }

        binding.sportRV.addItemDecoration(paddingDecoration)

        val adapter = SportAdapter(vm)
        binding.sportRV.adapter = adapter
        adapter.addAll(Sport.values().map { SportItem(it) })
    }

    private fun updateFilterViews(forecastFilter: ForecastFilter) {
        // FilterType
        val inactiveFont = ResourcesCompat.getFont(context!!, R.font.roboto_regular)
        val activeFont = ResourcesCompat.getFont(context!!, R.font.roboto_medium)

        binding.subscriptionsBtn.typeface = inactiveFont
        binding.allForecastsBtn.typeface = inactiveFont
        binding.paidBtn.typeface = inactiveFont

        when (forecastFilter.forecastType) {
            ForecastType.SUBSCRIPTION -> binding.subscriptionsBtn.typeface = activeFont
            ForecastType.ALL -> binding.allForecastsBtn.typeface = activeFont
            ForecastType.PAID -> binding.paidBtn.typeface = activeFont
        }

        // Sport
        val sportAdapter = binding.sportRV.adapter as SportAdapter

        activeSport?.let {
            sportAdapter.getItem(it.ordinal).active = false
            sportAdapter.notifyItemChanged(it.ordinal)
        }

        activeSport = forecastFilter.sport
        sportAdapter.getItem(activeSport!!.ordinal).active = true
        sportAdapter.notifyItemChanged(activeSport!!.ordinal)
    }

    fun showKeyboard() {
        val imm = activity!!.getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
        imm.toggleSoftInput(InputMethodManager.SHOW_IMPLICIT, InputMethodManager.HIDE_IMPLICIT_ONLY)
    }

    fun hideKeyboard() {
        val view = activity!!.currentFocus
        if (view != null) {
            hideKeyboard(activity!!, view.windowToken)
        }
    }

    private fun hideKeyboard(activity: Activity?, windowToken: IBinder?) {
        if (activity == null) return
        val inputManager = activity.getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
        inputManager.hideSoftInputFromWindow(windowToken, InputMethodManager.HIDE_NOT_ALWAYS)
    }

    private fun updateExtraFiltersVisibility() {
        binding.extraFilterFields.visibility = if (extraFiltersVisible) View.VISIBLE else View.GONE
    }

    private fun updateSearchFieldVisibility() {
        binding.searchField.visibility = if (searchActive) View.VISIBLE else View.GONE

        if (searchActive) {
            binding.searchField.requestFocus()
            showKeyboard()
        } else {
            hideKeyboard()
        }
    }

    fun onExtraFiltersBtnClick() {
        extraFiltersVisible = !extraFiltersVisible;
        updateExtraFiltersVisibility()
    }

    fun onSearchBtnClick() {
        searchActive = !searchActive
        updateSearchFieldVisibility()
    }

    // ForecastListener
    override fun onForecastClick(forecast: Forecast, position: Int) {

    }
}
