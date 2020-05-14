package com.xbethub.webview

import android.app.Activity
import android.content.Context
import android.graphics.Matrix
import android.graphics.drawable.Drawable
import android.os.Build
import android.text.Html
import android.text.Spanned
import android.view.inputmethod.InputMethodManager
import android.widget.ImageView
import com.bumptech.glide.Glide
import com.bumptech.glide.load.DataSource
import com.bumptech.glide.load.engine.GlideException
import com.bumptech.glide.request.RequestListener
import com.bumptech.glide.request.target.Target
import kotlin.math.ceil
import kotlin.math.pow


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

        @JvmStatic
        fun round(value: Double, decimalPlaces: Int): Double {
            val c = 10.0.pow(decimalPlaces.toDouble())
            return if (decimalPlaces <= 0) value else ceil(value * c) / c
        }

        @JvmStatic
        fun round(value: Float, decimalPlaces: Int): Float {
            val c = 10.0.pow(decimalPlaces.toDouble()).toFloat()
            return if (decimalPlaces <= 0) value else ceil(value * c.toDouble()).toFloat() / c
        }

        fun getWLDString(context: Context, w: Int, l: Int, d: Int): Spanned {
            val wldHtml = context.getString(R.string.wldTemplate)
                .replace("#W_VALUE", w.toString())
                .replace("#L_VALUE", l.toString())
                .replace("#D_VALUE", d.toString())

            return fromHtml(wldHtml)
        }

        @JvmStatic
        fun loadAvatar(imageView: ImageView, path: String?) {
            path?.let {
                Glide.with(imageView).load("http://xbethub.com" + path).addListener(object :
                    RequestListener<Drawable> {

                    override fun onLoadFailed(e: GlideException?, model: Any?, target: Target<Drawable>?,
                                              isFirstResource: Boolean): Boolean {
                        imageView.scaleType = ImageView.ScaleType.FIT_CENTER
                        imageView.setImageResource(R.drawable.default_avatar)

                        return true
                    }
                    override fun onResourceReady(resource: Drawable?, model: Any?, target: Target<Drawable>?,
                                                 dataSource: DataSource?, isFirstResource: Boolean): Boolean {
                        resource?.let {
                            val w = resource.intrinsicWidth.toFloat()
                            val h = resource.intrinsicHeight.toFloat()
                            val matrix = Matrix()

                            if (imageView.width == 0) {
                                imageView.addOnLayoutChangeListener { v, left, top, right, bottom, oldLeft, oldTop, oldRight, oldBottom ->
                                    val scale =
                                        Math.max(imageView.width / w, imageView.height / h)

                                    matrix.setScale(scale, scale)

                                    imageView.scaleType = ImageView.ScaleType.MATRIX
                                    imageView.imageMatrix = matrix
                                }
                            } else {
                                val scale =
                                    Math.max(imageView.width / w, imageView.height / h)

                                matrix.setScale(scale, scale)

                                imageView.scaleType = ImageView.ScaleType.MATRIX
                                imageView.imageMatrix = matrix
                            }
                        }

                        return false
                    }
                }).into(imageView)
            } ?: run {
                imageView.scaleType = ImageView.ScaleType.FIT_CENTER
                imageView.setImageResource(R.drawable.default_avatar)
            }
        }
    }
}
