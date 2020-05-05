package com.xbethub.webview.ui


import android.annotation.SuppressLint
import android.net.DnsResolver
import android.os.Bundle
import android.os.Handler
import android.util.Log
import android.util.Patterns
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.navigation.NavController
import androidx.navigation.Navigation
import com.google.android.material.textfield.TextInputEditText
import com.google.gson.JsonObject
import com.xbethub.webview.App
import com.xbethub.webview.R
import com.xbethub.webview.backend.BettingHubBackend
import com.xbethub.webview.backend.requests.RegisterUserRequest
import com.xbethub.webview.http_client.BetApi
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers
import kotlinx.android.synthetic.main.fragment_registration.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

/**
 * A simple [Fragment] subclass.
 */
class RegistrationFragment : Fragment(), View.OnClickListener {
    private val TAG = "RegistrationFragment"
    lateinit var navController: NavController
    lateinit var betApi: BetApi
    lateinit var passwordField: TextInputEditText
    lateinit var passwordRepeatField: TextInputEditText
    lateinit var emailField : EditText
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        betApi = (activity?.application as? App)?.getApi() !! //getApi
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
            R.id.registration_button -> register()
            R.id.return_to_login_button -> navController.navigateUp()
        }
    }
    @SuppressLint("CheckResult")
    private fun register() {
        //internal functions
        fun makeUser(name: String, email: String, password: String) : JsonObject {
            val user = JsonObject()
            user.addProperty("username", name)
            user.addProperty("email", email)
            user.addProperty("password", password)
            return user
        }
        fun checkAndInitFields() {
            if (!(
                    this::emailField.isInitialized &&
                    this::passwordField.isInitialized &&
                    this::passwordRepeatField.isInitialized
                )
            ) {
                emailField = view?.findViewById(R.id.login_field) !!
                passwordField = view?.findViewById(R.id.password) !!
                passwordRepeatField = view?.findViewById(R.id.password_repeat) !!
            }
        }
        fun invalidEmailAction() {
            emailField.setText("", TextView.BufferType.EDITABLE)
            emailField.setHint(R.string.invalid_email)
            emailField.setBackgroundResource(R.drawable.bg_corned_frame_error)
        }
        fun validEmailAction() {
            emailField.setHint(R.string.login_field_hint)
            emailField.setBackgroundResource(R.drawable.bg_cornered_frame)
        }
        fun isEmailValid() : Boolean {
            val email = emailField.text.toString()
            val isValid = email.isNotEmpty() && Patterns.EMAIL_ADDRESS.matcher(email).matches()
            return if (isValid) {
                validEmailAction()
                true
            } else {
                invalidEmailAction()
                false
            }
        }
        fun checkPasswords(): Boolean {
            val password = passwordField.text.toString()
            val passwordRepeat = passwordRepeatField.text.toString()
            if (password.length < 6) {
                passwordField.setText("", TextView.BufferType.EDITABLE)
                passwordRepeatField.setText("", TextView.BufferType.EDITABLE)
                passwordField.setBackgroundResource(R.drawable.bg_corned_frame_error)
                passwordField.setHint(R.string.too_short_password_hint)
                return false
            }
            passwordField.setBackgroundResource(R.drawable.bg_cornered_frame)
            passwordField.setHint(R.string.password_hint)
            if (password != passwordRepeat) {
                passwordRepeatField.setText("", TextView.BufferType.EDITABLE)
                passwordRepeatField.setBackgroundResource(R.drawable.bg_corned_frame_error)
                passwordRepeatField.setHint(R.string.dismatch_passwords_hint)
                return false
            }
            passwordRepeatField.setBackgroundResource(R.drawable.bg_cornered_frame)
            passwordRepeatField.setHint(R.string.password_hint)
            return true
        }

        //now I actually do things
        checkAndInitFields()
        if (!isEmailValid()) return
        if (!checkPasswords()) return



        val email = emailField.text.toString()
//        val name = email.split("@", true, 0)[0]

        BettingHubBackend().api.registerUser(registerUserRequest = RegisterUserRequest(
            username = email,
            email = email,
            password = password.text.toString()
        ))
        .subscribeOn(Schedulers.io())
        .observeOn(AndroidSchedulers.mainThread())
        .subscribe({
            Log.i(TAG, "OK: ")
            navController.navigateUp()
        }, {
            Log.e(TAG, "registration: ${it.message}")
            it.printStackTrace()
        })
    }
}
