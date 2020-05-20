package com.xbethub.webview.ui.forecast

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.NavController
import androidx.navigation.Navigation
import androidx.navigation.fragment.findNavController
import androidx.navigation.fragment.navArgs
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.R
import com.xbethub.webview.Utils
import com.xbethub.webview.databinding.FragmentForecastBinding
import com.xbethub.webview.models.Forecast
import com.xbethub.webview.ui.forecast.items.ItemAdapter
import com.xbethub.webview.ui.forecast.items.ItemDecoration
import com.xbethub.webview.ui.forecast.items.items.FooterItem
import com.xbethub.webview.ui.forecast.items.items.HeaderItem
import com.xbethub.webview.ui.forecast.items.items.Item
import com.xbethub.webview.ui.forecast.items.items.NewCommentItem

class ForecastFragment: Fragment() {
    private lateinit var navController: NavController
    private lateinit var binding: FragmentForecastBinding
    private lateinit var vm: ForecastViewModel
    private val args by navArgs<ForecastFragmentArgs>()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentForecastBinding.inflate(inflater)
        binding.lifecycleOwner = this

        navController = activity?.let { Navigation.findNavController(it, R.id.nav_host_fragment) }!!

        vm =  ViewModelProvider(this).get(ForecastViewModel::class.java)
        vm.commentsLiveData.observe(viewLifecycleOwner, Observer { addNewComments(it.first, it.second) })

        return binding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        initRV()

        vm.onCreate()
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        val searchField = binding.topPanel.searchField
        searchField.visibility = View.GONE
        binding.topPanel.searchBtn.setOnClickListener {
            searchField.visibility = if (searchField.visibility == View.GONE) {
                searchField.requestFocus()
                Utils.showKeyboard(requireContext())
                View.VISIBLE
            } else {
                View.GONE
            }
        }
        vm.forecasterClick.observe(viewLifecycleOwner, Observer {
            if (it != null) {
                val navController = findNavController()
                if (navController.currentDestination!!.id != R.id.profileFragment) {
                    navController.navigate(ForecastFragmentDirections.toProfileFragment(it))
                }
            }
        })
    }

    private fun initRV() {
        addItemDecoration()

        val items = ArrayList<Item>()

        binding.forecastRV.layoutManager =
            LinearLayoutManager(context, RecyclerView.VERTICAL, false)
        val adapter =
            ItemAdapter(
                vm, vm, this
            )
        binding.forecastRV.adapter = adapter

        items.add(HeaderItem(args.forecast))
//        items.add(NewCommentItem())
        items.add(FooterItem())

        (binding.forecastRV.adapter as ItemAdapter).addAll(items)
    }

    private fun addItemDecoration() {
        val topSpace = resources.getDimensionPixelSize(R.dimen.commentItemTopSpace)
        val sideSpace = resources.getDimensionPixelSize(R.dimen.commentItemSideSpace)
        val itemSpace = resources.getDimensionPixelSize(R.dimen.commentItemSpace)
        //val showMoreTopSpace = resources.getDimensionPixelSize(R.dimen.forecastsShowMoreTopSpace)
        val footerTopSpace = resources.getDimensionPixelSize(R.dimen.forecastsFooterTopSpace)
        val bottomSpace = resources.getDimensionPixelSize(R.dimen.footerBottomMargin)

        binding.forecastRV.addItemDecoration(
            ItemDecoration(
                topSpace
                , sideSpace
                , itemSpace
                , footerTopSpace
                , bottomSpace
            )
        )
    }

    private fun addNewComments(position: Int, comments: List<Item>) {
//        (binding.forecastRV.adapter as ItemAdapter).let {
//            val insertPos = if (position == -1) it.itemCount - 2 else position
//
//            (binding.forecastRV.adapter as ItemAdapter).let {
//                it.addAll(insertPos, comments)
//
//                if (position != -1) {
//                    it.removeItem(position + comments.size)
//                }
//            }
//        }
    }
}
