import {Alert} from 'react-native';
import {takeLatest, call, put, all} from 'redux-saga/effects';
import api from '../../../services/api';
import {signInSuccess, signFailure, signUpSuccess} from './actions';

export function* signIn({payload}) {
  try {
    const {name, password} = payload;
    const response = yield call(api.post, 'sessions', {
      name,
      password,
    });
    const {token, user} = response.data;
    api.defaults.headers.Authorization = `Bearer ${token}`;
    yield put(signInSuccess(token, user));
    // history.push('/dashboard');
  } catch (err) {
    Alert.alert('Falha na autenticação', 'Verifique seus dados.');
    yield put(signFailure());
  }
}

export function* signUp({payload}) {
  try {
    const {name, password} = payload;
    yield call(api.post, 'users', {
      name,
      password,
    });
    yield put(signUpSuccess());
    // history.push('/');
  } catch (err) {
    Alert.alert('Auth', err.message);
    yield put(signFailure());
  }
}

export function setToken({payload}) {
  if (!payload) {
    return;
  }

  const {token} = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  // history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
