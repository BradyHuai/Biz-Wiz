const GETINFO = "getInfo";
const UPDATEINFO = "updateInfo";

const initialState = {
  username: "",
};

export const getInfo = () => ({
  type: GETINFO,
});

export const updateInfo = (username) => ({
  type: UPDATEINFO,
  payload: username,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GETINFO:
      return state;
    case UPDATEINFO:
      return { ...state, username: action.payload };
    default:
      return state;
  }
};
