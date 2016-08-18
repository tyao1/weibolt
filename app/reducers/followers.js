const ADD_FOLLOWERS = 'followers/ADD_FOLLOWERS';

const initialState = {

};

const actionsMap = {
  [ADD_FOLLOWERS](state, action) {
    const followers = action.followers;
    if (Array.isArray(followers)) {
      const newState = { ...state };
      followers.forEach(follower => {
        newState[follower.id] = follower;
      });
      return newState;
    }
    if (followers.id) { //single user
      return {
        ...state,
        [followers.id]: followers,
      };
    }
    const newState = { ...state };
    Object.keys(action.followers).forEach(follower => {
      newState[follower.id] = follower;
    });
    return newState;
  }
};

export default function todos(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}


export function addFollowers(followers) {
  return {
    type: ADD_FOLLOWERS,
    global: true,
    followers,
  };
}
