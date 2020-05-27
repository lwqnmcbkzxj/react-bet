package com.bettinghub.forecasts.models

class Bookmaker(
    val id: Int,
    val title: String,
    val rating: Float,
    val bonus: Int,
    val link: String,
    val image: String,
    val content: String?
)
