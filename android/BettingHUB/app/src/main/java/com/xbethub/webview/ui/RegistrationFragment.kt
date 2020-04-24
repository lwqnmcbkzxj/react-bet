package com.xbethub.webview.ui

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import androidx.navigation.NavController
import androidx.navigation.Navigation
import com.xbethub.webview.R

/**
 * A simple [Fragment] subclass.
 */
class RegistrationFragment : Fragment(), View.OnClickListener {
    lateinit var navController: NavController
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment

        return inflater.inflate(R.layout.fragment_registration, container, false)
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        navController = activity?.let { Navigation.findNavController(it, R.id.nav_host_fragment) }!!
        view?.findViewById<Button>(R.id.registration_button)?.setOnClickListener(this)
        view?.findViewById<Button>(R.id.return_to_login_button)?.setOnClickListener(this)
    }

    override fun onClick(v: View?) {
        when (v?.id) {
            R.id.registration_button -> navController.navigate(R.id.action_registrationFragment_to_mainActivity)
            R.id.return_to_login_button -> navController.navigateUp()
        }
    }
}
