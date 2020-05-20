package com.xbethub.webview.models

import android.os.Parcel
import android.os.Parcelable

class Bookmaker(
    val id: Int,
    val title: String,
    val rating: Float,
    val bonus: Int,
    val link: String,
    val image: String,
    val content: String?
)
