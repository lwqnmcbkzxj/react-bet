package com.xbethub.webview.ui.menu

import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.inputmethod.InputMethodManager
import androidx.fragment.app.Fragment
import androidx.navigation.NavController
import androidx.navigation.Navigation
import com.xbethub.webview.R
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

        binding.topPanel.searchBtn.setOnClickListener { onSearchBtnClick() }

        navController = activity?.let { Navigation.findNavController(it, R.id.nav_host_fragment) }!!

        updateSearchFieldVisibility()

        return binding.root
    }

    fun onTopMatchesBtnClick() {

    }

    fun onBookmakerRatingBtnClick() {

    }

    fun onForecasterRatingBtnClick() {
        navController.navigate(R.id.toForecasterRatingFragment)
    }

    fun onNewsBtnClick() {

    }

    fun onArticlesBtnClick() {

    }

    private fun updateSearchFieldVisibility() {
        binding.topPanel.searchField.visibility = if (searchActive) View.VISIBLE else View.GONE

        if (searchActive) {
            binding.topPanel.searchField.requestFocus()
            showKeyboard()
        }
    }

    fun showKeyboard() {
        val imm = requireContext().getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
        imm.toggleSoftInput(InputMethodManager.SHOW_IMPLICIT, InputMethodManager.HIDE_IMPLICIT_ONLY)
    }

    fun onSearchBtnClick() {
        searchActive = !searchActive
        updateSearchFieldVisibility()
    }
}
