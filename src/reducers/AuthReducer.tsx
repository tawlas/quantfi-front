const initialState = {
  username: '',
  password: ''
};

const AuthReducer = (
  state = initialState,
  actions: { type: string; payload: any }
) => {
  switch (actions.type) {
    case 'username':
      return { ...state, username: actions.payload };
    case 'password':
      return { ...state, password: actions.payload };
    case 'email':
      return { ...state, email: actions.payload };
    case 'phoneNumber':
      return { ...state, phoneNumber: actions.payload };
    case 'authCode':
      return { ...state, authCode: actions.payload };
    case 'newPassword':
      return { ...state, newPassword: actions.payload };
    default:
      return state;
  }
};

export default AuthReducer;

const onChangeText = (key: any, value): any => {};
