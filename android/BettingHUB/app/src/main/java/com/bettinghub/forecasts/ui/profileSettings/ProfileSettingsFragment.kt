package com.bettinghub.forecasts.ui.profileSettings

import android.annotation.SuppressLint
import android.app.Activity.RESULT_OK
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.provider.OpenableColumns
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.core.net.toFile
import androidx.core.net.toUri
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
import com.bumptech.glide.Glide
import io.reactivex.Completable
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers
import kotlinx.android.synthetic.main.element_user_block.*
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.MultipartBody
import okhttp3.RequestBody.Companion.asRequestBody
import java.io.File

class ProfileSettingsFragment : Fragment() {
    private val backend = App.appComponent.getBackend()
    private val appData = App.appComponent.getAppData()
    private val settings = App.appComponent.getSettings()
    private lateinit var navController: NavController
    private lateinit var binding: FragmentProfileSettingsBinding
    private var searchActive = false
    private var selectedImage: Uri? = null

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentProfileSettingsBinding.inflate(inflater)
        binding.fragment = this

        binding.topPanel.bankBalance.root.visibility = View.GONE
        binding.userBlock.settingsBtn.setColorFilter(
            Utils.getColor(
                requireContext(),
                R.color.color4
            )
        )
        binding.topPanel.searchBtn.setOnClickListener {

            onSearchBtnClick()
        }
        binding.userBlock.avatar.setOnClickListener {
            val intent = Intent(Intent.ACTION_GET_CONTENT).apply {
                type = "image/*"
            }
            startActivityForResult(Intent.createChooser(intent, "Select Image"), 0)
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

        Glide.with(binding.userBlock.avatar).load("https://app.betthub.org" + user.avatar).into(binding.userBlock.avatar)
    }

    fun onBackBtnClick() {
        activity?.onBackPressed()
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
                selectedImage?.let { uri ->
                    val file = createTempFile("avatar", null, requireContext().cacheDir)
                    App.appComponent.getBackend().api.loadAvatar(
                        "Bearer ${App.appComponent.getAppData().activeUser?.accessToken}",
                        MultipartBody.Part.createFormData(
                            "avatar",
                            file.name,
                            file.asRequestBody(
                                requireContext().contentResolver.getType(uri)?.toMediaType()
                            )
                        )
                    ).subscribeOn(Schedulers.io())
                        .observeOn(AndroidSchedulers.mainThread())
                        .subscribe({ response ->
                            Toast.makeText(requireContext(), "Фотография добавлена", Toast.LENGTH_LONG).show()
                            findNavController().navigate(ProfileSettingsFragmentDirections.toProfileFragment())
                        }, {
                            it.printStackTrace()
                            findNavController().navigate(ProfileSettingsFragmentDirections.toProfileFragment())
                        })
                }
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

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == RESULT_OK) {
            data?.data?.let {
                selectedImage = it
                avatar.setImageURI(it)
            }
        }
    }
}
