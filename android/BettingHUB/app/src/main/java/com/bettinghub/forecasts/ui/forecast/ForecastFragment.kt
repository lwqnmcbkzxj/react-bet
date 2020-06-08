package com.bettinghub.forecasts.ui.forecast

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
import com.bettinghub.forecasts.App
import com.bettinghub.forecasts.R
import com.bettinghub.forecasts.Utils
import com.bettinghub.forecasts.backend.BettingHubBackend
import com.bettinghub.forecasts.databinding.FragmentForecastBinding
import com.bettinghub.forecasts.enums.Status
import com.bettinghub.forecasts.models.Comment
import com.bettinghub.forecasts.ui.LoginFragmentDirections
import com.bettinghub.forecasts.ui.forecast.items.ItemAdapter
import com.bettinghub.forecasts.ui.forecast.items.ItemDecoration
import com.bettinghub.forecasts.ui.forecast.items.items.*
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers

class ForecastFragment : Fragment() {
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
        binding.bookmarkBtn.setOnClickListener {
            if (App.appComponent.getAppData().activeUser == null) {
                navController.navigate(LoginFragmentDirections.actionGlobalLoginFragment(R.id.profileFragment))
                return@setOnClickListener
            }
            BettingHubBackend().api.addToFavorite(
                args.forecast.id,
                "Bearer ${App.appComponent.getAppData().activeUser?.accessToken}"
            )
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe({
                    if (it.isSuccessful) {
                        if (!args.forecast.isMarked) {
                            args.forecast.stats.subscriberCount++
                            binding.bookmarkBtn.setImageResource(R.drawable.ic_bookmark)
                        } else {
                            args.forecast.stats.subscriberCount--
                            binding.bookmarkBtn.setImageResource(R.drawable.ic_bookmark_outline)
                        }
                        args.forecast.isMarked = !args.forecast.isMarked
                    }
                }, {
                    it.printStackTrace()
                })
        }
        if (args.forecast.isMarked) {
            binding.bookmarkBtn.setImageResource(R.drawable.ic_bookmark)
        } else {
            binding.bookmarkBtn.setImageResource(R.drawable.ic_bookmark_outline)
        }

        navController = activity?.let { Navigation.findNavController(it, R.id.nav_host_fragment) }!!

        vm = ViewModelProvider(this).get(ForecastViewModel::class.java)
        vm.commentsLiveData.observe(viewLifecycleOwner, Observer {
            if (it.status == Status.SUCCESS) {
                addNewComments(it.data!!.first, it.data.second)
            }
        })
        vm.commentAdded.observe(viewLifecycleOwner, Observer {
            if (it.status == Status.SUCCESS) {
                addComment(it.data!!)
            }
        })
        vm.onCreate(args.forecast.id)

        return binding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        initRV()

        vm.onCreate()
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        binding.backBtn.setOnClickListener {
            activity?.onBackPressed()
        }
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
                vm, vm, this, findNavController()
            )
        binding.forecastRV.adapter = adapter

        items.add(HeaderItem(args.forecast))
        items.add(NewCommentItem())
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
        (binding.forecastRV.adapter as ItemAdapter).let {
            val insertPos = if (position == -1) it.itemCount - 2 else position

            (binding.forecastRV.adapter as ItemAdapter).let {
                it.addAll(insertPos, comments)

                if (position != -1) {
                    it.removeItem(position + comments.size)
                }
            }
        }
    }

    fun getCommentCount(comments: List<Comment>, id: Int?): Int {
        var count = 1
        comments.forEach {
            if (it.repliesTo == id) {
                count += getCommentCount(comments, it.id)
            }
        }
        return count
    }

    private fun addComment(comment: Comment) {
        (binding.forecastRV.adapter as ItemAdapter).let { adapter ->
            if (comment.repliesTo == null) {
                adapter.insertItem(adapter.itemCount - 2, CommentItem(0, comment))
            } else {
                val items = adapter.getItems()
                val comments = items.asSequence().filter { it.getType().ordinal in 0..3 }
                    .map { (it as CommentItem).comment }.toList()

                items.indexOfFirst {
                    val item = it as? CommentItem
                    item?.comment?.id == comment.repliesTo && item.level < 3
                }.let { parentCommentIndex ->
                    if (parentCommentIndex != -1) {
                        val parentComment = items[parentCommentIndex] as CommentItem
                        val position = parentCommentIndex + getCommentCount(comments, parentComment.comment.id)
                        adapter.insertItem(
                            position,
                            CommentItem(parentComment.level + 1, comment)
                        )
                        (binding.forecastRV.layoutManager as LinearLayoutManager).scrollToPosition(
                            position
                        )
                    }
                }
            }
        }
    }
}
