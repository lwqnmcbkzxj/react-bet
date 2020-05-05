package com.xbethub.webview.ui.profileSettings

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.navigation.NavController
import androidx.navigation.Navigation
import com.xbethub.webview.R
import com.xbethub.webview.Utils
import com.xbethub.webview.databinding.FragmentProfileSettingsBinding

class ProfileSettingsFragment: Fragment() {

    private lateinit var navController: NavController
    private lateinit var binding: FragmentProfileSettingsBinding

    private var searchActive = false

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentProfileSettingsBinding.inflate(inflater)
        binding.fragment = this

        binding.topPanel.searchBtn.setOnClickListener { onSearchBtnClick() }

        updateSearchFieldVisibility()

        navController = activity?.let { Navigation.findNavController(it, R.id.nav_host_fragment) }!!

        return binding.root
    }

    fun onBackBtnClick() {

    }

    fun onRateAppBtnClick() {

    }

    fun onRussianBtnClick() {

    }

    fun onEnglishBtnClick() {

    }

    fun onSaveChangesBtnClick() {

    }

    fun onSignOutBtnClick() {

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
}
