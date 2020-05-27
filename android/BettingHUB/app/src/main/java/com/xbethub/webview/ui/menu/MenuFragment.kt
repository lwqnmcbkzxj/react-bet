package com.xbethub.webview.ui.menu

import android.content.Context
import android.os.Bundle
import android.util.Log
import android.util.TypedValue
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.inputmethod.InputMethodManager
import androidx.fragment.app.Fragment
import androidx.navigation.NavController
import androidx.navigation.Navigation
import com.xbethub.webview.App
import com.xbethub.webview.R
import com.xbethub.webview.Utils
import com.xbethub.webview.databinding.FragmentMenuBinding

class MenuFragment: Fragment() {

    private lateinit var navController: NavController
    private lateinit var binding: FragmentMenuBinding

    private var searchActive = false

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentMenuBinding.inflate(inflater)
        binding.fragment = this

        binding.topPanel.bankBalance.balance = "1 500 xB"
        binding.topPanel.bankBalance.root.visibility = if (App.appComponent.getAppData().activeUser == null) View.GONE else View.VISIBLE
        binding.topPanel.searchBtn.setOnClickListener { onSearchBtnClick() }
        binding.privacyBtn.text.setTextSize(TypedValue.COMPLEX_UNIT_SP, 12f)

        navController = activity?.let { Navigation.findNavController(it, R.id.nav_host_fragment) }!!

        updateSearchFieldVisibility()

        return binding.root
    }

    fun onTopMatchesBtnClick() {
        navController.navigate(MenuFragmentDirections.actionMenuFragmentToTopMatchesFragment())
    }

    fun onBookmakerRatingBtnClick() {
        navController.navigate(MenuFragmentDirections.actionMenuFragmentToBookmakerRatingFragment())
    }

    fun onForecasterRatingBtnClick() {
        navController.navigate(MenuFragmentDirections.toForecasterRatingFragment())
    }

    fun onNewsBtnClick() {
        navController.navigate(MenuFragmentDirections.toNewsFragment())
    }

    fun onArticlesBtnClick() {
        navController.navigate(MenuFragmentDirections.toArticlesFragment())
    }

    fun onPrivacyBtnClick() {
        navController.navigate(MenuFragmentDirections.actionMenuFragmentToPrivacyFragment())
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
