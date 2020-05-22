import { createNumberMask, createTextMask } from 'redux-form-input-masks';


export const timeMask = createTextMask({
	pattern: '99:99',
})

export const dateMask = createTextMask({
	pattern: '99.99.9999',
});

export const percentMask = createNumberMask({
	// suffix: '%'
})
export const numberMask = createNumberMask({
})