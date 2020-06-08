package com.bettinghub.forecasts.ui.profile

import android.annotation.SuppressLint
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.navigation.NavController
import androidx.navigation.Navigation
import androidx.navigation.fragment.navArgs
import androidx.viewpager.widget.ViewPager
import com.google.android.material.tabs.TabLayout
import com.bettinghub.forecasts.App
import com.bettinghub.forecasts.R
import com.bettinghub.forecasts.Settings
import com.bettinghub.forecasts.Utils
import com.bettinghub.forecasts.backend.BettingHubBackend
import com.bettinghub.forecasts.databinding.FragmentProfileBinding
import com.bettinghub.forecasts.models.User
import com.bumptech.glide.Glide
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers
import kotlinx.android.synthetic.main.fragment_profile.*

class ProfileFragment : Fragment() {

    private val appData = App.appComponent.getAppData()
    private lateinit var navController: NavController
    private lateinit var binding: FragmentProfileBinding

    private var searchActive = false
    private val args by navArgs<ProfileFragmentArgs>()
    private val settings = App.appComponent.getSettings()


    @SuppressLint("SetTextI18n")
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentProfileBinding.inflate(inflater)
        binding.fragment = this

        binding.topPanel.bankBalance.root.visibility = View.GONE
        binding.topPanel.searchBtn.setOnClickListener { onSearchBtnClick() }
        binding.userBlock.settingsBtn.setColorFilter(
            Utils.getColor(
                requireContext(),
                R.color.color5
            )
        )
        binding.userBlock.settingsBtn.setOnClickListener { onSettingBtnClick() }
        args.user?.let { user ->
            init(user, false)
            binding.tabs.removeTabAt(2)
            binding.userBlock.settingsBtn.visibility = View.GONE
            binding.subscribeBtn.setOnClickListener {
                BettingHubBackend().api.subscribe(user.id, "Bearer ${appData.activeUser?.accessToken}")
                    .subscribeOn(Schedulers.io())
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribe({
                        println(it)
                        if (it.isSuccessful) {
                            subscribeBtn.visibility = View.GONE
                            unsubscribeBtn.visibility = View.VISIBLE
                        }
                    }, {
                        it.printStackTrace()
                    })
            }
            binding.unsubscribeBtn.setOnClickListener {
                BettingHubBackend().api.subscribe(user.id, "Bearer ${appData.activeUser?.accessToken}")
                    .subscribeOn(Schedulers.io())
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribe({
                        if (it.isSuccessful) {
                            unsubscribeBtn.visibility = View.GONE
                            subscribeBtn.visibility = View.VISIBLE
                        }
                    }, {
                        it.printStackTrace()
                    })
            }
            if (user.isSubscribed) {
                binding.subscribeBtn.visibility = View.GONE
                binding.unsubscribeBtn.visibility = View.VISIBLE
            } else {
                binding.unsubscribeBtn.visibility = View.GONE
                binding.subscribeBtn.visibility = View.VISIBLE
            }
        } ?: run {
            binding.subscribeBtnBlock.visibility = View.GONE
            appData.activeUser?.user?.let { activeUser ->
                init(activeUser)
            } ?: run {
                binding.loading.root.visibility = View.VISIBLE

                BettingHubBackend().api.user("Bearer ${appData.activeUser?.accessToken}")
                    .subscribeOn(Schedulers.io())
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribe({
                        settings.setInt(Settings.userId, it.id)
                        appData.activeUser!!.user = it
                        appData.activeUser!!.id = it.id
                        init(it)
                        binding.loading.root.visibility = View.GONE
                    }, {
                        it.printStackTrace()
                    })
            }
        }

        binding.pager.setCurrentItem(0, false)
        binding.pager.addOnPageChangeListener(object : ViewPager.OnPageChangeListener {
            override fun onPageScrollStateChanged(state: Int) {}

            override fun onPageScrolled(
                position: Int,
                positionOffset: Float,
                positionOffsetPixels: Int
            ) {
            }

            override fun onPageSelected(position: Int) {
                binding.tabs.getTabAt(position)?.select()
            }

        })

        binding.tabs.addOnTabSelectedListener(object : TabLayout.OnTabSelectedListener {
            override fun onTabReselected(tab: TabLayout.Tab?) {}

            override fun onTabUnselected(tab: TabLayout.Tab?) {

            }

            override fun onTabSelected(tab: TabLayout.Tab?) {
                tab?.let {
                    if (it.position != binding.pager.currentItem) {
                        binding.pager.setCurrentItem(it.position, true)
                    }
                }
            }

        })

        updateSearchFieldVisibility()

        navController = activity?.let { Navigation.findNavController(it, R.id.nav_host_fragment) }!!

        return binding.root
    }

    fun init(user: User, current: Boolean = true) {
        binding.userBlock.userName.text = user.login
        binding.userBlock.balance.text = "${user.balance} xB"

        val roi = user.stats.roi?.toFloat() ?: 0f
        binding.roi.text = "+${String.format("%.2f", roi)}%"

        when {
            roi > 0f -> {
                binding.roi.setTextColor(ContextCompat.getColor(requireContext(), R.color.color1))
            }
            roi < 0f -> {
                binding.roi.setTextColor(ContextCompat.getColor(requireContext(), R.color.color2))
            }
            else -> {
                binding.roi.setTextColor(ContextCompat.getColor(requireContext(), R.color.color5))
            }
        }

        Glide.with(binding.userBlock.avatar).load("https://app.betthub.org" + user.avatar).into(binding.userBlock.avatar)

        binding.position.value = user.ratingPosition.toString()
        binding.subs.value = user.stats.subscriberCount.toString()
        binding.netProfit.value = String.format("%.2f", user.stats.netProfit.toFloat())

        // TODO: временно, юзать Utils.getWLDString()
        val wdlHtml = requireContext().getString(R.string.wldTemplate)
            .replace("#W_VALUE", user.stats.winCount.toString())
            .replace("#L_VALUE", user.stats.lossCount.toString())
            .replace("#D_VALUE", user.stats.returnCount.toString())

        binding.userBlock.wld.text = Utils.fromHtml(wdlHtml)

        if (current) {
            binding.pager.offscreenPageLimit = 3
            binding.pager.adapter = PageAdapter(3, childFragmentManager, user)
            binding.pager.setCurrentItem(binding.tabs.selectedTabPosition, false)
        } else {
            binding.pager.offscreenPageLimit = 2
            binding.pager.adapter = PageAdapter(2, childFragmentManager, user)
            binding.pager.setCurrentItem(binding.tabs.selectedTabPosition, false)
        }
    }

    private fun fillUserInfo() {
        (requireArguments().getSerializable("user") as? User)?.let { user ->

        } ?: run {
            appData.activeUser?.let {

            } ?: run {
                navController.navigate(R.id.loginFragment)
            }
        }
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

    fun onSettingBtnClick() {
        navController.navigate(ProfileFragmentDirections.toProfileSettingsFragment())
    }
}
