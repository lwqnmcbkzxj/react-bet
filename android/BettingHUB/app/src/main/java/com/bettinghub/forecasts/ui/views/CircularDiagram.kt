package com.bettinghub.forecasts.ui.views

import android.content.Context
import android.graphics.*
import android.util.AttributeSet
import android.view.View
import com.bettinghub.forecasts.R

class CircularDiagram: View {
    private val values = ArrayList<Pair<Float, Int>>()
    private val paint = Paint(Paint.ANTI_ALIAS_FLAG)
    private val rect = RectF()
    private val anglePadding: Float
        get() = if (values.count { it.first == 0f } > 1) 0f else 2f

    private var strokeWidth = 10

    init {
        paint.style = Paint.Style.STROKE
        paint.strokeWidth = strokeWidth.toFloat()
    }

    constructor(context: Context) : super(context) {}

    constructor(context: Context, attrs: AttributeSet) : super(context, attrs) {
        val a = context.theme.obtainStyledAttributes(attrs, R.styleable.CircularDiagram, 0, 0)

        strokeWidth = a.getDimensionPixelSize(R.styleable.CircularDiagram_strokeWidth, strokeWidth)

        a.recycle()
    }

    fun setValues(values: List<Int>, colors: List<Int>) {
        val total = values.sum().toFloat()

        this.values.clear()

        for (i in values.indices) {
            this.values.add(Pair(values[i] / total, colors[i]))
        }

        this.values.sortWith(Comparator { o1, o2 ->  o2.first.compareTo(o1.first)})

        invalidate()
    }

    override fun onDraw(canvas: Canvas?) {
        if (values.isEmpty() || values.all { it.first.isNaN() || it.first == 0f }) {
            return
        }

        rect.set(paint.strokeWidth
            , paint.strokeWidth
            , width.toFloat() - paint.strokeWidth
            , height.toFloat() - paint.strokeWidth)

        val total = 360f - values.size * anglePadding
        var startAngle = -90 + anglePadding
        var sweepAngle: Float

        for (v in values) {
            paint.color = v.second

            sweepAngle = v.first * total

            canvas?.drawArc(rect, startAngle, sweepAngle, false, paint)

            startAngle += sweepAngle + anglePadding
        }
    }
}