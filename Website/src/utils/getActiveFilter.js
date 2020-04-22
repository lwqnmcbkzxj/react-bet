export const getActiveFilter = (filters, filterName) => {
	return filters[filterName].filter(filter => filter.active === true)[0].name
}
