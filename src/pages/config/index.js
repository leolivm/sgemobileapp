import React, {useRef, useState, useEffect} from 'react';
import {ToastAndroid} from 'react-native';
import Background from '../../components/Background';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Container, Form, FormInput, SubmitButton} from './styles';

export default function Config() {
  const internalRef = useRef();
  const portRef = useRef();
  const wifiRef = useRef();

  const [valid, setValid] = useState('');
  const [internal, setInternal] = useState('');
  const [port, setPort] = useState('');
  const [wifi, setWifi] = useState('');

  useEffect(() => {
    async function loadConfig() {
      const dataValid = await AsyncStorage.getItem('valid');
      const dataInternal = await AsyncStorage.getItem('internal');
      const dataPort = await AsyncStorage.getItem('port');
      const dataWifi = await AsyncStorage.getItem('wifi');
      setValid(dataValid);
      setInternal(dataInternal);
      setPort(dataPort);
      setWifi(dataWifi);
    }
    loadConfig();
  }, []);

  function handleSave() {
    setValid(valid);
    setInternal(internal);
    setPort(port);
    setWifi(wifi);

    AsyncStorage.setItem('valid', valid);
    AsyncStorage.setItem('internal', internal);
    AsyncStorage.setItem('port', port);
    AsyncStorage.setItem('wifi', wifi);

    ToastAndroid.showWithGravityAndOffset(
      'Configurações salvas',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      0,
      120,
    );
  }

  return (
    <Background>
      <Container>
        <Form>
          <FormInput
            icon="security"
            value={valid}
            onChangeText={setValid}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite o IP válido"
            returnKeyType="next"
            onSubmitEditing={() => internalRef.current.focus()}
          />
          <FormInput
            icon="router"
            autoCorrect={false}
            value={internal}
            onChangeText={setInternal}
            autoCapitalize="none"
            placeholder="Digite o IP interno"
            returnKeyType="next"
            onSubmitEditing={() => portRef.current.focus()}
            ref={internalRef}
          />
          <FormInput
            icon="verified-user"
            value={port}
            onChangeText={setPort}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite a porta"
            returnKeyType="next"
            onSubmitEditing={() => wifiRef.current.focus()}
            ref={portRef}
          />
          <FormInput
            icon="wifi"
            autoCorrect={false}
            value={wifi}
            onChangeText={setWifi}
            autoCapitalize="none"
            placeholder="Nome do Wi-Fi"
            ref={wifiRef}
            returnKeyType="send"
            onSubmitEditing={handleSave}
          />

          <SubmitButton onPress={handleSave}>Salvar configurações</SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}

Config.navigationOptions = {
  tabBarLabel: 'Configurações',
  tabBarIcon: ({tintColor}) => (
    <Icon name="settings" size={20} color={tintColor} />
  ),
};
