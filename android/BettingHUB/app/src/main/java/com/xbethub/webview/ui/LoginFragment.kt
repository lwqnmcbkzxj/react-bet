package com.xbethub.webview.ui

import android.annotation.SuppressLint
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.NavController
import androidx.navigation.Navigation
import com.xbethub.webview.App
import com.xbethub.webview.R
import com.xbethub.webview.Settings
import com.xbethub.webview.Utils
import com.xbethub.webview.backend.BettingHubBackend
import com.xbethub.webview.backend.requests.TokenRequest
import com.xbethub.webview.databinding.FragmentLoginBinding
import com.xbethub.webview.models.ActiveUser
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers
import kotlin.math.log

class LoginFragment : Fragment() {
    private lateinit var navController: NavController
    private lateinit var binding: FragmentLoginBinding

    private val backend = App.appComponent.getBackend()
    private val settings = App.appComponent.getSettings()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentLoginBinding.inflate(inflater)
        binding.fragment = this

        binding.error.root.visibility = View.GONE

        navController = activity?.let { Navigation.findNavController(it, R.id.nav_host_fragment) }!!

        return binding.root
    }

    fun onGoogleBtnClick() {

    }

    fun onFBBtnClick() {

    }

    fun onVKBtnClick() {

    }

    fun onLoginBtnClick() {
        binding.error.root.visibility = View.GONE
        activity?.let { Utils.hideKeyboard(it)}
        login()
    }

    fun onForgotPasswordBtnClick() {
        navController.navigate(LoginFragmentDirections.toForgotPasswordFragment())
    }

    fun onRegisterBtnClick() {
       navController.navigate(LoginFragmentDirections.toRegistrationFragment(requireArguments().getInt("nextFragmentId")))
    }

    @SuppressLint("CheckResult")
    private fun login() {
// TODO: раскоментить
//        val login = binding.loginField.text.toString()
//        val password = binding.passwordField.text.toString()
//
//        if (login.isEmpty() || password.isEmpty()) {
//            binding.error.errorText = getString(R.string.fillAllFields)
//            binding.error.root.visibility = View.VISIBLE
//            return
//        }
//
//        BettingHubBackend().api.token(TokenRequest(username = login, password = password))
//            .subscribeOn(Schedulers.io())
//            .observeOn(AndroidSchedulers.mainThread())
//            .subscribe({
//                settings.setString(Settings.accessTokenKey, it.accessToken)
//                settings.setString(Settings.refreshTokenKey, it.refreshToken)
//
//                navController.navigate(LoginFragmentDirections.toMainActivity())
//                activity?.finish()
//            }, {
//                binding.error.errorText = getString(R.string.wrongLoginOrPassword)
//                binding.error.root.visibility = View.VISIBLE
//                it.printStackTrace()
//            })
       // navController.navigate(LoginFragmentDirections.toMainActivity())
        //activity?.finish()

        val nextFragmentId = requireArguments().getInt("nextFragmentId")

        App.appComponent.getAppData().activeUser = ActiveUser("", "")

        navController.navigate(nextFragmentId)

    }
}
