package com.xbethub.webview

import android.annotation.SuppressLint
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.xbethub.webview.backend.responses.UsersResponse
import com.xbethub.webview.enums.Direction
import com.xbethub.webview.models.User
import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.Disposable
import io.reactivex.schedulers.Schedulers
import kotlinx.coroutines.Dispatchers
import java.util.*
import kotlin.collections.HashMap

abstract class BaseViewModel: ViewModel() {
    protected val backendAPI = App.appComponent.getBackend().api
    protected val consts = App.appComponent.getConstants()
    protected val appData = App.appComponent.getAppData()

    private val requests = HashMap<String, Disposable>()

    @SuppressLint("CheckResult")
    protected fun <T, R> requestWithLiveData(liveData: MutableLiveData<Event<T>>, request: () -> Observable<R>, resultHandler: (R) -> T)
        : String {
        liveData.postValue(Event.loading())
        val id = UUID.randomUUID().toString()
        val r = request.invoke().subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe({
                removeRequest(id)
                liveData.postValue(Event.success(resultHandler.invoke(it)))
            }, {
                removeRequest(id)
                it.printStackTrace()
                liveData.postValue(Event.error(it))
            })

        requests[id] = r

        return id
    }

    private fun removeRequest(requestId: String) {
        requests.remove(requestId)
    }

    fun disposeRequest(requestId: String) {
        requests[requestId]?.dispose()
        removeRequest(requestId)
    }

    open fun onCreate() {

    }

    open fun onDestroy() {
        for (r in requests.values) {
            r.dispose()
        }
    }
}
