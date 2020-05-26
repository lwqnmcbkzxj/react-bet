package com.bettinghub.forecasts.ui.profile.statistics

import android.os.Build
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.bettinghub.forecasts.R
import com.bettinghub.forecasts.databinding.FragmentUserStatsBinding
import com.bettinghub.forecasts.models.User
import kotlin.math.roundToInt

class StatisticsFragment: Fragment() {

    companion object {

        private val ARG_USER = "user"

        fun newInstance(user: User): StatisticsFragment {
            val fragment = StatisticsFragment()

            fragment.arguments = Bundle().apply {
                putSerializable(ARG_USER, user)
            }

            return fragment
        }
    }

    private lateinit var binding: FragmentUserStatsBinding

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentUserStatsBinding.inflate(inflater)

        (requireArguments().getSerializable(ARG_USER) as User).let {
            val winCount = it.stats.winCount
            val lossCount = it.stats.lossCount
            val returnCount = it.stats.returnCount

            val forecastCount = winCount + lossCount + returnCount

            binding.roi.value = "${String.format("%.2f", it.stats.roi?.toFloat() ?: 0f)}%"
            binding.netProfit.value = String.format("%.2f", it.stats.netProfit.toFloat())
            binding.passability.value = "${if (forecastCount > 0) (winCount.toFloat() / forecastCount * 100).roundToInt() else 0}%"
            binding.avgCoeff.value = String.format("%.2f", it.stats.avgCoeff?.toFloat() ?: 0f)

            binding.forecastCount.text = forecastCount.toString()
            binding.diagram.setValues(listOf(winCount, lossCount, returnCount)
                , listOf(getColor(R.color.color1), getColor(R.color.color2), getColor(R.color.color3)))
        }

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
