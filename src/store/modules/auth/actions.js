export function signInRequest(name, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: {name, password},
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: {token, user},
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_IN_FAILURE',
  };
}

export function signUpRequest(name, password) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: {name, password},
  };
}

export function signUpSuccess() {
  return {
    type: '@auth/SIGN_UP_SUCCESS',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
