package com.bettinghub.forecasts.ui.profileSettings

import android.annotation.SuppressLint
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.navigation.NavController
import androidx.navigation.Navigation
import androidx.navigation.fragment.findNavController
import com.bettinghub.forecasts.App
import com.bettinghub.forecasts.R
import com.bettinghub.forecasts.Settings
import com.bettinghub.forecasts.Utils
import com.bettinghub.forecasts.databinding.FragmentProfileSettingsBinding
import com.bettinghub.forecasts.models.User
import io.reactivex.Completable
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers

class ProfileSettingsFragment: Fragment() {
    private val backend = App.appComponent.getBackend()
    private val appData = App.appComponent.getAppData()
    private val settings = App.appComponent.getSettings()
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

        binding.topPanel.bankBalance.root.visibility = View.GONE
        binding.userBlock.settingsBtn.setColorFilter(Utils.getColor(requireContext(), R.color.color4))
        binding.topPanel.searchBtn.setOnClickListener { onSearchBtnClick() }
        binding.backBtn.setOnClickListener {
            findNavController().navigateUp()
        }
        updateSearchFieldVisibility()

        navController = activity?.let { Navigation.findNavController(it, R.id.nav_host_fragment) }!!

        appData.activeUser?.user?.let {
            init(it)
        }


        return binding.root
    }

    private fun init(user: User) {
        binding.userBlock.userName.text = user.login
        binding.userBlock.balance.text = "${user.balance} xB"

        binding.emailField.setText(user.email)

        Utils.loadAvatar(binding.userBlock.avatar, user.avatar)
    }

    fun onBackBtnClick() {

    }

    fun onRateAppBtnClick() {

    }

    fun onRussianBtnClick() {

    }

    fun onEnglishBtnClick() {

    }

    @SuppressLint("CheckResult")
    fun onSaveChangesBtnClick() {
        val email = binding.emailField.text.toString()

        Completable.create({
            backend.api.updateEmail("Bearer ${appData.activeUser?.accessToken}", email)
            it.onComplete()
        }).subscribeOn(Schedulers.io())
        .observeOn(AndroidSchedulers.mainThread())
            .subscribe({
                appData.activeUser?.user?.email = email
            }, {
                it.printStackTrace()
            })

    }

    fun onSignOutBtnClick() {
        appData.activeUser = null
        settings.setString(Settings.accessTokenKey, "")
        settings.setString(Settings.refreshTokenKey, "")
        navController.navigate(ProfileSettingsFragmentDirections.toLoginFragment(R.id.profileFragment))
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
