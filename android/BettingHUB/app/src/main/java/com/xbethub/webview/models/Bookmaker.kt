package com.xbethub.webview.models

import android.os.Parcel
import android.os.Parcelable

class Bookmaker() : Parcelable {
    constructor(parcel: Parcel) : this() {
    }

    override fun writeToParcel(parcel: Parcel, flags: Int) {

    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<Bookmaker> {
        override fun createFromParcel(parcel: Parcel): Bookmaker {
            return Bookmaker(parcel)
        }

        override fun newArray(size: Int): Array<Bookmaker?> {
            return arrayOfNulls(size)
        }
    }
}
