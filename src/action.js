export const inputColor = color => ({
	type: 'INPUT_COLOR',
	payload: {
		color
	}
});

export const setRect = rect => ({
	type: 'SET_RECT',
	payload: {
		rect
	}
});
