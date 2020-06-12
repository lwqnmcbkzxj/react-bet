import { change } from 'redux-form'
import { showAlert } from './showAlert'


export const loadImage = (file: File, formName: string, fieldName: string, imageId: string, dispatchFunc: any) => {
	let fileReader = new FileReader()
		
	// Max image size 2MB
	if (file.size / 1024 / 1024 < 2) {
		fileReader.onload = function (event: any) {
			document.getElementById(imageId)?.setAttribute("src", event.target.result)
		}
		fileReader.readAsDataURL(file)

	} else {
		dispatchFunc(change(formName, fieldName, ''))
		showAlert('error', 'Размер фотографии не должен превышеть 2МБ')
	}
}