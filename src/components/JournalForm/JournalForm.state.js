export const INITIAL_STATE = {
  isValid: {
    post: true,
    title: true,
    date: true,
  },
  values: {
    post: undefined,
    title: undefined,
    date: undefined,
  },
  isFormReadyToSubmit: false,
};

export function formReducer(dtate, action) {
  switch (action.type) {
    case 'RESET_VALIDITY':
      return { ...state, isValid: INITIAL_STATE.isValid };
  }
}
