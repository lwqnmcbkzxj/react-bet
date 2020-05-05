package com.xbethub.webview

import android.content.Context
import android.view.inputmethod.InputMethodManager

class Utils {
    companion object {
        @JvmStatic
        fun showKeyboard(context: Context) {
            val imm = context.getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
            imm.toggleSoftInput(InputMethodManager.SHOW_IMPLICIT, InputMethodManager.HIDE_IMPLICIT_ONLY)
        }
    }
}
