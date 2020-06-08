package com.bettinghub.forecasts.ui.news

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.NavController
import androidx.navigation.Navigation
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.bettinghub.forecasts.App
import com.bettinghub.forecasts.R
import com.bettinghub.forecasts.Utils
import com.bettinghub.forecasts.databinding.FragmentNewsBinding
import com.bettinghub.forecasts.enums.Status
import com.bettinghub.forecasts.models.News
import com.bettinghub.forecasts.ui.news.items.ItemAdapter
import com.bettinghub.forecasts.ui.news.items.ItemDecoration
import com.bettinghub.forecasts.ui.news.items.NewsListener
import com.bettinghub.forecasts.ui.news.items.items.*

class NewsFragment: Fragment(), NewsListener {
    private val consts = App.appComponent.getConstants()

    private lateinit var navController: NavController
    private lateinit var binding: FragmentNewsBinding
    private lateinit var vm: NewsViewModel

    private var searchActive = false

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentNewsBinding.inflate(inflater)

        binding.topPanel.bankBalance.root.visibility = if (App.appComponent.getAppData().activeUser == null) View.GONE else View.VISIBLE
        binding.topPanel.searchBtn.setOnClickListener { onSearchBtnClick() }

        navController = activity?.let { Navigation.findNavController(it, R.id.nav_host_fragment) }!!
        vm = ViewModelProvider(this).get(NewsViewModel::class.java)

        addItemDecoration()

        vm.newsLiveData.observe(viewLifecycleOwner, Observer {
            when (it.status) {
                Status.LOADING -> onNewsLoading()
                Status.SUCCESS -> onNewsLoaded(it.data)
                Status.ERROR -> onNewsLoadingError(it.error)
            }
        })

        updateSearchFieldVisibility();

        return binding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        vm.onCreate()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        vm.onDestroy()
    }

    private fun onNewsLoading() {
        (binding.newsRV.adapter as? ItemAdapter)?.let { adapter ->
            binding.newsRV.post {
                if (adapter.getItem(adapter.itemCount - 2).getType() == ItemType.SHOW_MORE) {
                    adapter.removeItem(adapter.itemCount - 2)
                }
            }

            binding.newsRV.post { adapter.addAll(adapter.itemCount - 1,  List(consts.newsPerPage) { NewsItem(null) }) }

        } ?: run {
            val items = ArrayList<Item>()

            binding.newsRV.layoutManager = LinearLayoutManager(context, RecyclerView.VERTICAL, false)
            val adapter = ItemAdapter(this, vm)
            binding.newsRV.adapter = adapter

            items.add(HeaderItem())
            items.addAll(List(consts.newsPerPage) { NewsItem(null) })
            items.add(FooterItem())

            adapter.addAll(items)
        }
    }

    private fun onNewsLoaded(news: List<News>?) {
        news?.let {
            if (it.size == consts.newsPerPage) {
                (binding.newsRV.adapter as? ItemAdapter)?.let { adapter ->
                    binding.newsRV.post {
                        adapter.replaceItems(
                            adapter.itemCount - consts.newsPerPage - 1,
                            news.map { NewsItem(it) })
                    }

                    binding.newsRV.post { adapter.insertItem(adapter.itemCount - 1, ShowMoreItem()) }
                }
            } else {
                (binding.newsRV.adapter as? ItemAdapter)?.let { adapter ->
                    val diff = consts.newsPerPage - it.size

                    binding.newsRV.post {
                        adapter.replaceItems(
                            adapter.itemCount - consts.newsPerPage - 1,
                            news.map { NewsItem(it) })
                    }

                    binding.newsRV.post { adapter.removeItems(adapter.itemCount - diff - 1, diff) }
                }
            }
        }
    }

    private fun onNewsLoadingError(error: Throwable?) {

    }

    private fun addItemDecoration() {
        val topSpace = resources.getDimensionPixelSize(R.dimen.newsItemTopSpace)
        val sideSpace = resources.getDimensionPixelSize(R.dimen.newsItemSideMargin)
        val itemSpace = resources.getDimensionPixelSize(R.dimen.newsItemSpace)
        val showMoreTopSpace = resources.getDimensionPixelSize(R.dimen.forecastsShowMoreTopSpace)
        val footerTopSpace = resources.getDimensionPixelSize(R.dimen.forecastsFooterTopSpace)
        val bottomSpace = resources.getDimensionPixelSize(R.dimen.footerBottomMargin)

        binding.newsRV.addItemDecoration(
            ItemDecoration(
                topSpace
                , sideSpace
                , itemSpace
                , showMoreTopSpace
                , footerTopSpace
                , bottomSpace
            )
        )
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

    // NewsListener
    override fun onNewsClick(news: News, position: Int) {
        startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(news.link)))
    }
}
