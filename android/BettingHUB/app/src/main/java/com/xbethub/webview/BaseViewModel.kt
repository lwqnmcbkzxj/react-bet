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

abstract class BaseViewModel: ViewModel() {
    protected val backendAPI = App.appComponent.getBackend().api
    protected val consts = App.appComponent.getConstants()

    private val requests = HashSet<Disposable>()

    @SuppressLint("CheckResult")
    protected fun <T, R> requestWithLiveData(liveData: MutableLiveData<Event<T>>, request: () -> Observable<R>, resultHandler: (R) -> T) {
        liveData.postValue(Event.loading())

        requests.add(request.invoke().subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe({
                liveData.postValue(Event.success(resultHandler.invoke(it)))
            }, {
                it.printStackTrace()
                liveData.postValue(Event.error(it))
            })
        )
    }

    open fun onCreate() {

    }

    open fun onDestroy() {
        for (r in requests) {
            r.dispose()
        }
    }
}
