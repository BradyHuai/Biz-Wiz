const GETINFO = "getInfo";
const UPDATEINFO = "updateInfo";
const UPDATETYPE = "updateType";

const initialState = {
  token: "",
  username: "",
  user_type: "",
};

export const getInfo = () => ({
  type: GETINFO,
});

export const updateInfo = (username) => ({
  type: UPDATEINFO,
  payload: username,
});

export const updateType = (user_type) => ({
  type: UPDATETYPE,
  payload: user_type,
});

const actions = (state = initialState, action) => {
  switch (action.type) {
    case GETINFO:
      return state;
    case UPDATEINFO:
      return { ...state, username: action.payload };
    case UPDATETYPE:
      return { ...state, user_type: action.payload };
    default:
      return state;
  }
};
export default actions;
