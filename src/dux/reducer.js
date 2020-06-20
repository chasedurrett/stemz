const initialState = {
  username: "",
  id: "",
  email: "",
};

const USER_INFO_TO_DUX = "USER_INFO_TO_DUX";

export function userInfoToDux(username, id, email) {
  return {
    type: USER_INFO_TO_DUX,
    payload: { username, id, email },
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_INFO_TO_DUX:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
