import React, { Component, useState } from 'react';

import { Editor } from '@tinymce/tinymce-react';


const CKEditorComponent = ({ content, onChange, ...props }) => {
	// REF IS NOT WORKING. IDK WHY
	function filePickerCallback(callback, value, meta) {
		if (meta.filetype == 'image') {
			let input = document.getElementById('image-upload-tinymce');
			input.click();

			input.addEventListener('change', (e) => {
				let file = input.files[0]
				let reader = new FileReader();
				reader.onload = function (e) {
					callback(e.target.result, {
						alt: ''
					});
				};
				reader.readAsDataURL(file);
			})
		}
	}
	return (
		<div>
			<input type="file" id="image-upload-tinymce" style={{ display: 'none'}}/>

			<Editor
				initialValue=""
				apiKey="f9t701hao1hpemnseqy90ucyvi5sg9rw6f392kvzckjc8fjh"
				value={content}
				init={{
					height: 500,
					paste_data_images: true,
					plugins: [
						"advlist autolink lists link image charmap print preview hr anchor pagebreak",
						"searchreplace wordcount visualblocks visualchars code fullscreen",
						"insertdatetime media nonbreaking save table contextmenu directionality",
						"emoticons template paste textcolor colorpicker textpattern"
					].join(' '),
					toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
					toolbar2: "print preview media | forecolor backcolor emoticons",
					image_advtab: true,
					file_picker_callback: filePickerCallback
				}}
				onEditorChange={onChange}
			/>
		</div>
	);
}

export default CKEditorComponent;
