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

export const required = (value) => {
    if (value) return undefined;

    return "Field is required";
}

export const number = (value) => {
    if (+value !== NaN) return undefined;

    return "Field must be numeric";
}