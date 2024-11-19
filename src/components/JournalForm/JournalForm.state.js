export const INITIAL_STATE = {
  isValid: {
    post: true,
    title: true,
    date: true,
  },
  values: {
    post: '',
    title: '',
    date: '',
    tag: '',
  },
  isFormReadyToSubmit: false,
};

export function formReducer(state, action) {
  switch (action.type) {
    case 'RESET_VALIDITY':
      return { ...state, isValid: INITIAL_STATE.isValid };
    case 'CLEAR':
      return { ...state, values: INITIAL_STATE.values };
    case 'UPDATE_VALUE':
      return { ...state, values: { ...state.values, ...action.payload } };
    case 'SUBMIT': {
      const titleValidity = action.payload.title?.trim();
      const postValidity = action.payload.post?.trim();
      const dateValidity = action.payload.date?.trim();
      return {
        values: action.payload,
        isValid: {
          post: postValidity,
          title: titleValidity,
          date: dateValidity,
        },
        isFormReadyToSubmit: postValidity && titleValidity && dateValidity,
      };
    }
  }
}
