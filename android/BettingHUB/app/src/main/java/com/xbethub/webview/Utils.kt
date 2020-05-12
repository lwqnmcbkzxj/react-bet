package com.xbethub.webview

import android.app.Activity
import android.content.Context
import android.os.Build
import android.text.Html
import android.text.Spanned
import android.view.inputmethod.InputMethodManager


class Utils {
    companion object {
        @JvmStatic
        fun showKeyboard(context: Context) {
            val imm = context.getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
            imm.toggleSoftInput(InputMethodManager.SHOW_IMPLICIT, InputMethodManager.HIDE_IMPLICIT_ONLY)
        }

        @JvmStatic
        fun hideKeyboard(activity: Activity) {
            (activity.getSystemService(Activity.INPUT_METHOD_SERVICE) as? InputMethodManager)?.let { inputMethodManager ->
                activity.currentFocus?.let { currentFocus ->
                    inputMethodManager.hideSoftInputFromWindow(currentFocus.windowToken, 0)
                    currentFocus.clearFocus()
                }
            }
        }

        @JvmStatic
        fun getColor(context: Context, colorResId: Int): Int {
            return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                context.resources.getColor(colorResId, null)
            } else {
                context.resources.getColor(colorResId)
            }
        }

        @JvmStatic
        fun fromHtml(html: String): Spanned {
            return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N)
                Html.fromHtml(html, Html.FROM_HTML_MODE_LEGACY)
                else Html.fromHtml(html)
        }
    }
}
