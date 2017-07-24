import { NEXT_STEP, PREV_STEP } from '../actionCreators/actionTypes';

const newRecipeReducer = (state = 0, action) => {
  switch (action.type) {
    case NEXT_STEP:
      return state + 1;

    case PREV_STEP:
      return state - 1;

    default:
      return state;
  }
};

export default newRecipeReducer;
