package com.xbethub.webview.ui.privacy

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.Observer
import com.xbethub.webview.R
import com.xbethub.webview.Utils
import kotlinx.android.synthetic.main.element_top_panel.*
import kotlinx.android.synthetic.main.element_top_panel.view.*
import kotlinx.android.synthetic.main.fragment_privacy.*

class PrivacyFragment: Fragment() {

    val viewModel by viewModels<PrivacyViewModel>()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_privacy, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        searchField.visibility = View.GONE
        topPanel.searchBtn.setOnClickListener {
            searchField.visibility = if (searchField.visibility == View.GONE) {
                searchField.requestFocus()
                Utils.showKeyboard(requireContext())
                View.VISIBLE
            } else {
                View.GONE
            }
        }
        viewModel.privacyText.observe(viewLifecycleOwner, Observer {
            text.text = it.data
        })
    }

}
