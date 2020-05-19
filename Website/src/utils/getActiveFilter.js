export const getActiveFilter = (filters, filterName) => {
	let activeFilter = filters[filterName].filter(filter => filter.active === true)[0]
	if (activeFilter)
		return activeFilter.name
	return ''
}
