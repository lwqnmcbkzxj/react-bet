package com.bettinghub.forecasts.models

import com.google.gson.annotations.SerializedName

class Article(
    val id: Int,
    val image: String,
    @SerializedName("category_name") val categoryName: String,
    @SerializedName("created_at") val createdAt: String,
    val title: String,
    val content: String,
    val commentCount: Int,
    var rating: Int
)
