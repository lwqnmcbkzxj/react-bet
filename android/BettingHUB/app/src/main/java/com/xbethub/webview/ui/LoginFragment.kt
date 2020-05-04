package com.xbethub.webview.ui

import android.annotation.SuppressLint
import android.os.Bundle
import android.os.HandlerThread
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import androidx.navigation.NavController
import androidx.navigation.Navigation
import com.google.android.material.textfield.TextInputEditText
import com.google.gson.JsonObject
import com.xbethub.webview.App
import com.xbethub.webview.R
import com.xbethub.webview.backend.BettingHubBackend
import com.xbethub.webview.backend.requests.GetTokenRequest
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.lang.reflect.Field

/**
 * A simple [Fragment] subclass.
 */
class LoginFragment : Fragment(), View.OnClickListener {
    lateinit var navController: NavController
    lateinit var loginField: EditText
    lateinit var passwordField: TextInputEditText
    private val TAG = "LoginFragment"
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
            R.id.login_button -> login()
            R.id.forgot_password_button -> {
                navController.navigate(R.id.action_loginFragment2_to_forgotPasswordFragment)
            }
            R.id.return_to_login_button -> {
                navController.navigate(R.id.action_loginFragment2_to_registrationFragment)
            }
        }
    }
    @SuppressLint("CheckResult")
    private fun login() {
        if (!this::loginField.isInitialized) {
            loginField = view?.findViewById<EditText>(R.id.login_field)!!
        }
        if (!this::passwordField.isInitialized) {
            passwordField = view?.findViewById<TextInputEditText>(R.id.password)!!
        }
        val login = loginField.text.toString()
        val password = passwordField.text.toString()

        //я не знаю, что этому запросу надо
        //сейчас(4.05.2020) сервер отвечает 400
        val getTokenRequest = GetTokenRequest(
            username = login,
            password = password
        )

        BettingHubBackend().api.getToken(getTokenRequest)
            .subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe({
                Log.i(TAG, "token: $it")
            }, {
                Log.i(TAG, "token: ${it.message}")
                it.printStackTrace()
            })
        //todo: move to successfully result of request when it starts work
        navController.navigate(R.id.action_loginFragment2_to_mainActivity)
        activity?.finish()
    }
}
