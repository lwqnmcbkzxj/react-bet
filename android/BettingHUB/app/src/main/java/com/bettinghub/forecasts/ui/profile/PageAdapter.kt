package com.bettinghub.forecasts.ui.profile

import android.os.Bundle
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentPagerAdapter
import com.bettinghub.forecasts.models.User
import com.bettinghub.forecasts.ui.profile.forecasts.ForecastsFragment
import com.bettinghub.forecasts.ui.profile.statistics.StatisticsFragment

class PageAdapter(val pageCount: Int, fragmentManager: FragmentManager, val user: User)
    : FragmentPagerAdapter(fragmentManager, BEHAVIOR_RESUME_ONLY_CURRENT_FRAGMENT) {

    override fun getItem(position: Int): Fragment {
        when (position) {
            0 -> return ForecastsFragment().apply {
                arguments = Bundle().apply {
                    putInt("user_id", user.id)
                }
            }
            1 -> return StatisticsFragment.newInstance(user)
            2 -> return ForecastsFragment()
        }

        return Fragment()
    }

    override fun getCount(): Int {
        return pageCount
    }

}
