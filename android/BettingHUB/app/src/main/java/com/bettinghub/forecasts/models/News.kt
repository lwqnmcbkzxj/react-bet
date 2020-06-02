package com.bettinghub.forecasts.models

import com.google.gson.annotations.SerializedName

class News(
    val id: Int,
    val title: String,
    val content: String,
    val link: String,
    @SerializedName("category_name") val categoryName: String,
    @SerializedName("created_at") val createdAt: String
)
