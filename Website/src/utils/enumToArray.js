export const getArrayFromEnum = (enumObject) => {
	var array = [];
	for (var key in enumObject) {
		array.push(enumObject[key]);
	}
	return array;
}