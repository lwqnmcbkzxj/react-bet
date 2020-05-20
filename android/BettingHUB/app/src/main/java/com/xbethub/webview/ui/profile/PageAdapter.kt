package com.xbethub.webview.ui.profile

import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentPagerAdapter
import com.xbethub.webview.models.User
import com.xbethub.webview.ui.profile.forecasts.ForecastsFragment
import com.xbethub.webview.ui.profile.statistics.StatisticsFragment

class PageAdapter(val pageCount: Int, fragmentManager: FragmentManager, val user: User)
    : FragmentPagerAdapter(fragmentManager, 	BEHAVIOR_RESUME_ONLY_CURRENT_FRAGMENT) {

    override fun getItem(position: Int): Fragment {
        when (position) {
            0 -> return ForecastsFragment()
            1 -> return StatisticsFragment.newInstance(user)
//            2 -> return ForecastsFragment()
        }

        return Fragment()
    }

    override fun getCount(): Int {
        return pageCount
    }

}