const colorInitState = {
  color: ''
};

export function colorReducer(state = colorInitState, action) {
  switch (action.type) {
    case 'INPUT_COLOR':
      return {
        ...state,
        color: action.payload.color
      };
    default:
      return state;
  }
}

const rectInitState = {
  rect: {},
  rects: []
};

export function rectReducer(state = rectInitState, action) {
  console.log('action.type', action.type);
  switch (action.type) {
    case 'SET_RECT':
      console.log('return', state.rects.concat([action.payload.rect]));
      return {
        ...state,
        rects: state.rects.concat([action.payload.rect])
      };
    default:
      return state;
  }
}