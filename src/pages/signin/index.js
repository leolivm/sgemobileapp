import React, {useRef, useState, useEffect} from 'react';
import logo from '../../assets/logo.png';
import {Image, PermissionsAndroid} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Background from '../../components/Background';
import {signInRequest} from '../../store/modules/auth/actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Container, Form, FormInput, SubmitButton} from './styles';

export default function Signin() {
  const dispatch = useDispatch();
  const passwordRef = useRef();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(name, password));
  }

  useEffect(() => {
    async function Check() {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
    Check();
  }, []);

  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu usuário"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={name}
            onChangeText={setName}
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha"
            returnKeyType="send"
            ref={passwordRef}
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Acessar
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}

Signin.navigationOptions = {
  tabBarLabel: 'Login',
  tabBarIcon: ({tintColor}) => (
    <Icon name="person-outline" size={20} color={tintColor} />
  ),
};
