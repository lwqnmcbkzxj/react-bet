import alertify from "alertifyjs";
alertify.set('notifier', 'position', 'top-right');

export const showAlert = (status, text) => {
	if (status === 'success')
		alertify.success(text) 
	else if (status === 'error')
		alertify.error(text)
	else if (status === 'warn')
		alertify.warn(text)
}
