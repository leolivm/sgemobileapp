import {Alert} from 'react-native';
import {takeLatest, call, put, all} from 'redux-saga/effects';
import api from '../../../services/api';
import {updateProfileSuccess, updateProfileFailure} from './actions';

export function* updateProfile({payload}) {
  try {
    const {name, ...rest} = payload.data;
    const profile = Object.assign({name}, rest.oldPassword ? rest : {});

    const response = yield call(api.put, 'users', profile);

    const {error} = response.data;
    if (error) {
      Alert.alert('User', error);
      yield put(updateProfileFailure());
      return;
    }

    Alert.alert('User', 'Perfil atualizado com sucesso!');
    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    Alert.alert('User', 'Falha na atualização do Perfil');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
