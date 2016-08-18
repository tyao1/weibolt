// global reducer

const SWITCH = 'setting/SWITCH';

const initialState = {
  working: false,
};

const actionsMap = {
  [SWITCH](state, action) {
    return {
      ...state,
      working: action.state,
    }
  }
};

export default function setting(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}


export function toggle(state) {
  return {
    type: SWITCH,
    global: true,
    state,
  };
}
