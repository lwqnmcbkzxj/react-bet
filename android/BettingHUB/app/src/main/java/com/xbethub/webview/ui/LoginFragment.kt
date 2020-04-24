package com.xbethub.webview.ui

import android.os.Bundle
import android.os.HandlerThread
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import androidx.navigation.NavController
import androidx.navigation.Navigation
import com.google.android.material.textfield.TextInputEditText
import com.xbethub.webview.App
import com.xbethub.webview.R
import java.lang.reflect.Field

/**
 * A simple [Fragment] subclass.
 */
class LoginFragment : Fragment(), View.OnClickListener {
    lateinit var navController: NavController
    lateinit var loginField: EditText
    lateinit var passwordField: TextInputEditText
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_login, container, false)
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        navController = activity?.let { Navigation.findNavController(it, R.id.nav_host_fragment) }!!
        view?.findViewById<Button>(R.id.return_to_login_button)?.setOnClickListener(this)
        view?.findViewById<Button>(R.id.forgot_password_button)?.setOnClickListener(this)
        view?.findViewById<Button>(R.id.login_button)?.setOnClickListener(this)


    }

    override fun onClick(v: View?) {
        when(v?.id) {
            R.id.login_button -> {
                if (!this::loginField.isInitialized) {
                    loginField = view?.findViewById<EditText>(R.id.login_field)!!
                }
                if (!this::passwordField.isInitialized) {
                    passwordField = view?.findViewById<TextInputEditText>(R.id.password)!!
                }
                val login = loginField.text
                val password = passwordField.text ?: ""

                (activity?.application as? App)?.getApi()
                navController.navigate(R.id.action_loginFragment2_to_mainActivity)
                activity?.finish()
            }
            R.id.forgot_password_button -> {
                navController.navigate(R.id.action_loginFragment2_to_forgotPasswordFragment)
            }
            R.id.return_to_login_button -> {
                navController.navigate(R.id.action_loginFragment2_to_registrationFragment)
            }
        }
    }

}
