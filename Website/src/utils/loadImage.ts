import { change } from 'redux-form'
import { showAlert } from './showAlert'


export const loadImage = (file: File, formName: string, fieldName: string, holderId: string, dispatchFunc: any) => {
	let fileReader = new FileReader()
		
	let maxFileSize = 2
	// Max image size 2MB
	if (holderId.includes('video'))
		maxFileSize = 10
		
	if (file.size / 1024 / 1024 < maxFileSize) {
		fileReader.onload = function (event: any) {
			document.getElementById(holderId)?.setAttribute("src", event.target.result)
		}
		fileReader.readAsDataURL(file)

	} else {
		dispatchFunc(change(formName, fieldName, ''))

		showAlert('error', `Размер файла не должен превышеть ${maxFileSize}МБ`)
	}
}