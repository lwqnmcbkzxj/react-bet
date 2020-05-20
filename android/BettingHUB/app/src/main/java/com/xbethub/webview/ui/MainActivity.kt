package com.xbethub.webview.ui

import android.graphics.Color
import android.os.Build
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.app.AppCompatDelegate
import androidx.core.content.ContextCompat
import androidx.navigation.findNavController
import androidx.navigation.ui.setupWithNavController
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.xbethub.webview.App
import com.xbethub.webview.R
import com.xbethub.webview.Settings
import com.xbethub.webview.models.ActiveUser

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
//        setTheme(R.style.AppTheme)//avoid showing splash screen after loading //IMPORTANT!!! need to call before super.onCreate()
        super.onCreate(savedInstanceState)
        setTheme(R.style.AppTheme)
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO) //disable dark theme
        setContentView(R.layout.activity_main)
        val navView: BottomNavigationView = findViewById(R.id.nav_view)
        val settings = Settings(this)
        Pair(settings.getString(Settings.accessTokenKey), settings.getString(Settings.refreshTokenKey)).let {
            if (it.first.isNotEmpty() && it.second.isNotEmpty()) {
                App.appComponent.getAppData().activeUser = ActiveUser(it.first, it.second)
            }
        }

        val navController = findNavController(R.id.nav_host_fragment)
//        setupActionBarWithNavController(navController, appBarConfiguration)
        navView.setupWithNavController(navController)
        navController.addOnDestinationChangedListener { _, destination, _ ->
            window.let { window ->
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                    if (destination.id == R.id.loginFragment || destination.id == R.id.registrationFragment || destination.id == R.id.forgotPasswordFragment) {
                        window.statusBarColor = Color.WHITE
                        window.decorView.systemUiVisibility =
                            window.decorView.systemUiVisibility or View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR
                    } else {
                        window.statusBarColor =
                            ContextCompat.getColor(this, R.color.main_blue)

                        window.decorView.systemUiVisibility.let {
                            if (it or View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR == it) {
                                window.decorView.systemUiVisibility = it xor View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR
                            }
                        }
                    }
                }
            }
        }
    }

}
