export const sortDropdownValues = (comparingElement, valuesArray, setValuesArray, setIsSorted) => {
	setIsSorted(false)

	let localArr = [...valuesArray]
	let index = localArr.findIndex(element => element.id === comparingElement)
	if (index !== -1) {
		let currentValue = { ...localArr[0] }
		localArr[0] = { ...localArr[index] }
		localArr[index] = { ...currentValue }

		setValuesArray(localArr)
		setIsSorted(true)
	}
}
