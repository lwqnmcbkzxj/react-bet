package com.bettinghub.forecasts

import android.content.Context
import android.content.SharedPreferences

class Settings(context: Context) {
    companion object {
        val accessTokenKey = "accessToken"
        val refreshTokenKey = "refreshToken"
        val userId = "userId"
    }

    private val preferencesName = "BHPreferences"
    private val sp = context.getSharedPreferences(preferencesName, Context.MODE_PRIVATE)


    fun getString(name: String): String {
        return sp.getString(name, "")!!
    }

    fun getInt(name: String): Int {
        return sp.getInt(name, -1)
    }

    fun setString(name: String?, value: String?) {
        val editor: SharedPreferences.Editor = sp.edit()
        editor.putString(name, value)
        editor.apply()
    }


    fun setInt(name: String?, value: Int) {
        val editor: SharedPreferences.Editor = sp.edit()
        editor.putInt(name, value)
        editor.apply()
    }
}
