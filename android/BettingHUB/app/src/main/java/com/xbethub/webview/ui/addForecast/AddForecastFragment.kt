package com.xbethub.webview.ui.addForecast

import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.NavController
import androidx.navigation.Navigation
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.R
import com.xbethub.webview.Utils
import com.xbethub.webview.databinding.FragmentAddForecastBinding
import com.xbethub.webview.enums.Status
import com.xbethub.webview.models.Bookmaker
import com.xbethub.webview.models.Championship
import com.xbethub.webview.models.Sport
import com.xbethub.webview.models.Team
import com.xbethub.webview.ui.addForecast.outcome.OutcomeAdapter
import com.xbethub.webview.ui.addForecast.outcome.OutcomeItem
import com.xbethub.webview.ui.addForecast.outcome.OutcomeItemDecoration
import com.xbethub.webview.ui.addForecast.outcome.OutcomeListener
import com.xbethub.webview.ui.addForecast.table.CellListener
import com.xbethub.webview.ui.addForecast.table.Table
import com.xbethub.webview.ui.addForecast.table.TableAdapter
import com.xbethub.webview.ui.addForecast.table.TableItemDecoration

class AddForecastFragment: Fragment(), CellListener, OutcomeListener {
    private lateinit var navController: NavController
    private lateinit var binding: FragmentAddForecastBinding
    private lateinit var vm: AddForecastViewModel
    private var isForecast = true

    private var searchActive = false

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentAddForecastBinding.inflate(inflater)

        binding.topPanel.searchBtn.setOnClickListener { onSearchBtnClick() }

        updateSearchFieldVisibility()
        addOutcomeTableRVItemDecoration()

        navController = activity?.let { Navigation.findNavController(it, R.id.nav_host_fragment) }!!

        vm = ViewModelProvider(this).get(AddForecastViewModel::class.java)

        vm.balanceLiveData.observe(viewLifecycleOwner, Observer {
            binding.topPanel.bankBalance.root.visibility = View.VISIBLE
            binding.topPanel.bankBalance.balance = it.toString()
        })

        vm.betPerLiveData.observe(viewLifecycleOwner, Observer {newVal ->
            binding.betPer.text.toString().toFloatOrNull()?.let { oldVal ->
                if (!newVal.equals(oldVal)) {
                    binding.betPer.tag = "fromLiveData"
                    binding.betPer.setText(newVal.toString())
                }
            } ?: run {
                binding.betPer.tag = "fromLiveData"
                binding.betPer.setText(newVal.toString())
            }
        })

        vm.betRawLiveData.observe(viewLifecycleOwner, Observer {
            val newVal = it.toString()

            if (!newVal.equals(binding.betRaw.text.toString())) {
                binding.betRaw.tag = "fromLiveData"
                binding.betRaw.setText(newVal)
            }
        })

        vm.tablesLiveData.observe(viewLifecycleOwner, Observer {
            when (it.status) {
                Status.LOADING -> onTablesLoading()
                Status.SUCCESS -> onTablesLoaded(it.data)
                Status.ERROR -> onTablesLoadingError(it.error)
            }
        })

        vm.sportsLiveData.observe(viewLifecycleOwner, Observer {
            when (it.status) {
                Status.LOADING -> onSportsLoading()
                Status.SUCCESS -> onSportsLoaded(it.data)
                Status.ERROR -> onSportsLoadingError(it.error)
            }
        })

        vm.bookmakersLiveData.observe(viewLifecycleOwner, Observer {
            when (it.status) {
                Status.LOADING -> onBookmakersLoading()
                Status.SUCCESS -> onBookmakersLoaded(it.data)
                Status.ERROR -> onBookmakersLoadingError(it.error)
            }
        })

        vm.championshipsLiveData.observe(viewLifecycleOwner, Observer {
            when (it.status) {
                Status.LOADING -> onChampionshipsLoading()
                Status.SUCCESS -> onChampionshipsLoaded(it.data)
                Status.ERROR -> onChampionshipsLoadingError(it.error)
            }
        })

        vm.teamsLiveData.observe(viewLifecycleOwner, Observer {
            when (it.status) {
                Status.LOADING -> onTeamsLoading()
                Status.SUCCESS -> onTeamsLoaded(it.data)
                Status.ERROR -> onTeamsLoadingError(it.error)
            }
        })

        binding.betPer.addTextChangedListener(object : TextWatcher {
            var beforeLen = 0

            override fun afterTextChanged(s: Editable?) {}

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {
                beforeLen = binding.betPer.text!!.length
            }

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                if (binding.betPer.tag == null) {
                    if (beforeLen < binding.betPer.text!!.length) {
                        s?.toString()?.toFloatOrNull()?.let {
                            if (it > 0f) {
                                vm.onBerPerChanged(it)
                            }
                        }
                    }
                } else {
                    binding.betPer.setSelection(binding.betPer.text!!.length)
                }

                binding.betPer.tag = null
            }
        })

        binding.betRaw.addTextChangedListener(object : TextWatcher {
            var beforeLen = 0

            override fun afterTextChanged(s: Editable?) {}

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {
                beforeLen = binding.betRaw.text.length
            }

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                if (binding.betRaw.tag == null) {
                    if (beforeLen < binding.betRaw.text!!.length) {
                        s?.toString()?.toIntOrNull()?.let {
                            if (it > 0) {
                                vm.onBetRawChanged(it)
                            }
                        }
                    }
                } else {
                    binding.betRaw.setSelection(binding.betRaw.text.length)
                }

                binding.betRaw.tag = null
            }

        })

        init()

        return binding.root
    }

    private fun init() {
        binding.multipleCoeffAndOutcomeBlock.visibility = if (isForecast) View.GONE else View.VISIBLE
        binding.coeffAndOutcomeBlock.visibility = if (isForecast) View.VISIBLE else View.GONE
        binding.title.setText(if (isForecast) R.string.addForecast else R.string.addExpress)

        if (!isForecast) {
            binding.outcomeRV.layoutManager = LinearLayoutManager(requireContext(), RecyclerView.VERTICAL, false)
            binding.outcomeRV.adapter = OutcomeAdapter(this)
            binding.outcomeRV.itemAnimator = null

            val space = resources.getDimensionPixelSize(R.dimen.outcomeSpace)

            binding.outcomeRV.addItemDecoration(OutcomeItemDecoration(space))
        }
    }

    private fun addOutcomeTableRVItemDecoration() {
        val space = resources.getDimensionPixelSize(R.dimen.outcomeTableSpace)

        binding.outcomeTableRV.addItemDecoration(TableItemDecoration(space))
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        vm.onCreate()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        vm.onDestroy()
    }

    /**********
     **TABLES**
     **********/
    private fun onTablesLoading() {

    }

    private fun onTablesLoaded(tables: List<Table>?) {
        tables?.let {
            binding.outcomeTableRV.layoutManager = LinearLayoutManager(requireContext(), RecyclerView.VERTICAL, false)

            val tableAdapter = TableAdapter(this)

            binding.outcomeTableRV.adapter = tableAdapter
            tableAdapter.addAll(tables)
        }
    }

    private fun onTablesLoadingError(error: Throwable?) {

    }

    /**********
     **SPORTS**
     **********/
    private fun onSportsLoading() {

    }

    private fun onSportsLoaded(sports: List<Sport>?) {
        sports?.let {
            binding.sport.spinner.adapter = ArrayAdapter(requireContext(), R.layout.spinner_row
                , sports.map { it.name })
        }
    }

    private fun onSportsLoadingError(error: Throwable?) {

    }

    /**************
     **BOOKMAKERS**
     **************/
    private fun onBookmakersLoading() {

    }

    private fun onBookmakersLoaded(bookmakers: List<Bookmaker>?) {
        bookmakers?.let {
            binding.bookmaker.spinner.adapter = ArrayAdapter(requireContext(), R.layout.spinner_row
                , bookmakers.map { it.title })
        }
    }

    private fun onBookmakersLoadingError(error: Throwable?) {

    }

    /*****************
     **CHAMPIONSHIPS**
     *****************/
    private fun onChampionshipsLoading() {

    }

    private fun onChampionshipsLoaded(championships: List<Championship>?) {
        championships?.let {
            binding.championship.spinner.adapter = ArrayAdapter(requireContext(), R.layout.spinner_row
                , championships.map { it.championship })
        }
    }

    private fun onChampionshipsLoadingError(error: Throwable?) {

    }

    /*********
     **TEAMS**
     *********/
    private fun onTeamsLoading() {

    }

    private fun onTeamsLoaded(teams: List<Team>?) {
        teams?.let {
            binding.team.spinner.adapter = ArrayAdapter(requireContext(), R.layout.spinner_row
                , teams.map { it.name })
        }
    }

    private fun onTeamsLoadingError(error: Throwable?) {

    }

    private fun updateSearchFieldVisibility() {
        binding.topPanel.searchField.visibility = if (searchActive) View.VISIBLE else View.GONE

        if (searchActive) {
            binding.topPanel.searchField.requestFocus()
            Utils.showKeyboard(requireContext())
        }
    }


    fun onSearchBtnClick() {
        searchActive = !searchActive
        updateSearchFieldVisibility()
    }

    // CellListener
    override fun onCellClick(value: String, columnName: String) {
        if (isForecast) {
            binding.coefficient.text = value
            binding.outcome.text = columnName
        } else {
            (binding.outcomeRV.adapter as? OutcomeAdapter)?.let {
                it.addItem(OutcomeItem(columnName + " (" + value + ")"))
            }
        }
    }

    // OutcomeListener
    override fun onRemoveOutcomeItemClick(outcomeItem: OutcomeItem, position: Int) {
        (binding.outcomeRV.adapter as? OutcomeAdapter)?.let {
            it.removeItem(position)
        }
    }
}
