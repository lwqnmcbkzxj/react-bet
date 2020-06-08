package com.bettinghub.forecasts.models

import com.google.gson.annotations.SerializedName

data class Comment(
    val id: Int,
    val userId: Int,
    @SerializedName("created_at") val createdAt: String,
    var rating: Int,
    val text: String,
    @SerializedName("replies_to") val repliesTo: Int?,
    var vote: String?
) {
}
