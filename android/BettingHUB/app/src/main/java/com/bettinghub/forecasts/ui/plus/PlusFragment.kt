package com.bettinghub.forecasts.ui.plus

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.navigation.NavController
import androidx.navigation.Navigation
import com.bettinghub.forecasts.App
import com.bettinghub.forecasts.R

class PlusFragment: Fragment() {
    private lateinit var navController: NavController

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        navController = activity?.let { Navigation.findNavController(it, R.id.nav_host_fragment) }!!

        if (App.appComponent.getAppData().activeUser == null) {
            navController.navigate(PlusFragmentDirections.toLoginFragment(R.id.addForecastFragment))
        } else {
            navController.navigate(PlusFragmentDirections.toAddForecastFragment())
        }

        return super.onCreateView(inflater, container, savedInstanceState)
    }
}