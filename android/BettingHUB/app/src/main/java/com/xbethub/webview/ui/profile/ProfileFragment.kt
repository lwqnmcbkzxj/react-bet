package com.xbethub.webview.ui.profile

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
import com.xbethub.webview.App
import com.xbethub.webview.R
import com.xbethub.webview.Utils
import com.xbethub.webview.backend.BettingHubBackend
import com.xbethub.webview.databinding.FragmentProfileBinding
import com.xbethub.webview.models.User
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers

class ProfileFragment: Fragment() {

    private val appData = App.appComponent.getAppData()
    private lateinit var navController: NavController
    private lateinit var binding: FragmentProfileBinding

    private var searchActive = false

    val args by navArgs<ProfileFragmentArgs>()


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
        binding.userBlock.settingsBtn.setColorFilter(Utils.getColor(requireContext(), R.color.color5))
        binding.userBlock.settingsBtn.setOnClickListener { onSettingBtnClick() }

        binding.subscribeBtnBlock.visibility = View.GONE

        args.user.let {
            if (it != null) {
                init(it)
                binding.userBlock.settingsBtn.visibility = View.GONE
            } else {
                BettingHubBackend().api.user("Bearer ${appData.activeUser?.accessToken}")
                    .subscribeOn(Schedulers.io())
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribe({
                        init(it)
                    }, {
                        it.printStackTrace()
                    })
            }
        }

        binding.pager.setCurrentItem(0, false)
        binding.pager.addOnPageChangeListener(object: ViewPager.OnPageChangeListener {
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

        binding.tabs.addOnTabSelectedListener(object: TabLayout.OnTabSelectedListener {
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

        fillUserInfo()

        return binding.root
    }

    fun init(user: User) {
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

        Utils.loadAvatar(binding.userBlock.avatar, user.avatar)

        binding.position.value = user.ratingPosition.toString()
        binding.subs.value = user.stats.subscriberCount.toString()
        binding.netProfit.value = String.format("%.2f", user.stats.netProfit.toFloat())

        // TODO: временно, юзать Utils.getWLDString()
        val wdlHtml = requireContext().getString(R.string.wldTemplate)
            .replace("#W_VALUE", user.stats.winCount.toString())
            .replace("#L_VALUE", user.stats.lossCount.toString())
            .replace("#D_VALUE", user.stats.returnCount.toString())

        binding.userBlock.wld.text = Utils.fromHtml(wdlHtml)

        binding.pager.adapter = PageAdapter(2, childFragmentManager, user)
    }

    private fun fillUserInfo() {
        (requireArguments().getSerializable("user") as? User)?.let {user ->

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
