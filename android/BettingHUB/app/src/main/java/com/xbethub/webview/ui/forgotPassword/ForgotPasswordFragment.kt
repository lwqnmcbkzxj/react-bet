package com.xbethub.webview.ui.forgotPassword

import android.graphics.Color
import android.os.Build
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import com.xbethub.webview.R
import com.xbethub.webview.databinding.FragmentForgotPasswordBinding


class ForgotPasswordFragment : Fragment() {

    private lateinit var binding: FragmentForgotPasswordBinding

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentForgotPasswordBinding.inflate(inflater)
        binding.fragment = this

        return binding.root
    }

    fun onRecoverBtnClick() {

    }

    fun onGoogleBtnClick() {

    }

    fun onFBBtnClick() {

    }

    fun onVKBtnClick() {

    }
}
