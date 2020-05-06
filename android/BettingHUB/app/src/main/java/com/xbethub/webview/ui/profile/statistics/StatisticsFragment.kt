package com.xbethub.webview.ui.profile.statistics

import android.os.Build
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.xbethub.webview.R
import com.xbethub.webview.databinding.FragmentUserStatsBinding

class StatisticsFragment: Fragment() {

    private lateinit var binding: FragmentUserStatsBinding

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentUserStatsBinding.inflate(inflater)

        // TODO: временно
        binding.roi.value = "128.5%"
        binding.netProfit.value = "28%"
        binding.passability.value = "65%"
        binding.avgCoeff.value = "1.78"

        binding.diagram.setValues(listOf(55, 150, 200)
            , listOf(getColor(R.color.color1), getColor(R.color.color2), getColor(R.color.color3)))

        return binding.root
    }

    private fun getColor(colorResId: Int): Int {
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            resources.getColor(colorResId, null)
        } else {
            resources.getColor(colorResId)
        }
    }
}
