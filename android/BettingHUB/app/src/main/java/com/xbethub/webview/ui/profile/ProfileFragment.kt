package com.xbethub.webview.ui.profile

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.navigation.NavController
import androidx.navigation.Navigation
import androidx.viewpager.widget.ViewPager
import com.google.android.material.tabs.TabLayout
import com.xbethub.webview.R
import com.xbethub.webview.Utils
import com.xbethub.webview.databinding.FragmentProfileBinding

class ProfileFragment: Fragment() {

    private lateinit var navController: NavController
    private lateinit var binding: FragmentProfileBinding

    private var searchActive = false

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentProfileBinding.inflate(inflater)
        binding.fragment = this

        binding.topPanel.searchBtn.setOnClickListener { onSearchBtnClick() }
        binding.userBlock.settingsBtn.setColorFilter(Utils.getColor(requireContext(), R.color.color5))
        binding.userBlock.settingsBtn.setOnClickListener { onSettingBtnClick() }

        binding.subscribeBtnBlock.visibility = View.GONE

        // TODO: временнно
        binding.wins.value = "10"
        binding.lesions.value = "5"
        binding.returns.value = "2"
        binding.subs.value = "10"
        binding.seats.value = "3"
        binding.netProfit.value = "268%"

        binding.pager.adapter = PageAdapter(3, childFragmentManager)
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

        return binding.root
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
