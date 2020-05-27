package com.bettinghub.forecasts.ui.views

import android.content.Context

import android.content.res.TypedArray
import android.graphics.Canvas
import android.graphics.Paint

import android.text.TextPaint
import android.util.AttributeSet
import androidx.appcompat.widget.AppCompatEditText
import com.bettinghub.forecasts.R


internal class EditTextWithSuffix : AppCompatEditText {
    var textPaint = TextPaint(Paint.ANTI_ALIAS_FLAG)
    private var suffix = ""
    private var suffixPadding = 0f

    constructor(context: Context?) : super(context) {}
    constructor(context: Context, attrs: AttributeSet) : super(context, attrs) {
        getAttributes(context, attrs, 0)
    }

    constructor(context: Context, attrs: AttributeSet, defStyleAttr: Int) : super(
        context,
        attrs,
        defStyleAttr
    ) {
        getAttributes(context, attrs, defStyleAttr)
    }

    override fun onDraw(c: Canvas) {
        super.onDraw(c)
        val suffixXPosition =
            textPaint.measureText(text.toString()).toInt() + paddingLeft
        c.drawText(
            suffix,
            Math.max(suffixXPosition.toFloat(), suffixPadding),
            baseline.toFloat(),
            textPaint
        )
    }

    override fun onFinishInflate() {
        super.onFinishInflate()
        textPaint.color = currentTextColor
        textPaint.textSize = textSize
        textPaint.textAlign = Paint.Align.LEFT
    }

    private fun getAttributes(
        context: Context,
        attrs: AttributeSet,
        defStyleAttr: Int
    ) {
        val a: TypedArray =
            context.obtainStyledAttributes(attrs, R.styleable.EditTextWithSuffix, defStyleAttr, 0)

        suffix = a.getString(R.styleable.EditTextWithSuffix_suffix) ?: ""
        suffixPadding = a.getDimension(R.styleable.EditTextWithSuffix_suffixPadding, 0f)

        a.recycle()
    }
}
